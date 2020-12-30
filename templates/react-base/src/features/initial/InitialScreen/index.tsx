import React from "react";
import "./styles.css";
import rfLogoLight from "../../../assets/images/rf-logo-light.png";

const InitialScreen: React.FC = () => {
  return (
    <div className="container">
      <div className="centerSection">
        <img className="logo" src={rfLogoLight} />
        <p className="title">Create Random Forest App</p>
      </div>
    </div>
  );
};

export default InitialScreen;
