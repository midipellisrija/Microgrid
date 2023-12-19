import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const Otp = () => {
  //const [phoneNumber, setPhoneNumber] = useState('+919346512861');
  const message = Math.floor(Math.random() * 900000).toString();
//   const [message, setMessage] = useState(otp);

  const [path, setPath] = useState("/otp");
  const [text, setText] = useState("");
  const handleSendSMS = async () => {
    try {
      // Replace with your Twilio Account SID, Auth Token, and Twilio phone number
      const accountSid = 'AC1bccfed0756711b04099070150496740';
      const authToken = '4461dccf78d8782d8653135ed7d15547';

      const response = await axios.post(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          To:'+918008312133',
          From:'+15674557713',
          Body: message,
        },
        {
            headers: {
                Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };
  const handleOnSubmit = () =>{
    let inputValue = document.getElementById("otpNumber").value;
    if (message === inputValue){
        console.log("Yes, It's correct");
        setPath("/sucess");

    }
    else{
        console.log("Wrong otp");
        setPath("/otp");
        setText("Incorrect password. Please Try Again");
        setTimeout(()=>{
            setText("");
         },3000);
        
    }
  }

  let mystyle ={
    backgroundColor: "#DAFFFB",
    textAlign: "center",
    height: "100vh",
    padding: 100
  }
  return (
    <div className="conatiner" style={mystyle}>
      <h1>Enter OTP</h1>
      <div>
      <label htmlFor="otpNumber"></label>
        <input type="text" id="otpNumber" className="m-3"/>
      <div style={{ paddingLeft:70}}>
      </div>
      <div style={{paddingRight: 80}}>
      <button onClick={handleSendSMS} className='m-3 btn btn-primary'>Resend OTP</button>
      </div>
      <Link className="btn btn-success" onClick={handleOnSubmit} to={path}> Submit </Link>
      <p> {text}</p>
    </div>
    </div>
  );
};

export default Otp;