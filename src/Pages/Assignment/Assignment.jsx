import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { data as rawData } from "../../result.js";
import { getPieData } from "../../utils.js";
import "./Assignment.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8854d0"];

function Assignment() {
  const [topRequired, setTopRequired] = useState([]);
  const [leastAvailable, setLeastAvailable] = useState([]);

  useEffect(() => {
    // Top 5 Most Required Fertilizers
    const requiredData = getPieData(rawData, "requirement_in_mt_");
    setTopRequired(requiredData);

    //  5 Least Available Fertilizers
    const availabilityTotals = {};
    rawData.forEach((item) => {
      const { product, availability_in_mt_ } = item;
      const val = parseFloat(availability_in_mt_);
      if (!isNaN(val)) {
        if (availabilityTotals[product] === undefined) {
          availabilityTotals[product] = 0;
        }
        availabilityTotals[product] += val;
      }
    });

    const least5 = Object.entries(availabilityTotals)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));

    setLeastAvailable(least5);
  }, []);

  return (
    <div className="assignment-container">
      <h2 className="heading-text">
        Top 5 Most Required Fertilizers & Top 5 Least Available Fertilizers
      </h2>

      <div className="tables-row">
        {/* ✔️ Top 5 Most Required Fertilizers Table */}
        <div className="table-wrapper">
          <h3>Top 5 Most Required Fertilizers</h3>
          <table>
            <thead>
              <tr>
                <th>Fertilizer</th>
                <th>Requirement (MT)</th>
              </tr>
            </thead>
            <tbody>
              {topRequired.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top 5 Least Available Fertilizers Table */}
        <div className="table-wrapper">
          <h3>Top 5 Least Available Fertilizers</h3>
          <table>
            <thead>
              <tr>
                <th>Fertilizer</th>
                <th>Total Availability (MT)</th>
              </tr>
            </thead>
            <tbody>
              {leastAvailable.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/*Two Pie Charts side by side */}
      <div className="charts-row">
        {/* Chart for Top 5 Most Required */}
        <div className="chart-container">
          <h3>Top 5 Required Fertilizers Chart</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={topRequired}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {topRequired.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Chart for Top 5 Least Available */}
        <div className="chart-container">
          <h3>Top 5 Least Available Fertilizers Chart</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={leastAvailable}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {leastAvailable.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Assignment;
