import React, { useEffect, useState } from "react";
import "../../CSS/BussinessInformation.css";
import { countryList } from "../Data/CountriesList";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../redux/StepNumberSlice";
import {
  toggleOtpSentEmailPage1,
  toggleOtpSentMobilePage1,
} from "../../redux/OtpSentSlicer";
import FormButtons from "./FormButtons";
import { RootState } from "../../Store/Store";
import InputField from "../InputFieldsComponent/inputField";
import DropDownField from "../InputFieldsComponent/DropDownField";
import OTPField from "../InputFieldsComponent/OTPField";
import ImageField from "../InputFieldsComponent/ImageField";
import axios from "axios";

// Type for the business form details state
interface BusinessFormDetails {
  businessName: string;
  openingTime: string;
  closingTime: string;
  address: string;
  email: string;
  mobile: string;
}

interface Errors {
  businessName: boolean;
  openingTime: boolean;
  closingTime: boolean;
  address: boolean;
  email: boolean;
  mobile: boolean;
  country: boolean;
  state: boolean;
  city: boolean;
  image: boolean;
}


interface OTPErrors {
  [key: string]: boolean;
}

function BussinessInformation() {
  const dispatch = useDispatch();
  const savedDetails = localStorage.getItem("businessFormDetails");
  const [selectedCountry, setSelectedCountry] = useState<string>(() => {
    return savedDetails ? JSON.parse(savedDetails).country : "";
  });
  const [selectedState, setSelectedState] = useState<string>(() => {
    return savedDetails ? JSON.parse(savedDetails).state : "";
  });
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    return savedDetails ? JSON.parse(savedDetails).city : "";
  });

  const [image, setImage] = useState<string | null>(() => {
    return savedDetails ? JSON.parse(savedDetails).image : null;
  });

  const [otpStatus, setOtpStatus] = useState<OTPErrors>({
    email: false,
    mobile: false,
  })

  const otpSent = useSelector((state: RootState) => state.otpSent);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [businessFormDetails, setBusinessFormDetails] = useState<BusinessFormDetails>(() => {
    return savedDetails
      ? JSON.parse(savedDetails)
      : {
          businessName: "",
          openingTime: "",
          closingTime: "",
          address: "",
          email: "",
          mobile: "",
        };
  });

  const [errors, setErrors] = useState<Errors>({
    businessName: false,
    openingTime: false,
    closingTime: false,
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
      "businessFormDetails",
      JSON.stringify({
        ...businessFormDetails,
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        image: image,
      })
    );
  }, [
    businessFormDetails,
    selectedCountry,
    selectedState,
    selectedCity,
    image,
  ]);

    const otpSentFunction = (fieldName: string) => {
  setOtpStatus((prev: OTPErrors) => ({ ...prev, [fieldName]: !prev[fieldName] }));
};

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setErrors((prev) => ({
        ...prev,
        image: false,
      }));
      setImage(URL.createObjectURL(file));
    } else {
      setErrors((prev) => ({
        ...prev,
        image: true,
      }));
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
    validateField("country", e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
    validateField("state", e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    validateField("city", e.target.value);
  };

  const handleBusinessFormDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let isValid = true;
    switch (name) {
      case "businessName":
        isValid = value.trim() !== "";
        break;
      case "openingTime":
        isValid = value.trim() !== "";
        break;
      case "closingTime":
        isValid = value.trim() !== "";
        break;
      case "address":
        isValid = value.trim() !== "";
        break;
      case "email":
        isValid = emailRegex.test(value);
        break;
      case "mobile":
        isValid = /^\d{10}$/.test(value);
        break;
      case "country":
        isValid = value.trim() !== "";
        break;
      case "state":
        isValid = value.trim() !== "";
        break;
      case "city":
        isValid = value.trim() !== "";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !isValid,
    }));
  };

  const stateList = selectedCountry
    ? Object.keys(countryList[selectedCountry].states)
    : [];
  const cityList = selectedState
    ? countryList[selectedCountry].states[selectedState]
    : [];

  const isValid = Object.values(errors).every((error) => error === false);

  const otpSentFunctionEmail = () => {
    dispatch(toggleOtpSentEmailPage1());
  };

  const otpSentFunctionMobile = () => {
    dispatch(toggleOtpSentMobilePage1());
  };


  const handleSubmitButton = async() => {
    const newErrors = {
      businessName: !businessFormDetails.businessName,
      openingTime: !businessFormDetails.openingTime,
      closingTime: !businessFormDetails.closingTime,
      address: !businessFormDetails.address,
      email:
        !businessFormDetails.email ||
        !emailRegex.test(businessFormDetails.email),
      mobile:
        !businessFormDetails.mobile ||
        !/^\d{10}$/.test(businessFormDetails.mobile),
      country: !selectedCountry,
      state: !selectedState,
      city: !selectedCity,
      image: !image,
    };
    setErrors(newErrors);
    const hasError = Object.values(newErrors).includes(true);
    if (!hasError) {

      const step1Data = {
        ...businessFormDetails,
        Country: selectedCountry,
        State: selectedState,
        City: selectedCity,
        Image: image,
      }
      console.log(step1Data);
      dispatch(increment());
      try {
        const res = await axios.post("http://localhost:5000/step1", { step1Data });
        console.log(res.data)
          
        } catch (error) {
          console.error("Error submitting form:", error);
      }
      
      

    } else {
      console.log(errors);
    }
  };

  const handlePreviousPage = () => {
    dispatch(decrement());
  };

  const fillWithDummyData = () => {
    setBusinessFormDetails({businessName: "Translance",
          openingTime: "10:00",
          closingTime: "22:00",
          address: "Hyderbad telengana",
          email: "demo@gmail.com",
      mobile: "9876543211",
    })
    setSelectedCity("Hyderabad")
    setSelectedCountry("India")
    setSelectedState("Telangana")
    
  }


  return (
    <div className="row">
      <div className="col-12 bussiness-info-main-container">
        <div className="bussiness-text-container">
          <h1 className="bussiness-info-text">Business Information</h1>
          <button onClick={fillWithDummyData} className="fill-with-dummy-data">Fill with dummy Data</button>
        </div>

        <div className="row form-fit">
          <div className="col-12 col-md-6">
            <InputField
              inputFieldName="Business Name"
              type="text"
              placeholder="Enter your Business Name"
              onChange={handleBusinessFormDetails}
              endIcon="fa-regular fa-building"
              name="businessName"
              value={businessFormDetails.businessName}
              error={errors.businessName}
            />
          </div>
          <div className="col-12 col-md-6">
            <DropDownField
              label="Country"
              options={Object.keys(countryList)}
              value={selectedCountry}
              onChange={handleCountryChange}
              error={errors.country}
            />
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
              endIcon="fa-solid fa-location-dot"
              name="address"
              value={businessFormDetails.address}
              error={errors.address}
            />
          </div>
          
          <div className="col-12 col-md-6">
            <InputField
              inputFieldName="Opening Time"
              placeholder="HH:MM AM"
              type="time"
              onChange={handleBusinessFormDetails}
              name="openingTime"
              value={businessFormDetails.openingTime}
              error={errors.openingTime}
            />
          </div>
          <div className="col-12 col-md-6">
            <InputField
              inputFieldName="Closing Time"
              type="time"
              placeholder="HH:MM PM"
              onChange={handleBusinessFormDetails}
              name="closingTime"
              value={businessFormDetails.closingTime}
              error={errors.closingTime}
            />
          </div>
          <div className="col-12 col-md-6">
            <InputField
              inputFieldName="Email"
              type="email"
              placeholder="Enter your Email"
              onChange={handleBusinessFormDetails}
              endIcon="fa-solid fa-envelope"
              name="email"
              value={businessFormDetails.email}
              error={errors.email}
              sendOTP={true}
              otpSentFunction={ otpSentFunction }
            />
          </div>
          <div className="col-12 col-md-6">
            <InputField
              inputFieldName="Mobile"
              type="text"
              placeholder="Enter your Mobile"
              onChange={handleBusinessFormDetails}
              endIcon="fa-solid fa-phone"
              name="mobile"
              value={businessFormDetails.mobile}
              error={errors.mobile}
              sendOTP={true}
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
          <div className="col-12">
            <ImageField
              name="image"
              image={image}
              onChange={handleImageUpload}
              error={errors.image}
            />
          </div>
          
          <FormButtons
              handlePreviousPage={handlePreviousPage}
              isValid={isValid}
            handleSubmitButton={handleSubmitButton} 
            
            />
        </div>
      </div>
    </div>
  );
}

export default BussinessInformation;
