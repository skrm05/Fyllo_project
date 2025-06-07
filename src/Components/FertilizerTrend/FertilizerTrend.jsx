import React, { useState } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { data } from "../../result";
import "./FertilizerTrend.css";

const monthOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function FertilizerTrend() {
  const [selectedProduct, setSelectedProduct] = useState("Urea");

  const monthlyAgg = {};

  data
    .filter((item) => item.product === selectedProduct)
    .forEach((item) => {
      // item.month assumed to be numeric 1-12, convert once here to month name:
      const monthIndex = Number(item.month) - 1;
      const month = monthOrder[monthIndex];

      if (!monthlyAgg[month]) {
        monthlyAgg[month] = {
          month,
          requirement_in_mt_: 0,
          availability_in_mt_: 0,
        };
      }
      monthlyAgg[month].requirement_in_mt_ +=
        Number(item.requirement_in_mt_) || 0;
      monthlyAgg[month].availability_in_mt_ +=
        Number(item.availability_in_mt_) || 0;
    });

  const monthlyData = Object.values(monthlyAgg).sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  return (
    <div className="fertilizer-trend-container">
      <h3 className="fertilizer-trend-title">
        Product Availability and Requirements accros the year(Monthly) :{" "}
        <span>{selectedProduct}</span>
      </h3>

      <div className="fertilizer-trend-dropdown-container">
        <select
          onChange={(e) => setSelectedProduct(e.target.value)}
          value={selectedProduct}
          className="fertilizer-trend-dropdown"
        >
          {[...new Set(data.map((d) => d.product))].map((prod) => (
            <option key={prod} value={prod}>
              {prod}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="requirement_in_mt_"
            fill="#8884d8"
            name="Requirement"
            label
          />
          <Bar
            dataKey="availability_in_mt_"
            fill="#82ca9d"
            name="Availability"
            label
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FertilizerTrend;
