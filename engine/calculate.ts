import {
  AGENCY_FEE_RATE,
  VAT_RATE,
  DEPOSIT_RATE_UNFURNISHED,
  DEPOSIT_RATE_FURNISHED,
  DEWA_DEPOSIT_APARTMENT,
  DEWA_DEPOSIT_VILLA,
  CHILLER_DEPOSIT_ESTIMATE,
  HOUSING_FEE_RATE,
  DEWA_ACTIVATION_FEE,
  EJARI_REGISTRATION,
} from "./constants";
import { PropertyType } from "@/types";

export const calculateMoveInCash = (
  annualRent: number,
  chequeCount: number,
  securityDeposit: number,
  firstMove: boolean,
  agencyFee: number,
) => {
  // Upfront cash to move in = (annualRent / chequeCount) + Agency fee(5%, capped 5000) + Ejari registration + Security deposit

  let activation;

  if (firstMove) {
    activation = DEWA_ACTIVATION_FEE;
  } else {
    activation = 0;
  }

  return (
    annualRent / chequeCount +
    calculateAgencyFee(annualRent) +
    EJARI_REGISTRATION +
    securityDeposit +
    activation
  );
};

export const calculateFirstYearTotal = (
  annualRent: number,
  agencyFee: number,
  housingFee: number,
  firstMove: boolean,
) => {
  // firstYearTotal = annualRent + agency fee + ejari registration + housing fee
  let activation;
  if (firstMove) {
    activation = DEWA_ACTIVATION_FEE;
  } else {
    activation = 0;
  }
  return annualRent + agencyFee + EJARI_REGISTRATION + housingFee + activation;
};

export const calculateTrueMonthly = (
  annualRent: number,
  agencyFee: number,
  housingFee: number,
  firstMove: boolean,
) => {
  // trueMonthly = (annualRent + agency fee + ejari registration + housing fee) / 12
  return (
    calculateFirstYearTotal(annualRent, agencyFee, housingFee, firstMove) / 12
  );
};

export const calculateListedMonthly = (annualRent: number) => {
  return annualRent / 12;
};

export const calculateHousingFee = (annualRent: number) => {
  return {
    annual: annualRent * HOUSING_FEE_RATE,
    monthly: (annualRent * HOUSING_FEE_RATE) / 12,
  };
};

export const calculateAgencyFee = (annualRent: number) => {
  const fee =
    annualRent * AGENCY_FEE_RATE + annualRent * AGENCY_FEE_RATE * VAT_RATE;
  return fee < 5000 * (1 + VAT_RATE) ? fee : 5000 * (1 + VAT_RATE);
};

export const evaluateCheque = (annualRent: number, chequeCount: number) => {
  return annualRent / chequeCount;
};

export const calculateTotalDeposit = (
  annualRent: number,
  type: PropertyType,
  chiller: boolean,
  furnished: boolean,
) => {
  let total;

  if (type === "apartment") {
    total = DEWA_DEPOSIT_APARTMENT;
  } else {
    total = DEWA_DEPOSIT_VILLA;
  }
  total = furnished
    ? total + annualRent * DEPOSIT_RATE_FURNISHED
    : total + annualRent * DEPOSIT_RATE_UNFURNISHED;

  if (chiller) total = total + CHILLER_DEPOSIT_ESTIMATE;

  return total;
};
