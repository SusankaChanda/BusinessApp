import React from "react";
import { FormStepsData } from "../Data/FormStepsData";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";

interface FormButtonsProps {
  handlePreviousPage: () => void;
  isValid: boolean;
  handleSubmitButton: () => void;
}

const FormButtons: React.FC<FormButtonsProps> = ({
  handlePreviousPage,
  isValid,
  handleSubmitButton,
}) => {
  const currentPage = useSelector((state: RootState) => state.stepNumber.stepCount);

  // Find the next page title based on current page index
  const currentPageTitle = FormStepsData.find(
    (item) => item.id === currentPage + 1
  );

  return (
    <div className="row">
      <div className="col-6">
        {currentPage > 1 && (
          <button
            className="business-button"
            onClick={handlePreviousPage}
          >
            <i className="fa-solid fa-arrow-left arrow-icon-back"></i>
            Back
          </button>
        )}
      </div>
      <div className="col-6 business-button-container">
        <button
          className="business-button"
          onClick={handleSubmitButton}
          // disabled={!isValid} 
        >
          {currentPageTitle ? `Proceed to ${currentPageTitle.title}` : "Next Step"}
          <i className="fa-solid fa-arrow-right arrow-icon"></i>
        </button>
      </div>
    </div>
  );
};

export default FormButtons;
