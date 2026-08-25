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
import { InputData, ErrorsObj, InitTouchedFieldsType } from "../types";

export const checkData = (
  data: InputData,
  error: ErrorsObj,
  formData: InputData,
  touchedFields: InitTouchedFieldsType,
) => {
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

  updatedFormObj = {
    ...updatedFormObj,
    furnished: data.furnished,
    chiller: data.chiller,
    firstMove: data.firstMove,
  };

  return { updatedFormObj, updatedErrorObj };
};

export const buttonCheck = (formData: InputData, error: ErrorsObj) => {
  if (
    formData.annualRent &&
    formData.cheques &&
    formData.propertyType &&
    !error.annualRent
  ) {
    return false;
  } else {
    return true;
  }
};

export const countResults = (formData: InputData) => {
  const agencyFee = calculateAgencyFee(formData.annualRent);
  const housingFee = calculateHousingFee(formData.annualRent);
  const totalDeposit = calculateTotalDeposit(
    formData.annualRent,
    formData.propertyType,
    formData.chiller,
    formData.furnished,
  );
  const moveInCash = calculateMoveInCash(
    formData.annualRent,
    agencyFee,
    formData.cheques,
    totalDeposit,
    formData.firstMove,
  );
  const firstYearTotal = calculateFirstYearTotal(
    formData.annualRent,
    agencyFee,
    housingFee.annual,
    formData.firstMove,
  );
  const trueMonthly = calculateTrueMonthly(
    formData.annualRent,
    agencyFee,
    housingFee.annual,
    formData.firstMove,
  );
  const listedMonthly = calculateListedMonthly(formData.annualRent);
  const cheque = evaluateCheque(formData.annualRent, formData.cheques);

  return {
    moveInCash,
    firstYearTotal,
    trueMonthly,
    listedMonthly,
    annualRent: formData.annualRent,
    housingFee: { annual: housingFee.annual, monthly: housingFee.monthly },
    agencyFee,
    totalDeposit,
    cheques: formData.cheques,
    cheque,
  };
};
