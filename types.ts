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
  EJARI_REGISTRATION: number;
  totalDeposit: number;
  cheques: number;
  cheque: number;
};
