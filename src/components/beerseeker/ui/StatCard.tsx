import React from "react";

type StatCardProps = {
  label: string;
  value: string;
  detail: string;
};

export const StatCard = ({ label, value, detail }: StatCardProps) => (
  <div className="gov-stat">
    <p className="gov-stat__label">{label}</p>
    <p className="gov-stat__value">{value}</p>
    <p className="gov-stat__detail">{detail}</p>
  </div>
);
