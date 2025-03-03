import { create } from "zustand";

export const useauthstore = create((set) => ({
  isAuthenticated: false,
  isLoggingIn: false,
  students: [],

  login: async ({ username, password }) => {
    set({ isLoggingIn: true });

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        set({ isAuthenticated: true });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false, students: [] });
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    set({ isAuthenticated: !!token });
  },

  fetchStudents: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/students", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch students");

      const data = await res.json();
      set({ students: data });
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  },

  fetchEachStudent: async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`http://localhost:3000/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch student details");

      const data = await res.json();
      set({ student: data });
    } catch (error) {
      console.error("❌ Error fetching student details:", error);
    }
  },
  
}));
