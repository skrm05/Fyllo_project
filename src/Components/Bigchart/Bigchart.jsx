import { useState } from "react";
import "./Bigchart.css";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Legend,
} from "recharts";

function Bigchart({ title, data, filterByStateAndMonth = true }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const states = [
    "Andaman & Nicobar",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chattishgarh",
    "Dadra & Nagar Haveli",
    "Delhi",
    "Goa",
    "Gujarat",
    "Harayana",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharastra",
    "Manipur",
    "Megalaya",
    "Mizoram",
    "Nagaland",
    "Orissa",
    "Pondicherry",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Tripura",
    "Telangana",
    "Uttar Pradesh",
    "Uttaranchal",
    "West Bengal",
    "Daman & Diu",
    "Lakshadweep",
    "Sikkim",
  ];

  const [statevalue, setStatevalue] = useState(states[0]);
  const [monthvalue, setMonthvalue] = useState(months[0]);

  function OnchangeSetstatevalue(e) {
    setStatevalue(e.target.value);
  }

  function OnchangeSetmonthvalue(e) {
    setMonthvalue(e.target.value);
  }

  let chartData = [];

  if (filterByStateAndMonth) {
    chartData = data.filter((obj) => {
      return obj["state"] === statevalue && obj["month"] === monthvalue;
    });

    chartData.forEach((element) => {
      element["requirement_in_mt_"] =
        parseFloat(element["requirement_in_mt_"]) || 0;
      element["availability_in_mt_"] =
        parseFloat(element["availability_in_mt_"]) || 0;
    });
  } else {
    const productMap = new Map();

    data.forEach((item) => {
      const product = item.product;
      if (!productMap.has(product)) {
        productMap.set(product, {
          product,
          requirement_in_mt_: 0,
          availability_in_mt_: 0,
        });
      }
      const entry = productMap.get(product);
      entry.requirement_in_mt_ += parseFloat(item.requirement_in_mt_) || 0;
      entry.availability_in_mt_ += parseFloat(item.availability_in_mt_) || 0;
    });

    chartData = Array.from(productMap.values());
  }

  return (
    <div className="bigchart">
      <h3 className="bigchartTitle">{title}</h3>
      {filterByStateAndMonth && (
        <div className="bigchartSelect">
          <h5>Month</h5>
          <select onChange={OnchangeSetmonthvalue}>
            {months.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>

          <h5>State</h5>
          <select onChange={OnchangeSetstatevalue}>
            {states.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>

          {chartData.length === 0 && (
            <h6 className="errordata">No data available to show</h6>
          )}
        </div>
      )}

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="requirement_in_mt_"
            fill="#60AC4A"
            name="Requirement (MT)"
          />
          <Bar
            dataKey="availability_in_mt_"
            fill="#FF6347"
            name="Availability (MT)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Bigchart;
