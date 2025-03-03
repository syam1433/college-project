const e = require("express");
const sql=require("mysql2");
const cors=require("cors");
const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");
const path = require("path");


const {Sequelize,DataTypes}=require("sequelize");

dotenv.config();
//Database Connecting;
const DB=process.env.DB
const US=process.env.US
const PS=process.env.PS
const HOST=process.env.HOST
const SECERET_KEY=process.env.KEY;
console.log(SECERET_KEY)



const sequelize = new Sequelize(DB,US,PS,{
    host:HOST,
    dialect:"mysql"
})

sequelize.authenticate()
         .then(()=>{console.log("Database conneted successfully")})
         .catch((error)=>{console.log("error while connecting to database")})

//Define userdatabse
const User= sequelize.define("proctorsdata",{
    id:{type:DataTypes.STRING,allowNull:false,unique:true,primaryKey:true},
    username:{type:DataTypes.STRING,allowNull:false,unique:true},
    password:{type:DataTypes.STRING,allowNull:false,unique:true},
    },
    {
        tableName: "proctorsdata", 
        timestamps: false
})

//Define studentdata
const Student=sequelize.define("studentsdatabasedata",{
    no: { type: DataTypes.STRING, allowNull: false, primaryKey:true },
    id: { type: DataTypes.STRING, allowNull: false },
    name:{type:DataTypes.STRING,allowNull:false},
    email:{type:DataTypes.STRING,allowNull:false},
    phoeno:{type:DataTypes.INTEGER,allowNull:false},
    linkdiin:{type:DataTypes.STRING,allowNull:false},
    github:{type:DataTypes.STRING,allowNull:false},
    hackerrank:{type:DataTypes.STRING,allowNull:false},
    codechef:{type:DataTypes.STRING,allowNull:false},
    ssc:{type:DataTypes.INTEGER,allowNull:false},
    inter:{type:DataTypes.INTEGER,allowNull:false},
    btech:{type:DataTypes.FLOAT,allowNull:false},
    leetcode:{type:DataTypes.STRING,allowNull:false},
    certificate1:{type:DataTypes.STRING,allowNull:false},
    certificate2:{type:DataTypes.STRING,allowNull:false},
    certificate3:{type:DataTypes.STRING,allowNull:false},
    certificate4:{type:DataTypes.STRING,allowNull:false},
    certificate5:{type:DataTypes.STRING,allowNull:false},
    certificate6:{type:DataTypes.STRING,allowNull:false},
    image:{type:DataTypes.STRING,allowNull:false},
    },
    {
        tableName: "studentsdatabasedata", 
        timestamps: false
})

const app=e();
app.use(e.json());
app.use(cors());
app.use("/uploads", e.static(path.join(__dirname, "uploads")));

//proctor login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ error: "User not found!" });

        const isMatch = password === user.password;
        if (!isMatch) return res.status(401).json({ error: "Invalid password!" });

        const token = jwt.sign({ userId: user.id }, SECERET_KEY, { expiresIn: "1h" });
        res.json({ message: "Login successful!", token, userId: user.id });
    } catch (error) {
        res.status(500).json({ error: "Server error!" });
    }
});

//students data
app.get("/students", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized access!" });

    try {
        const decoded = jwt.verify(token, SECERET_KEY);
        const userNo = decoded.userId;

        console.log("User ID decoded:", userNo);

        const offset = (userNo - 1) * 40; 
        console.log("Offset calculated:", offset); //

        const students = await Student.findAll({ limit: 40, offset });

        res.json(students);
    } catch (error) {
        console.error("❌ Error fetching students:", error); 
        res.status(500).json({ error: "Error fetching students!", details: error.message });
    }
});



//each student data
app.get("/students/:id", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized access!" });

    try {
        jwt.verify(token, SECERET_KEY); // Verify token
        const student = await Student.findOne({ where: { id: req.params.id } });

        if (!student) return res.status(404).json({ error: "Student not found!" });

        res.json(student);
    } catch (error) {
        res.status(500).json({ error: "Error fetching student data!" });
    }
});



app.listen(3000, () => console.log("🚀 Server running on port 3000"));