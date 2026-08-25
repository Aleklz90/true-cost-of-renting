export const initErrorObj = {
  annualRent: "",
  cheques: "",
  propertyType: "",
};

export const initTouchedFields = {
  annualRent: false,
  cheques: false,
  propertyType: false,
  furnished: false,
  chiller: false,
  firstMove: false,
};

export const initData = {
  annualRent: 0,
  cheques: 1 as const,
  propertyType: "apartment" as const,
  furnished: false,
  chiller: false,
  firstMove: false,
};

export const initResult = {
  moveInCash: 0,
  firstYearTotal: 0,
  trueMonthly: 0,
  listedMonthly: 0,
  annualRent: 0,
  housingFee: { annual: 0, monthly: 0 },
  agencyFee: 0,
  totalDeposit: 0,
  cheques: 1 as const,
  cheque: 0,
};
