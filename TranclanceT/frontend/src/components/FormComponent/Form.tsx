import React from "react";
import BussinessInformation from "./BussinessInformation";
import OwnerAndManagerDetails from "./OwnerAndManagerDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";

const Form: React.FC = () => {
  const currentPage = useSelector((state: RootState) => state.stepNumber.stepCount);

  return (
    <div>
      {currentPage === 1 && <BussinessInformation />}
      {currentPage === 2 && <OwnerAndManagerDetails />}
    </div>
  );
};

export default Form;
