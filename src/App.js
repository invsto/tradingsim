import React from 'react';
import './App.css';
import {useState,useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function App() {
  const [quantitySize, setQuantitySize] = useState(0);
  const [position, setPosition] = useState(0);
  const [positionSize, setPositionSize] = useState(0);
  const [capital, setCapital] = useState(0);
  const [marketPrice, setMarketPrice] = useState(0);
  const [volatility, SetVolatilty] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [graphRan, setGraphRan] = useState([]);

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  const ShowGraph = () => {
    
    let range = [];
    let a = marketPrice - marketPrice*volatility;
    let b = marketPrice + marketPrice*volatility;

    for(let i=0; i<12; i++){
      range.push(getRndInteger(a,b));
    }
    setShowGraph(true);
    setGraphRan(range);
    //console.log(range);
  }


  useEffect(()=>{
    if(quantitySize>0){
      let pos = quantitySize*marketPrice;
      setPosition(pos);
      let posSize = position/capital;
      setPositionSize(posSize);
    }
  }, [quantitySize]);

  useEffect(()=>{
    if(positionSize>0){
      let pos = positionSize*capital;
      setPosition(pos);
      let quant = position/marketPrice;
      setQuantitySize(quant);
    }
  }, [positionSize])

  useEffect(()=>{
    if(position>0){
      let posSize = position/capital;
      setPositionSize(posSize);
      let quant = position/marketPrice;
      setQuantitySize(quant);
    }
  }, [position])

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Simulator",
        data: [...graphRan],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  return (
    <div className="container">        
        {
          !showGraph &&           
          <form action="/" onSubmit={(e)=>{
            e.preventDefault();
            ShowGraph();
          }}>
          <div className="form first">
              <div className="details personal">
                  <span className="title">Details</span>

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
                          <input type="decimal" id="market-price" 
                          value={marketPrice}
                          onChange={(e)=>{setMarketPrice(e.target.value)}} />
                      </div>

                      <div className="input-field">
                          <label>Brokerage</label>
                          <input type="decimal" id="brokerage" />
                      </div>

                      <div className="input-field">
                          <label>Position size</label>
                          <input type="number" id="position-size" onChange={(e)=>{setPositionSize(e.target.value)}} value={positionSize} />
                      </div>

                      <div className="input-field">
                          <label>Qty-size</label>
                          <input type="decimal" id="quantity-size" onChange={(e)=>{setQuantitySize(e.target.value)}} value={quantitySize}  />
                      </div>
                      
                      <div className="input-field">
                          <label>Market volatility</label>
                          <select value={volatility} onChange={(e)=>{SetVolatilty(e.target.value)}}>
                              <option disabled selected></option>
                              <option value={.8}>High</option>
                              <option vlaue={.4}>Medium</option>
                              <option value={.2}>Low</option>
                          </select>
                      </div>

                      
                  </div>
              </div>

              <div className="details ID">
                  <span className="title"></span>

                  <div className="fields">
                      <div className="input-field">
                          <label>Trigger price</label>
                          <input type="decimal" />
                      </div>

                      <div className="input-field">
                          <label>Stop price</label>
                          <input type="decimal" />
                      </div>

                      <div className="input-field">
                          <label>Position</label>
                          <input type="long" onChange={(e)=>{
                            setPosition(e.target.value)}} value={position} />
                      </div>

                      <div className="input-field">
                          <label>Limit price</label>
                          <input type="decimal" />
                      </div>
                      <div className="input-field">
                          <label>Capital</label>
                          <input type="number" value={capital} onChange={(e)=>{
                            setCapital(e.target.value);
                          }} />
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
                      </div> 
                  </div>

                  <button type='submit' className="nextBtn">
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
    }

    {
        showGraph && <div>
        <Line data={data} />
      </div>
    }
    </div>
  );
}

export default App;
