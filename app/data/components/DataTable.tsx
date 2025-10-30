"use client";

import type { Row } from "./useUsersData";

export default function DataTable({ rows }: { rows: Row[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Progress</th>
          <th>About</th>
          <th>Address</th>
          <th>Birthdate</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const addr = [r.street, r.city, r.state, r.zip].filter(Boolean).join(", ");
          return (
            <tr key={r.id}>
              <td>{r.email}</td>
              <td>{r.progress}</td>
              <td
                style={{
                  maxWidth: 300,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {r.aboutMe ?? ""}
              </td>
              <td>{addr}</td>
              <td>{r.birthdate ? r.birthdate.slice(0, 10) : ""}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
