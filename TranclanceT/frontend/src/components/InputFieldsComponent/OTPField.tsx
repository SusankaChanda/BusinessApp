import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import "../../CSS/OTPField.css";

interface OTPFieldProps {
  otpSent: { email: boolean; mobile: boolean }; // Track OTP sent status for both email and mobile
  otpSentFunctionEmail: () => void;
  otpSentFunctionMobile: () => void;
}

const OTPField: React.FC<OTPFieldProps> = ({ otpSent, otpSentFunctionEmail, otpSentFunctionMobile }) => {
  const [otp, setOtp] = useState<string>("");

  let otpValue: string = otp;

  useEffect(() => {
    otpValue = otp;
    console.log("Updated OTP value:", otpValue); 
  }, [otp]);

  

  return (
    <div>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderInput={(props: any) => (
          <div className="otp-input-field-container">
            <input {...props} className="otp-field-text" />
          </div>
        )}
      />
    </div>
  );
};

export default OTPField;
