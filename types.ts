export type inputData = {
  annualRent: number;
  cheques: number;
  propertyType: string;
  furnished: boolean;
  chiller: boolean;
  firstMove: boolean;
};

export type HousingFee = {
  annual: number;
  monthly: number;
};

export type Result = {
  moveInCash: number;
  firstYearTotal: number;
  trueMonthly: number;
  listedMonthly: number;
  annualRent: number;
  housingFee: HousingFee;
  agencyFee: number;
  totalDeposit: number;
  cheques: number;
  cheque: number;
};

export type ErrorsObj = {
  annualRent: string;
  cheques: string;
  propertyType: string;
  furnished: string;
  chiller: string;
  firstMove: string;
};

export type initTouchedFieldsObj = {
  annualRent: boolean;
  cheques: boolean;
  propertyType: boolean;
  furnished: boolean;
  chiller: boolean;
  firstMove: boolean;
};
