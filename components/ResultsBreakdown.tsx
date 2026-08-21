import { FcHome } from "react-icons/fc";
import { Result } from "../types";

export const ResultsBreakdown = ({ result }: { result: Result }) => {
  const numberPrettier = (number: number) => {
    const str = number.toFixed().toString();
    let result = "";
    for (let i = 0; i < str.length; i++) {
      result = result + str[i];
      if ((str.length - i - 1) % 3 === 0 && str.length - i - 1 !== 0)
        result = result + ",";
    }

    return result;
  };
  return (
    <form action="" className="w-full">
      <div className="flex gap-3">
        <div className="resultBlock">
          <p>move-in cash</p>
          <h1>{numberPrettier(result.moveInCash)}</h1>
        </div>
        <div className="resultBlock">
          <p>first-year total</p>
          <h1>{numberPrettier(result.firstYearTotal)}</h1>
        </div>
        <div className="resultBlock">
          <p>effective monthly</p>
          <h1>{numberPrettier(result.trueMonthly)}</h1>
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
              <td>Agency fee(5%, capped 5000)</td>
              <td>One-time</td>
              <td>{numberPrettier(result.agencyFee)}</td>
            </tr>
            <tr>
              <td>Ejari registration</td>
              <td>One-time</td>
              <td>{numberPrettier(result.EJARI_REGISTRATION)}</td>
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
          {numberPrettier(result.cheques)} cheques of{" "}
          {numberPrettier(result.cheque)} AED
        </p>
      </div>
    </form>
  );
};

export default ResultsBreakdown;
