import React from "react";
import NumberFormat from "react-number-format";
import "./App.css";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [quantitySize, setQuantitySize] = useState("");
  const [position, setPosition] = useState("");
  const [positionSize, setPositionSize] = useState("");
  const [capital, setCapital] = useState(0);
  const [marketPrice, setMarketPrice] = useState(0);
  const [volatility, SetVolatilty] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [graphRan, setGraphRan] = useState([]);
  const [alertPositionSize, setalertPositionSize] = useState(false);
  const [submitValidate, setSubmitValidate] = useState(false);

  const getRndInteger = (min, max) => {
    //console.log(Math.floor(Math.random() * (max - min + 1) ) + min);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const ShowGraph = () => {
    let range = [];
    let mp = parseInt(marketPrice.replace(/,/g, ""));
    let a = mp - mp * volatility;
    let b = mp + mp * volatility;
    console.log(a + " " + b);
    for (let i = 0; i < 12; i++) {
      range.push(getRndInteger(a, b));
    }
    setShowGraph(true);
    setGraphRan(range);
    //console.log(range);
  };
  const validateSubmit = () => {
    if (positionSize > 100) {
      setSubmitValidate(false);
      setalertPositionSize(true);
      setTimeout(() => {
        setalertPositionSize(false);
      }, 3000);
    } else {
      setSubmitValidate(true);
    }
  };
  const formatToCurrency = (amount) => {
    amount = parseInt(amount);
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const handleInputChange = (event) => {
    console.log(event.target.name);

    let mp = parseInt(marketPrice.replace(/,/g, ""));
    let cap = parseInt(capital.replace(/,/g, ""));

    if (event.target.name === "position") {
      // After updating position
      const positionValue = parseInt(position);
      let posSize = positionValue / cap;
      console.log(posSize, positionValue, mp, cap);
      setPositionSize(posSize);
      let quant = positionValue / mp;
      setQuantitySize(quant.toFixed(2));
    } else if (event.target.name === "positionSize") {
      // After updating position size
      const positionSizeValue = parseInt(positionSize);
      let pos = positionSizeValue * cap;
      console.log(pos, positionSizeValue, mp, cap);
      setPosition(pos);
      let quant = (pos / mp)/100;
      setQuantitySize(quant.toFixed(2));
    } else if (event.target.name === "quantitySize") {
      // After updating quantity size
      const quantityValue = parseInt(quantitySize);
      let pos = quantityValue * mp;
      console.log(pos, quantityValue, mp, cap);
      setPosition(pos);
      let posSize = pos / cap;
      setPositionSize(posSize);
    }
  };

  const data = {
    labels: [
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
    ],
    datasets: [
      {
        label: "Simulator",
        data: [...graphRan],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="container">
      <form
        action="/"
        onSubmit={(e) => {
          e.preventDefault();
          validateSubmit();
          if (submitValidate) {
            ShowGraph();
          }
        }}
      >
        <div className="form first">
          <div className="details personal">
            <span className="title">Trading Simulator</span>

            <div className="fields">
              <div className="input-field">
                <label>Instrument</label>
                <select required>
                  <option disabled selected></option>
                  <option>BTC</option>
                  <option>ETH</option>
                </select>
              </div>

              <div className="input-field">
                <label>Market price</label>
                <NumberFormat
                  thousandSeparator={true}
                  id="market-price"
                  value={marketPrice}
                  onChange={(e) => {
                    setMarketPrice(e.target.value);
                  }}
                />
              </div>

              <div className="input-field">
                <label>Capital</label>
                <NumberFormat
                  thousandSeparator={true}
                  onChange={(e) => {
                    setCapital(e.target.value);
                  }}
                />
              </div>

              <div className="input-field">
                <label>Position size(IN %)</label>
                <input
                  type="number"
                  id="position-size"
                  name="positionSize"
                  onBlur={handleInputChange}
                  onChange={(e) => setPositionSize(e.target.value)}
                  value={positionSize}
                />

                {alertPositionSize && alert("Enter a valid position size")}
              </div>

              <div className="input-field">
                <label>Qty-size</label>
                <input
                  type="decimal"
                  id="quantity-size"
                  name="quantitySize"
                  onBlur={handleInputChange}
                  onChange={(e) => setQuantitySize(e.target.value)}
                  value={quantitySize}
                />
              </div>

              <div className="input-field">
                <label>Position</label>
                <input
                  type="long"
                  name="position"
                  onBlur={handleInputChange}
                  onChange={(e) => setPosition(e.target.value)}
                  value={parseInt(position) ? parseInt(position) / 100 : ""}
                />
              </div>
            </div>
          </div>

          <div className="details ID">
            <span className="title"></span>

            <div className="fields">
              <div className="input-field">
                <label>Trigger price</label>
                <NumberFormat thousandSeparator={true} />
              </div>

              <div className="input-field">
                <label>Stop price</label>
                <NumberFormat thousandSeparator={true} />
              </div>

              <div className="input-field">
                <label>Market volatility</label>
                <select
                  value={volatility}
                  onChange={(e) => {
                    SetVolatilty(e.target.value);
                  }}
                >
                  <option selected></option>
                  <option value={0.8}>High</option>
                  <option value={0.4}>Medium</option>
                  <option value={0.2}>Low</option>
                </select>
              </div>

              <div className="input-field">
                <label>Limit price</label>
                <NumberFormat thousandSeparator={true} />
              </div>
              <div className="input-field">
                <label>Brokerage</label>
                <NumberFormat thousandSeparator={true} id="brokerage" />
              </div>

              <div className="input-field">
                <label>Order side</label>
                <select required>
                  <option disabled selected></option>
                  <option>LONG</option>
                  <option>SHORT</option>
                </select>
              </div>
              <div className="input-field">
                <label>Metrics</label>
                {showGraph && (
                  <div>
                    <Line data={data} width={"1000px"} height={"500px"} />
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="nextBtn">
              <span className="btnText">Simulate</span>
              <i className="uil uil-navigator"></i>
            </button>
          </div>
        </div>

        <button className="submit">
          <span className="btnText"></span>
          <i className="uil uil-navigator"></i>
        </button>
      </form>

      <div className="shade"></div>
    </div>
  );
}

export default App;
