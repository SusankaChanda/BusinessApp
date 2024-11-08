import React, { useState } from "react";
import "../../CSS/InputField.css";

// Define types for the props of the InputField component
interface InputFieldProps {
  inputFieldName: string;
  type: string;
  placeholder: string;
  endIcon?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  sendOTP?: boolean;
  sameAsText?: boolean;
  otpSentFunction?: (fieldName: string) => void;  
}

const InputField: React.FC<InputFieldProps> = ({

  inputFieldName,
  type,
  placeholder,
  endIcon = "",
  name,
  onChange,
  value,
  error = false,
  sendOTP = false,
  sameAsText = false,
  otpSentFunction = () => {},
}) => {
  const [check, setCheck] = useState<boolean>(false);

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <div className="input-filed-main-container">
      <div className="input-field-container">
        <div className="input-filed-text-icon-container">
          <div>
            <p
              className={`${
                error ? "input-field-name error-color" : "input-field-name"
              }`}
            >
              {inputFieldName} *
            </p>
          </div>
          <div className="information-icon-container">
            <i
              className={`fa-solid fa-circle-info ${
                error ? "input-filed-icon error-color" : "input-filed-icon"
              }`}
            ></i>
          </div>
        </div>
        {!sendOTP && (
          <div>
            <input
              type={type}
              placeholder={placeholder}
              className="input-bar"
              name={name}
              value={value}
              onChange={onChange}
              required
            />
            <i
              className={`${endIcon} input-filed-end-icon ${
                error && "error-color"
              }`}
            ></i>
          </div>
        )}
        {sendOTP && (
          <div className="otp-input-container">
            <input
              type={type}
              placeholder={placeholder}
              className="input-bar"
              name={name}
              value={value}
              onChange={onChange}
              required
            />
            {!error && (
              <button className="send-button" onClick={() => otpSentFunction(name)}>
                Send
              </button>
            )}
          </div>
        )}
        {sameAsText && (
          <div className="same-as-text-container">
            <div>
              <p className="same-as-text">Same as business {name}</p>
            </div>
            <div className="checkbox-button">
              <div onClick={handleCheck} className={`${check && "check"}`}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
