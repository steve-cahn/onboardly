"use client";

type Props = {
  value: string;
  setData: (fn: any) => void;
  data: any;
};

export default function BirthdateField({ value, setData, data }: Props) {
  return (
    <div className="field">
      <label>Birthdate</label>
      <input
        type="date"
        value={value}
        onChange={(e) => setData({ ...data, birthdate: e.target.value })}
      />
    </div>
  );
}
