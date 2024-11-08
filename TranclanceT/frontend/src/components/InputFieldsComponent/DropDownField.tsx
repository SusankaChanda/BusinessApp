import React from "react";
import "../../CSS/InputField.css";

// Define the prop types for the DropDownField component
interface DropDownFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  endIcon?: string;
  error?: boolean;
}

const DropDownField: React.FC<DropDownFieldProps> = ({
  label,
  options,
  value,
  onChange,
  disabled,
  endIcon = "",
  error,
}) => {
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
              {label} *
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
        <div>
          <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="input-bar dropdown"
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <i className={`${endIcon} input-filed-end-icon`}></i>
        </div>
      </div>
    </div>
  );
};

export default DropDownField;
