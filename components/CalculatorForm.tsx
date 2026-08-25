"use client";

import { useState } from "react";
import { Result, InputData, Checks, PropertyType } from "../types";
import ResultsBreakdown from "./ResultsBreakdown";
import { checkData, buttonCheck, countResults } from "./helpers";

import {
  initErrorObj,
  initTouchedFields,
  initData,
  initResult,
} from "./initStates";

const CalculatorForm = () => {
  const [formData, setFormData] = useState<InputData>(initData);
  const [error, setError] = useState(initErrorObj);
  const [touchedFields, setTouchedFields] = useState(initTouchedFields);
  const [result, setResult] = useState<Result>(initResult);

  const isValidNumberOfChecks = (v: unknown): v is Checks => {
    return v === 1 || v === 2 || v === 4 || v === 6 || v === 12;
  };

  const isValidPropertyType = (v: unknown): v is PropertyType => {
    return v === "apartment" || v === "villa";
  };

  console.log(buttonCheck(formData, error));

  return (
    <div className="flex flex-col gap-5 justify-between lg:flex-row p-6">
      <form
        className="w-full sideblock place-content-between"
        onSubmit={(e) => {
          e.preventDefault();
          const results = countResults(formData);
          setResult(results);
        }}
      >
        <div>
          <label htmlFor="annual_rent">Annual rent</label>
          <input
            type="text"
            inputMode="numeric"
            id="annual_rent"
            onFocus={() =>
              setTouchedFields({ ...touchedFields, annualRent: true })
            }
            onBlurCapture={(e) => {
              const result = checkData(
                { ...formData, annualRent: Number(e.target.value) },
                error,
                formData,
                touchedFields,
              );

              setFormData(result.updatedFormObj);

              setError(result.updatedErrorObj);
            }}
          />
          <div className="error">{error.annualRent}</div>
        </div>
        <div>
          <div className="flex flex-col">
            <label htmlFor="cheques">Cheques</label>
            <select
              id="cheques"
              onFocus={() =>
                setTouchedFields({ ...touchedFields, cheques: true })
              }
              onBlurCapture={(e) => {
                const number = Number(e.target.value);
                if (isValidNumberOfChecks(number)) {
                  const result = checkData(
                    { ...formData, cheques: number },
                    error,
                    formData,
                    touchedFields,
                  );
                  setFormData(result.updatedFormObj);

                  setError(result.updatedErrorObj);
                }
              }}
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
            onFocus={() =>
              setTouchedFields({ ...touchedFields, propertyType: true })
            }
            onBlurCapture={(e) => {
              const number = e.target.value;
              if (isValidPropertyType(number)) {
                const result = checkData(
                  { ...formData, propertyType: number },
                  error,
                  formData,
                  touchedFields,
                );
                setFormData(result.updatedFormObj);

                setError(result.updatedErrorObj);
              }
            }}
          >
            <option value="">Select type...</option>
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
              const result = checkData(
                { ...formData, furnished: !formData.furnished },
                error,
                formData,
                touchedFields,
              );

              setFormData(result.updatedFormObj);

              setError(result.updatedErrorObj);
            }}
          />
        </div>
        <div className="flex gap-2 flex-col">
          <label htmlFor="chiller">Chiller included in rent</label>
          <input
            type="checkbox"
            id="chiller"
            onClick={() => {
              const result = checkData(
                { ...formData, chiller: !formData.chiller },
                error,
                formData,
                touchedFields,
              );

              setFormData(result.updatedFormObj);

              setError(result.updatedErrorObj);
            }}
          />
        </div>
        <div className="flex gap-2 flex-col">
          <label htmlFor="first_move">First move in Dubai</label>
          <input
            type="checkbox"
            id="first_move"
            onClick={() => {
              const result = checkData(
                { ...formData, firstMove: !formData.firstMove },
                error,
                formData,
                touchedFields,
              );

              setFormData(result.updatedFormObj);

              setError(result.updatedErrorObj);
            }}
          />
        </div>
        <button
          disabled={buttonCheck(formData, error)}
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
