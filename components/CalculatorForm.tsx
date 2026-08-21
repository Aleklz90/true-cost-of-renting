"use client";

import { useState } from "react";
import { inputData, Result } from "../types";
import ResultsBreakdown from "./ResultsBreakdown";
import {
  calculateMoveInCash,
  calculateFirstYearTotal,
  calculateTrueMonthly,
  calculateListedMonthly,
  calculateHousingFee,
  calculateAgencyFee,
  evaluateCheque,
  calculateTotalDeposit,
} from "../engine/calculate";
import { EJARI_REGISTRATION } from "../engine/constants";

const iniErrorObj = {
  annualRent: "",
  cheques: "",
  propertyType: "",
  furnished: "",
  chiller: "",
  firstMove: "",
};

const initTouchedFields = {
  annualRent: false,
  cheques: false,
  propertyType: false,
  furnished: false,
  chiller: false,
  firstMove: false,
};

const initData = {
  annualRent: 0,
  cheques: 0,
  propertyType: "",
  furnished: false,
  chiller: false,
  firstMove: false,
};

const initResult = {
  moveInCash: 0,
  firstYearTotal: 0,
  trueMonthly: 0,
  listedMonthly: 0,
  annualRent: 0,
  housingFee: { annual: 0, monthly: 0 },
  agencyFee: 0,
  EJARI_REGISTRATION: 0,
  totalDeposit: 0,
  cheques: 0,
  cheque: 0,
};

const CalculatorForm = () => {
  const [formData, setFormData] = useState(initData);
  const [error, setError] = useState(iniErrorObj);
  const [touchedFields, setTouchedFields] = useState(initTouchedFields);
  const [result, setResult] = useState<Result>(initResult);

  const checkData = (data: inputData) => {
    console.log(data);
    let updatedErrorObj = { ...error };
    let updatedFormObj = { ...formData };
    if (touchedFields.annualRent) {
      if (isNaN(data.annualRent)) {
        updatedErrorObj = {
          ...updatedErrorObj,
          annualRent: "annual rent should be a number",
        };
      } else if (data.annualRent <= 0) {
        updatedErrorObj = {
          ...updatedErrorObj,
          annualRent: "annual rent should be greater than 0",
        };
      } else {
        updatedErrorObj = {
          ...updatedErrorObj,
          annualRent: "",
        };
        updatedFormObj = { ...updatedFormObj, annualRent: data.annualRent };
      }
    }

    if (touchedFields.cheques) {
      if (data.cheques) {
        updatedFormObj = { ...updatedFormObj, cheques: data.cheques };
        updatedErrorObj = {
          ...updatedErrorObj,
          cheques: "",
        };
      } else {
        updatedErrorObj = {
          ...updatedErrorObj,
          cheques: "You have to choose cheques number",
        };
      }
    }

    if (touchedFields.propertyType) {
      if (data.propertyType) {
        updatedFormObj = { ...updatedFormObj, propertyType: data.propertyType };
        updatedErrorObj = {
          ...updatedErrorObj,
          propertyType: "",
        };
      } else {
        updatedErrorObj = {
          ...updatedErrorObj,
          propertyType: "You have to choose property type",
        };
      }
    }

    updatedFormObj = {
      ...updatedFormObj,
      furnished: data.furnished,
      chiller: data.chiller,
      firstMove: data.firstMove,
    };
    updatedErrorObj = {
      ...updatedErrorObj,
      furnished: "",
    };

    setFormData(updatedFormObj);

    setError(updatedErrorObj);
  };

  const buttonCheck = () => {
    console.log(formData.annualRent, formData.cheques, formData.propertyType);
    console.log(
      formData.annualRent &&
        formData.cheques &&
        formData.propertyType &&
        !error.annualRent &&
        !error.cheques &&
        !error.propertyType,
    );
    if (
      formData.annualRent &&
      formData.cheques &&
      formData.propertyType &&
      !error.annualRent &&
      !error.cheques &&
      !error.propertyType
    ) {
      console.log("test");
      return false;
    } else {
      return true;
    }
  };

  const countResults = () => {
    const agencyFee = calculateAgencyFee(formData.annualRent);
    const housingFee = calculateHousingFee(formData.annualRent);
    const totalDeposit = calculateTotalDeposit(
      formData.furnished,
      formData.chiller,
      formData.propertyType,
    );
    const moveInCash = calculateMoveInCash(
      formData.annualRent,
      formData.cheques,
      agencyFee,
      EJARI_REGISTRATION,
      totalDeposit,
      formData.firstMove,
    );
    const firstYearTotal = calculateFirstYearTotal(
      formData.annualRent,
      agencyFee,
      EJARI_REGISTRATION,
      housingFee.annual,
    );
    const trueMonthly = calculateTrueMonthly(
      formData.annualRent,
      agencyFee,
      EJARI_REGISTRATION,
      housingFee.annual,
    );
    const listedMonthly = calculateListedMonthly(formData.annualRent);
    const cheque = evaluateCheque(formData.annualRent, formData.cheques);

    console.log(formData.cheques);

    setResult({
      moveInCash,
      firstYearTotal,
      trueMonthly,
      listedMonthly,
      annualRent: formData.annualRent,
      housingFee: { annual: housingFee.annual, monthly: housingFee.monthly },
      agencyFee,
      EJARI_REGISTRATION,
      totalDeposit,
      cheques: formData.cheques,
      cheque,
    });
  };
  return (
    <div className="flex gap-5 justify-between">
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          countResults();
        }}
      >
        <div>
          <label htmlFor="annual_rent">Annual rent</label>
          <input
            type="text"
            id="annual_rent"
            onClick={() =>
              setTouchedFields({ ...touchedFields, annualRent: true })
            }
            onBlurCapture={(e) =>
              checkData({ ...formData, annualRent: Number(e.target.value) })
            }
          />
          <div className="error">{error.annualRent}</div>
        </div>
        <div>
          <div className="flex flex-col">
            <label htmlFor="cheques">Cheques</label>
            <select
              id="cheques"
              onClick={() =>
                setTouchedFields({ ...touchedFields, cheques: true })
              }
              onBlurCapture={(e) =>
                checkData({ ...formData, cheques: Number(e.target.value) })
              }
            >
              <option value="">Select number...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="error">{error.cheques}</div>
        </div>
        <div>
          <label htmlFor="property_type">Property type</label>
          <select
            id="property_type"
            onClick={() =>
              setTouchedFields({ ...touchedFields, propertyType: true })
            }
            onBlurCapture={(e) =>
              checkData({ ...formData, propertyType: e.target.value })
            }
          >
            <option value="">Select number...</option>
            <option value="apartment">apartment</option>
            <option value="villa">villa</option>
          </select>
          <div className="error">{error.propertyType}</div>
        </div>
        <div className="flex gap-2 flex-col">
          <label htmlFor="furnished">Furnished</label>
          <input
            type="checkbox"
            id="furnished"
            onClick={() => {
              setTouchedFields({ ...touchedFields, furnished: true });
              checkData({ ...formData, furnished: !formData.furnished });
            }}
          />
          <div className="error">{error.furnished}</div>
        </div>
        <div className="flex gap-2 flex-col">
          <label htmlFor="chiller">Chiller included in rent</label>
          <input
            type="checkbox"
            id="chiller"
            onClick={() => {
              checkData({ ...formData, chiller: !formData.chiller });
            }}
          />
          <div className="error">{error.chiller}</div>
        </div>
        <div className="flex gap-2 flex-col">
          <label htmlFor="first_move">First move in Dubai</label>
          <input
            type="checkbox"
            id="first_move"
            onClick={() => {
              checkData({ ...formData, firstMove: !formData.firstMove });
            }}
          />
          <div className="error">{error.firstMove}</div>
        </div>
        <button
          disabled={buttonCheck()}
          className="bg-[#ea3934] text-[white] h-10 rounded-lg text-base font-semibold hover:bg-[#97211e] cursor-pointer disabled:opacity-50 disabled:hover:bg-[#ea3934] disabled:hover:cursor-not-allowed"
        >
          Calculate
        </button>
      </form>
      <ResultsBreakdown result={result} />
    </div>
  );
};

export default CalculatorForm;
