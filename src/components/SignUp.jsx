import React, { useState } from "react";
import bcrypt from "bcryptjs";
import {sendOtp,signup} from "../utils/authenticate";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [message, setMessage] = useState("");
  const [signupComplete, setSignupComplete] = useState(false);
    // 📌 Send OTP
    const sendtp = async (e) => {
      setMessage("");
  
      try {
        console.log(email);
        const response = await sendOtp({email});
        console.log(response)
        const data = response.data
        // const data={"otp":124565};
  
        if (response.status==200) {
          setOtpSent(true);
          setGeneratedOtp(data.otp); // Store OTP from backend
          setMessage("OTP sent to your email.");
        } else {
          setMessage(data.error || "Failed to send OTP.");
        }
      } catch (error) {
        setMessage("Server error. Try again.");
        console.error(error);
      }
    };
  
    // 📌 Verify OTP in frontend, then call signup API
    const verifyOtpAndSignup = async (e) => {
      e.preventDefault();
      setMessage("");
      // console.log("Here are otps ",otp,generatedOtp);
      if (otp !== generatedOtp) {
        setMessage("Invalid OTP. Try again.");
        return;
      }
  
      // Hash the password before sending to the backend
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      try {
        const response = await signup(JSON.stringify({ email, password: hashedPassword }));
  
        // const data = await response.json();
  
        if (response.status==200) {
          setSignupComplete(true);
          setMessage("Signup successful! 🎉");
        } else {
          setMessage("Signup failed.");
        }
      } catch (error) {
        setMessage("Server error. Try again.");
        console.error(error);
      }
    };  
  

    return (
      <Container 
        maxWidth="sm" 
        sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: "100%", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Email OTP Signup
          </Typography>
  
          {signupComplete ? (
            <Typography color="success.main" fontWeight="bold">
              Signup successful! 🎉
            </Typography>
          ) : otpSent ? (
            <>
              <Typography color="text.secondary" mb={2}>{message}</Typography>
              <TextField
                label="Enter OTP"
                variant="outlined"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                margin="normal"
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={verifyOtpAndSignup}
              >
                Verify OTP & Signup
              </Button>
            </>
          ) : (
            <>
              <TextField
                label="Enter Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
              />
              <TextField
                label="Enter Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={sendtp}
              >
                Send OTP
              </Button>
              <Typography color="error" mt={2}>{message}</Typography>
            </>
          )}
        </Paper>
      </Container>
    );
  
};
export default Signup;