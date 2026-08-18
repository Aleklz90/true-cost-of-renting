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
    </div>
  );
}
