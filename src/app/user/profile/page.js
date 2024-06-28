"use client";
import React, { useState, useEffect } from "react";
import { GetUserProfile, UpdateProfile, VerifyPassword } from "../../../../api/user";

function UserProfile() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await GetUserProfile();
        setNickname(user.nickname);
        setEmail(user.email);
      } catch (error) {
        setError("Failed to laod user profile");
      }
    };

    fetchUserDetails();
  }, []);
 
  const handleCurrentPassword = async (value)=>{
    setError("");

    if(value){
      const isValid = await VerifyPassword({password: value});
      if(!isValid){
        setError("Current password is incorrect.");
        setCurrentPassword("");
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("The new password is not the same as the confirm password");
    }

    if (newPassword && newPassword.length < 6) {
      setError("new password must be at least 6 characters long;");
      return;
    }

    if (confirmPassword && confirmPassword.length < 6) {
      setError("confirm password must be at least 6 characters long;");
      return;
    }

    try {
      const data = {
        nickname,
      };
      if (newPassword && confirmPassword) {
        data["password"] = newPassword;
      }

      const res = await UpdateProfile(data);
      setSuccess("Profile updated successfully");
    } catch (error) {
      setError("Failed to update profile. Please try again");
    }
  };

  return (
    <div style={styles.container}>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            readOnly
            style={{ ...styles.input, backgroundColor: "#f5f5f5" }} // 改变背景颜色以表示不可修改
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>NickName:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{ ...styles.input }}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e)=>setCurrentPassword(e.target.value)}
            onBlur={(e) => handleCurrentPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>New Password (optional):</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Confirm Password (optional):</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <button type="submit" style={styles.button}>
          Update Profile
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "800px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "3px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  success: {
    color: "green",
    marginBottom: "15px",
  },
  text: {
    padding: "8px",
    fontSize: "16px",
    backgroundColor: "#f5f5f5",
    borderRadius: "3px",
    border: "1px solid #ccc",
  },
};

export default UserProfile;
