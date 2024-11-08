import React from "react";
import "../CSS/MainPage.css";
import Steps from  "../components/StepComponent/Steps";
import Form from "../components/FormComponent/Form";
import { useDispatch, useSelector } from "react-redux";
import { FormStepsData } from "../components/Data/FormStepsData";
// import { decrement, increment } from "../redux/StepNumberSlice";
import { RootState } from "../Store/Store";

const MainPage: React.FC = () => {
  const currentPage = useSelector((state: RootState) => state.stepNumber.stepCount);
  // const dispatch = useDispatch();

  // Find the current page title, return undefined if not found
  const currentPageTitle = FormStepsData.find((item) => item.id === currentPage);

  // const handlePageChange = () => {
  //   if (currentPage < FormStepsData.length) {
  //     dispatch(increment());
  //   }
  // };

  // const previousPage = () => {
  //   if (currentPage > 1) {
  //     dispatch(decrement());
  //   }
  // };

  return (
    <div className="main-page-main-container">
      <div className="containers">
        <div className="row">
          <div className="col-12">
            <div className="main-page-main-heading-container">
              <h1 className="main-page-main-heading-text">
                {currentPageTitle ? currentPageTitle.title : "Loading..."}
              </h1>
              {/* <button onClick={handlePageChange} disabled={currentPage >= FormStepsData.length}>
                Next Page
              </button>
              <button onClick={previousPage} disabled={currentPage <= 1}>
                Previous Page
              </button> */}
            </div>
            <div className="image-main-container">
              <div className="image-container">
                <div className="image-text-main-container">
                  <div className="image-text-sub-container">
                    <h1 className="image-heading">Partner With Us</h1>
                    <p className="image-text">
                      Be our partner in just a few steps and start increasing your reach
                      by gaining new customers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <Steps />
          </div>
          <div className="col-12 col-md-8">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
