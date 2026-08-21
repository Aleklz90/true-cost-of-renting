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
} from "./constants";

const totalAnnualRent = (annualRent: number) => {
  return annualRent + annualRent * HOUSING_FEE_RATE;
};

export const calculateMoveInCash = (
  annualRent: number,
  chequeCount: number,
  agencyFee: number,
  ejariRegistration: number,
  securityDeposit: number,
  firstMove: boolean,
) => {
  // Upfront cash to move in = (annualRent / chequeCount) + Agency fee(5%, capped 5000) + Ejari registration + Security deposit
  let fee = 0;
  if (firstMove) {
    fee = DEWA_ACTIVATION_FEE;
  }
  return (
    totalAnnualRent(annualRent) / chequeCount +
    agencyFee +
    ejariRegistration +
    securityDeposit +
    fee
  );
};

export const calculateFirstYearTotal = (
  annualRent: number,
  agencyFee: number,
  ejariRegistration: number,
  housingFee: number,
) => {
  // firstYearTotal = annualRent + agency fee + ejari registration + housing fee
  return (
    totalAnnualRent(annualRent) + agencyFee + ejariRegistration + housingFee
  );
};

export const calculateTrueMonthly = (
  annualRent: number,
  agencyFee: number,
  ejariRegistration: number,
  housingFee: number,
) => {
  // trueMonthly = (annualRent + agency fee + ejari registration + housing fee) / 12
  return (
    calculateFirstYearTotal(
      totalAnnualRent(annualRent),
      agencyFee,
      ejariRegistration,
      housingFee,
    ) / 12
  );
};

export const calculateListedMonthly = (annualRent: number) => {
  return totalAnnualRent(annualRent) / 12;
};

export const calculateHousingFee = (annualRent: number) => {
  return {
    annual: totalAnnualRent(annualRent) * 0.05,
    monthly: (totalAnnualRent(annualRent) * 0.05) / 12,
  };
};

export const calculateAgencyFee = (annualRent: number) => {
  const fee = totalAnnualRent(annualRent) * (AGENCY_FEE_RATE + VAT_RATE);
  return fee < 5000 ? fee : 5000;
};

export const evaluateCheque = (annualRent: number, chequeCount: number) => {
  return totalAnnualRent(annualRent) / chequeCount;
};

export const calculateTotalDeposit = (
  furnished: boolean,
  chiller: boolean,
  type: string,
) => {
  let total;

  if (type === "apartment") {
    total = DEWA_DEPOSIT_APARTMENT;
  } else {
    total = DEWA_DEPOSIT_VILLA;
  }

  total = furnished
    ? total + total * DEPOSIT_RATE_FURNISHED
    : total + total * DEPOSIT_RATE_UNFURNISHED;
  if (chiller) total = total + CHILLER_DEPOSIT_ESTIMATE;

  return total;
};
