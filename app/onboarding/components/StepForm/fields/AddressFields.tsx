"use client";

type Props = {
  data: any;
  setData: (fn: any) => void;
};

export default function AddressFields({ data, setData }: Props) {
  return (
    <>
      <div className="field">
        <label>Street Address</label>
        <input
          type="text"
          value={data.street}
          onChange={(e) => setData({ ...data, street: e.target.value })}
          placeholder="123 Main St"
        />
      </div>

      <div className="row">
        <div className="field half">
          <label>City</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            placeholder="City"
          />
        </div>

        <div className="field half">
          <label>State</label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => setData({ ...data, state: e.target.value })}
            placeholder="NY"
          />
        </div>
      </div>

      <div className="field">
        <label>Zip Code</label>
        <input
          type="text"
          value={data.zip}
          onChange={(e) => setData({ ...data, zip: e.target.value })}
          placeholder="10001"
        />
      </div>
    </>
  );
}
