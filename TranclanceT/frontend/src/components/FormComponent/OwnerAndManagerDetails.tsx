import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleOtpSentEmailPage2, toggleOtpSentMobilePage2 } from "../../redux/OtpSentSlicer";
import { RootState } from "../../Store/Store";
import InputField from "../InputFieldsComponent/inputField";
import DropDownField from "../InputFieldsComponent/DropDownField";
import ImageField from "../InputFieldsComponent/ImageField";
import OTPField from "../InputFieldsComponent/OTPField";
import "../../CSS/OwnerAndManagerDetails.css";
import { countryList } from "../Data/CountriesList";
import FormButtons from "./FormButtons";
import { decrement } from "../../redux/StepNumberSlice";
import axios from "axios";

interface BusinessFormDetails {
  fullName: string;
  address: string;
  email: string;
  mobile: string;
  image?: string; // Optional
}

interface Errors {
  [key: string]: boolean;
}

const OwnerAndManagerDetails: React.FC = () => {

  const [otpStatus, setOtpStatus] = useState<Errors>({
    email: false,
    mobile: false,
  })

  const dispatch = useDispatch();
  const savedDetails = localStorage.getItem("ownerFormDetails");

  // State initialization with localStorage or defaults
  const [selectedCountry, setSelectedCountry] = useState<string>(
    savedDetails ? JSON.parse(savedDetails).country : ""
  );
  const [selectedState, setSelectedState] = useState<string>(
    savedDetails ? JSON.parse(savedDetails).state : ""
  );
  const [selectedCity, setSelectedCity] = useState<string>(
    savedDetails ? JSON.parse(savedDetails).city : ""
  );
  const [image, setImage] = useState<string | null>(savedDetails ? JSON.parse(savedDetails).image : null);

  const otpSent = useSelector((state: RootState) => state.otpSent);

  const handlePreviousPage = () => {
    dispatch(decrement());
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const otpSentFunction = (fieldName: string) => {
  setOtpStatus((prev: Errors) => ({ ...prev, [fieldName]: !prev[fieldName] }));
};

  const [businessFormDetails, setBusinessFormDetails] = useState<BusinessFormDetails>(() => {
    return savedDetails
      ? JSON.parse(savedDetails)
      : { fullName: "", address: "", email: "", mobile: "" };
  });

  const [errors, setErrors] = useState<Errors>({
    fullName: false,
    address: false,
    email: false,
    mobile: false,
    country: false,
    state: false,
    city: false,
    image: false,
  });

  useEffect(() => {
    localStorage.setItem(
      "ownerFormDetails",
      JSON.stringify({ ...businessFormDetails, country: selectedCountry, state: selectedState, city: selectedCity, image })
    );
  }, [businessFormDetails, selectedCountry, selectedState, selectedCity, image]);

  const validateField = (name: string, value: string) => {
    const validationRules: { [key: string]: (value: string) => boolean } = {
      fullName: (value) => value.trim() !== "",
      address: (value) => value.trim() !== "",
      email: (value) => emailRegex.test(value),
      mobile: (value) => /^\d{10}$/.test(value),
      country: (value) => value.trim() !== "",
      state: (value) => value.trim() !== "",
      city: (value) => value.trim() !== "",
    };

    const isValid = validationRules[name] ? validationRules[name](value) : true;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: !isValid }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: false }));
    } else {
      setErrors((prev) => ({ ...prev, image: true }));
    }
  };

  const handleBusinessFormDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessFormDetails((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCountry(value);
    setSelectedState(""); // Reset state and city on country change
    setSelectedCity("");
    validateField("country", value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedState(value);
    setSelectedCity(""); // Reset city on state change
    validateField("state", value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCity(value);
    validateField("city", value);
  };

  const otpSentFunctionEmail = () => {
    dispatch(toggleOtpSentEmailPage2());
  };

  const otpSentFunctionMobile = () => {
    dispatch(toggleOtpSentMobilePage2());
  };

  const handleSubmitButton = async() => {
    const newErrors = {
      fullName: !businessFormDetails.fullName,
      address: !businessFormDetails.address,
      email: !businessFormDetails.email || !emailRegex.test(businessFormDetails.email),
      mobile: !businessFormDetails.mobile || !/^\d{10}$/.test(businessFormDetails.mobile),
      country: !selectedCountry,
      state: !selectedState,
      city: !selectedCity,
      image: !image,
    };
    setErrors(newErrors);
    if (!Object.values(newErrors).includes(true)) {

      const storedData = localStorage.getItem("ownerFormDetails");
      const step2Data = storedData ? JSON.parse(storedData) : null;

      console.log("Form submitted", step2Data);
      
      try {
        const res = await axios.post("http://localhost:5000/step2", { step2Data })
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
      alert("Form Submitted")
    }
  };

    const isValid = Object.values(errors).every((error) => error === false);

  const stateList = selectedCountry ? Object.keys(countryList[selectedCountry].states) : [];
  const cityList = selectedState ? countryList[selectedCountry].states[selectedState] : [];

  return (
    <div className="row">
      <div className="col-12 bussiness-info-main-container">
        <div className="bussiness-text-container">
          <h1 className="bussiness-info-text">Owner & Manager Details</h1>
        </div>
        <div className="row">
          <div className="col-12">
            <button className="owner-details-button">Owner Details</button>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <InputField
                inputFieldName="Full Name"
                type="text"
                placeholder="Eg: Prabhat Kumar, Sushma Singh"
                onChange={handleBusinessFormDetails}
                endIcon="fa-regular fa-user"
                name="fullName"
                value={businessFormDetails.fullName}
                error={errors.fullName}
              />
              <DropDownField
                label="Country"
                options={Object.keys(countryList)}
                value={selectedCountry}
                onChange={handleCountryChange}
                error={errors.country}
              />
            </div>
            <div className="col-12 col-md-6">
              <ImageField
                name="Upload image of your Restaurant"
                error={errors.image}
                image={image}
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <DropDownField
              label="State"
              options={stateList}
              value={selectedState}
              onChange={handleStateChange}
              disabled={!selectedCountry}
              error={errors.state}
            />
          </div>
          <div className="col-12 col-md-6">
            <DropDownField
              label="City"
              options={cityList}
              value={selectedCity}
              onChange={handleCityChange}
              disabled={!selectedState}
              error={errors.city}
            />
          </div>
          <div className="col-12">
            <InputField
            inputFieldName="Address"
            type="text"
            placeholder="Enter your Address"
            onChange={handleBusinessFormDetails}
            endIcon="fa-regular fa-map"
            name="address"
            value={businessFormDetails.address}
            error={errors.address}
          />
          </div>
          <div className="col-12 col-md-6">
            <InputField
            inputFieldName="Email"
            type="text"
            placeholder="Validate your email"
            onChange={handleBusinessFormDetails}
            endIcon="fa-regular fa-envelope"
            name="email"
            value={businessFormDetails.email}
              error={errors.email}
              sendOTP={true}
              sameAsText={true}
              otpSentFunction={ otpSentFunction }
          />
          </div>
          <div className="col-12 col-md-6">
            <InputField
            inputFieldName="Mobile"
            type="text"
            placeholder="Enter your mobile number"
            onChange={handleBusinessFormDetails}
            endIcon="fa-regular fa-phone"
            name="mobile"
            value={businessFormDetails.mobile}
              error={errors.mobile}
              sendOTP={true}
              sameAsText={true}
              // otpSentFunction={ toggleOtpSentMobilePage2 }
              otpSentFunction={ otpSentFunction }
          />
          </div>
          <div className="row">
            <div className="col-6">
               {otpStatus.email && (
                <div className="otp-buttons-container">
                  <OTPField
                    otpSent={{ email: otpSent.secondPageEmail, mobile: otpSent.secondPageMobile }}
                    otpSentFunctionEmail={otpSentFunctionEmail}
                    otpSentFunctionMobile={otpSentFunctionMobile}
                  />
                  <button className="validate-button">Validate</button>
                </div>
              )}
           </div>
            <div className="col-6">
              {otpStatus.mobile && (
                <div className="otp-buttons-container">
                  <OTPField
                    otpSent={{ email: otpSent.secondPageEmail, mobile: otpSent.secondPageMobile }}
                    otpSentFunctionEmail={otpSentFunctionEmail}
                    otpSentFunctionMobile={otpSentFunctionMobile}
                  />
                  <button className="validate-button">Validate</button>
                </div>
          )}
            </div>
          </div>
          
          <div className="col-12 col-md-6 manager-details-container">
            <div className="owner-text-container">
              <p className="manager-details-text">
                Do you want to fill Manager details?
              </p>
            </div>
            <div className="owner-button-container">
              <button
                className="manager-owner-button"
                onClick={handleSubmitButton}
              >
                Yes
              </button>
              <button className="manager-owner-button">No</button>
            </div>
          </div>
          
          {/* <div className="col-12 submit-button-container">
            <button className="validate-button-submit" onClick={handleSubmitButton}>Submit</button>
          </div> */}

          <FormButtons
              handlePreviousPage={handlePreviousPage}
              isValid={isValid}
            handleSubmitButton={handleSubmitButton} 
            
            />
        </div>
      </div>
    </div>
  );
};

export default OwnerAndManagerDetails;
