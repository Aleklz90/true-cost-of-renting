export type Checks = 1 | 2 | 4 | 6 | 12;

export type PropertyType = "apartment" | "villa";

export type InputData = {
  annualRent: number;
  cheques: Checks;
  propertyType: PropertyType;
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
  cheques: Checks;
  cheque: number;
};

export type ErrorsObj = {
  annualRent: string;
};

export type InitTouchedFieldsType = {
  annualRent: boolean;
};
