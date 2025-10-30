"use client";

type Props = {
  value: string;
  setData: (fn: any) => void;
  data: any;
};

export default function AboutMeField({ value, setData, data }: Props) {
  return (
    <div className="field">
      <label>About Me</label>
      <textarea
        rows={4}
        value={value}
        placeholder="Tell us about yourself..."
        onChange={(e) => setData({ ...data, aboutMe: e.target.value })}
      />
    </div>
  );
}
