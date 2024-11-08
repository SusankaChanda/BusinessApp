import React from "react";
import "../../CSS/Steps.css";
import Step from "./Step";
import { FormStepsData, FormStepType } from "../Data/FormStepsData"; // Assuming this is where your FormStepsData is imported from

const Steps: React.FC = () => {
  return (
    <div className="steps-main-container">
      <div className="steps-sub-container">
        <div className="row">
          <div className="col-12">
            <h1 className="steps-heading">Partner With Us</h1>
            <p className="steps-paragraph">
              Be our partner in just a few steps and start increasing your reach
              by gaining new customers.
            </p>
          </div>
          <div className="col-12 steps">
            {FormStepsData.map((eachStep: FormStepType) => (
              <div key={eachStep.id}>
                <Step eachStep={eachStep} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
