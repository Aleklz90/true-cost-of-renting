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
import { inputData, ErrorsObj, initTouchedFieldsObj } from "../types";

export const checkData = (
  data: inputData,
  error: ErrorsObj,
  formData: inputData,
  touchedFields: initTouchedFieldsObj,
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

  return { updatedFormObj, updatedErrorObj };
};

export const buttonCheck = (formData: inputData, error: ErrorsObj) => {
  if (
    formData.annualRent &&
    formData.cheques &&
    formData.propertyType &&
    !error.annualRent &&
    !error.cheques &&
    !error.propertyType
  ) {
    return false;
  } else {
    return true;
  }
};

export const countResults = (formData: inputData) => {
  const agencyFee = calculateAgencyFee(formData.annualRent);
  const housingFee = calculateHousingFee(formData.annualRent);
  const totalDeposit = calculateTotalDeposit(
    formData.furnished,
    formData.chiller,
    formData.propertyType,
    formData.annualRent,
  );
  const moveInCash = calculateMoveInCash(
    formData.annualRent,
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
  const cheque = evaluateCheque(firstYearTotal, formData.cheques);

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
