import { FcHome } from "react-icons/fc";

export default function Home() {
  return (
    <div className="flex gap-15">
      <div>
        <form action="">
          <div>
            <label htmlFor="annual_rent">Annual rent</label>
            <input type="text" id="annual_rent" />
          </div>
          <div>
            <label htmlFor="cheques">Cheques</label>
            <input type="text" id="cheques" />
          </div>
          <div>
            <label htmlFor="property_type">Property type</label>
            <input type="text" id="property_type" />
          </div>
          <div>
            <label htmlFor="furnished">Furnished</label>
            <input type="text" id="furnished" />
          </div>
          <div>
            <label htmlFor="chiller">Chiller included in rent</label>
            <input type="text" id="chiller" />
          </div>
          <div>
            <label htmlFor="first_move">First move in Dubai</label>
            <input type="text" id="first_move" />
          </div>
          <button>Calculate</button>
        </form>
      </div>
      <div>
        <form action="">
          <div className="flex gap-3">
            <div className="resultBlock">
              <p>move-in cash</p>
              <h1>100</h1>
            </div>
            <div className="resultBlock">
              <p>first-year total</p>
              <h1>100</h1>
            </div>
            <div className="resultBlock">
              <p>effective monthly</p>
              <h1>100</h1>
            </div>
          </div>
          <div className="bg-[#f7f7f7] rounded-lg h-18  flex items-center px-5 py-3">
            <FcHome className="w-6 h-6 mr-4" />
            <p>Listing says 6,667/mo - reality 8,225/mo.</p>
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
                  <td>80,000/yr</td>
                </tr>
                <tr>
                  <td>Housing fee (5% of rent)</td>
                  <td>Recurring</td>
                  <td>4,000/yr(333/mo)</td>
                </tr>
                <tr>
                  <td>Agency fee(5%, capped 5000)</td>
                  <td>One-time</td>
                  <td>4000</td>
                </tr>
                <tr>
                  <td>Ejari registration</td>
                  <td>One-time</td>
                  <td>220</td>
                </tr>
                <tr>
                  <td>Security deposit</td>
                  <td>One-time</td>
                  <td>4000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-[#f7f7f7] rounded-lg h-18  flex items-center px-5 py-3">
            <FcHome className="w-6 h-6 mr-4" />
            <p>4 cheques of 20,000 AED</p>
          </div>
        </form>
      </div>
    </div>
  );
}
