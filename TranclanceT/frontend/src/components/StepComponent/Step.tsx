import React from "react";
import "../../CSS/Step.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store"; 

interface StepProps {
  eachStep: {
    id: number;
    title: string;
  };
}

const Step: React.FC<StepProps> = ({ eachStep }) => {
  const currentPage = useSelector((state: RootState) => state.stepNumber.stepCount);

  return (
    <div className="step-main-container">
      <div className="step-sub-container">
        <div
          className={`step-number-container ${
            eachStep.id <= currentPage ? "step-number-container-checked" : ""
          }`}
        >
          {eachStep.id}
        </div>

        <div className="step-title-container">{eachStep.title}</div>
      </div>
    </div>
  );
};

export default Step;
