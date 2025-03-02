import "./StudentDas.css";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaFilePdf } from "react-icons/fa";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useauthstore } from "./store/authuser";


function StudentDash() {

    const { fetchEachStudent, student } = useauthstore();
    const { id } = useParams();

    useEffect(() => {
        console.log("Student ID from URL:", id); // Debugging: Check if ID is received
        if (id) {
          fetchEachStudent(id);
        }
      }, [id]);

  if (!student) return <p>Loading student details...</p>;



  return (
    <div className="star">
        <div className="body">
      <h1 style={{ fontSize: "2.5rem", fontWeight: "800" }}>Student Details</h1>
      <main className="main">
        <aside>
          <div className="name">
            <div className="photo">
              <img src={student.image} height="100%" width="100%" alt="Student" />
            </div>
            <p>{student.id}</p>
            <p>{student.name}</p>
          </div>
          <div className="personaldetals">
            <h2>Personal Information</h2>
            <div className="pdetails">
              <p className="icon"><FaEnvelope /></p>
              <p>{student.email}</p>
            </div>
            <div className="pdetails">
              <p className="icon"><FaPhone /></p>
              <p>{student.phoeno}</p>
            </div>
            <div className="pdetails">
              <p className="icon"><FaLinkedin /></p>
              <a href={student.linkdin}>{student.name}</a>
            </div>
            <div className="pdetails">
              <p className="icon"><FaGithub /></p>
              <a href={student.github}>{student.name}</a>
            </div>
          </div>
          <div className="resume">
            <h2>Resume</h2>
            <div className="resumeset">
              <p><a href="#"><FaFilePdf /></a></p>
            </div>
          </div>
        </aside>

        <aside>
          <div className="marks">
            <div className="marksdetails">
              <h2>Marks</h2>
              <div className="marksset"><p>SCC</p> <span>:</span> <p className="sco">{student.ssc}</p></div>
              <div className="marksset"><p>Inter/Deploma</p> <span>:</span> <p className="sco">{student.inter}</p></div>
              <div className="marksset"><p>B.Tech</p> <span>:</span> <p className="sco">{student.btech}</p></div>
            </div>
            <div className="percentage">
              <div className="circle">
                <div className="inner-circle">
                  <span className="percentage-text">{student.btech}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="onlineplatform">
            <h2>Online Platforms</h2>
            <div className="Platforms">
              <a href={student.leetcode}><img src="./src/assets/leetcode.png" alt="Leetcode" height="100%" width="100%" /></a>
              <a href={student.hackerrank}><img src="./src/assets/hackerrank.svg" alt="HackerRank" height="100%" width="100%" /></a>
              <a href={student.codechef}><img src="./public/cc-logo.svg" alt="CodeChef" height="100%" width="100%" /></a>
            </div>
          </div>
          <div className="certificate">
            <h2>Certificates</h2>
            <div className="certificateslist">
              <a href={student.certificate1}><img src="./public/certificate.png" alt="Certificate" height="40px" />certificate</a>
              <a href={student.certificate2}><img src="./public/certificate.png" alt="Certificate" height="40px" />certificate</a>
              <a href={student.certificate3}><img src="./public/certificate.png" alt="Certificate" height="40px" />certificate</a>
              <a href={student.certificate4}><img src="./public/certificate.png" alt="Certificate" height="40px" />certificate</a>
              <a href={student.certificate5}><img src="./public/certificate.png" alt="Certificate" height="40px" />certificate</a>
              <a href={student.certificate6}><img src="./public/certificate.png" alt="Certificate" height="40px" />certificate</a>
            </div>
          </div>
        </aside>
      </main>
    </div>
    </div>
  );
}

export default StudentDash;
