"use client";

import { useState } from "react";
import { FcHome } from "react-icons/fc";

type inputData = {
  annualRent: number;
  cheques: number;
  propertyType: string;
  furnished: boolean;
  chiller: boolean;
  firstMove: boolean;
};

const iniErrorObj = {
  annualRent: "",
  cheques: "",
  propertyType: "",
  furnished: "",
  chiller: "",
  firstMove: "",
};

const initData = {
  annualRent: 0,
  cheques: 0,
  propertyType: "",
  furnished: false,
  chiller: false,
  firstMove: false,
};

const initTouchedFields = {
  annualRent: false,
  cheques: false,
  propertyType: false,
  furnished: false,
  chiller: false,
  firstMove: false,
};

export default function Home() {
  const [error, setError] = useState(iniErrorObj);
  const [formData, setFormData] = useState(initData);
  const [touchedFields, setTouchedFields] = useState(initTouchedFields);

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
    if (formData.annualRent && formData.cheques && formData.propertyType) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="flex gap-15">
      <div>
        <form action="">
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
          <button disabled={buttonCheck()}>Calculate</button>
        </form>
      </div>
      <div>
        <form action="">
          <div className="flex gap-3">
            <div className="resultBlock">
              <p>move-in cash</p>
              <h1>100</h1>
            </div>
            <div className="resultBlock">
              <p>first-year total</p>
              <h1>100</h1>
            </div>
            <div className="resultBlock">
              <p>effective monthly</p>
              <h1>100</h1>
            </div>
          </div>
          <div className="bg-[#f7f7f7] rounded-lg h-18  flex items-center px-5 py-3">
            <FcHome className="w-6 h-6 mr-4" />
            <p>Listing says 6,667/mo - reality 8,225/mo.</p>
          </div>
          <div className="border rounded-xl border-[#e3e3e3]">
            <table>
              <thead>
                <tr>
                  <th>Line Item</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Annual rent</td>
                  <td>Recurring</td>
                  <td>80,000/yr</td>
                </tr>
                <tr>
                  <td>Housing fee (5% of rent)</td>
                  <td>Recurring</td>
                  <td>4,000/yr(333/mo)</td>
                </tr>
                <tr>
                  <td>Agency fee(5%, capped 5000)</td>
                  <td>One-time</td>
                  <td>4000</td>
                </tr>
                <tr>
                  <td>Ejari registration</td>
                  <td>One-time</td>
                  <td>220</td>
                </tr>
                <tr>
                  <td>Security deposit</td>
                  <td>One-time</td>
                  <td>4000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-[#f7f7f7] rounded-lg h-18  flex items-center px-5 py-3">
            <FcHome className="w-6 h-6 mr-4" />
            <p>4 cheques of 20,000 AED</p>
          </div>
        </form>
      </div>
    </div>
  );
}
