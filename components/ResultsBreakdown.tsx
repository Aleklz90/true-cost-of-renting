import { FcHome } from "react-icons/fc";
import { Result } from "../types";
import { EJARI_REGISTRATION } from "@/engine/constants";

export const ResultsBreakdown = ({ result }: { result: Result }) => {
  const numberPrettier = (number: number) => {
    return new Intl.NumberFormat("ar-AE", {
      style: "currency",
      currency: "AED",
    }).format(number);
  };

  return (
    <div className="w-full sideblock">
      <div className="flex gap-1">
        <div className="resultBlock">
          <p>move-in</p>
          <p>{numberPrettier(result.moveInCash)}</p>
        </div>
        <div className="resultBlock">
          <p>first-year</p>
          <p>{numberPrettier(result.firstYearTotal)}</p>
        </div>
        <div className="resultBlock">
          <p>eff. monthly</p>
          <p>{numberPrettier(result.trueMonthly)}</p>
        </div>
      </div>
      <div className="bg-[#f7f7f7] rounded-lg h-18  flex items-center px-5 py-3">
        <FcHome className="w-6 h-6 mr-4" />
        <p>
          Listing says {numberPrettier(result.listedMonthly)}/mo - reality{" "}
          {numberPrettier(result.trueMonthly)}
          /mo.
        </p>
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
              <td>{numberPrettier(result.annualRent)}/yr</td>
            </tr>
            <tr>
              <td>Housing fee (5% of rent)</td>
              <td>Recurring</td>
              <td>
                {numberPrettier(result.housingFee.annual)}/yr(
                {numberPrettier(result.housingFee.monthly)}/mo)
              </td>
            </tr>
            <tr>
              <td>Agency fee(5%, capped 5000) + VAT</td>
              <td>One-time</td>
              <td>{numberPrettier(result.agencyFee)}</td>
            </tr>
            <tr>
              <td>Ejari registration</td>
              <td>One-time</td>
              <td>{numberPrettier(EJARI_REGISTRATION)}</td>
            </tr>
            <tr>
              <td>Security deposit</td>
              <td>One-time</td>
              <td>{numberPrettier(result.totalDeposit)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-[#f7f7f7] rounded-lg h-18  flex items-center px-5 py-3">
        <FcHome className="w-6 h-6 mr-4" />
        <p>
          {result.cheques} cheques of{" "}
          {numberPrettier(result.cheque)} AED
        </p>
      </div>
    </div>
  );
};

export default ResultsBreakdown;
