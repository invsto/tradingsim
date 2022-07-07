import React from 'react';
import NumberFormat from 'react-number-format';
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
  const[alertPositionSize,setalertPositionSize]=useState(false);
  const[submitValidate,setSubmitValidate]=useState(false);

  const getRndInteger = (min, max) => {
    //console.log(Math.floor(Math.random() * (max - min + 1) ) + min);
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  const ShowGraph = () => {
    
    let range = [];
    let mp=parseInt(marketPrice.replace(/,/g, ''));
    let a = mp - mp*volatility;
    let b = mp + mp*volatility;
    console.log(a+" "+b);
    for(let i=0; i<12; i++){
      range.push(getRndInteger(a,b));
    }
    setShowGraph(true);
    setGraphRan(range);
    //console.log(range);
  }
  const validateSubmit=() => {
    
    if(positionSize>100){
      setSubmitValidate(false);
      setalertPositionSize(true);
      setTimeout(() => {
        setalertPositionSize(false);
      },3000)
    }
    else{
      setSubmitValidate(true);
    }
  }
  const formatToCurrency = amount => {
    amount = parseInt(amount);
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };
  useEffect(()=>{
    if(quantitySize>0){
      let cap=parseInt(capital.replace(/,/g, ''));
      let mp=parseInt(marketPrice.replace(/,/g, ''));
      let pos = quantitySize*mp;
      setPosition(pos);
      let posSize = position/cap;
      setPositionSize(posSize);
    }
  }, [quantitySize]);

  useEffect(()=>{
    if(positionSize>0){
      let mp=parseInt(marketPrice.replace(/,/g, ''));
      let cap=parseInt(capital.replace(/,/g, ''));
      let pos = positionSize*cap;
      setPosition(pos);
      let quant = position/mp;
      setQuantitySize(quant.toFixed(2));
    }
  }, [positionSize])

  useEffect(()=>{
    if(position>0){
      let mp=parseInt(marketPrice.replace(/,/g, ''));
      let cap=parseInt(capital.replace(/,/g, ''));
      let posSize = position/cap;
      setPositionSize(posSize);
      let quant = position/mp;
      setQuantitySize(quant.toFixed(2));
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
                   
          <form action="/" onSubmit={(e)=>{
            e.preventDefault();
            validateSubmit();
            if(submitValidate){
            ShowGraph();
            }
          }}>
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
                          <NumberFormat thousandSeparator={true}  id="market-price" 
                          value={marketPrice}
                          onChange={(e)=>{
                            setMarketPrice(e.target.value);
                            //console.log()
                          }} />
                      </div>

                      <div className="input-field">
                          <label>Capital</label>
                          <NumberFormat thousandSeparator={true} onChange={(e)=>{
                            setCapital(e.target.value);
                          }} />
                      </div> 

                      <div className="input-field">
                          <label>Position size</label>
                          <input type="number" id="position-size" onChange={(e)=>{setPositionSize(e.target.value)}} value={positionSize} />
                          
                          {
                            alertPositionSize &&
                            alert("Enter a valid position size")
                          }
                      </div>

                      <div className="input-field">
                          <label>Qty-size</label>
                          <input type="decimal" id="quantity-size" onChange={(e)=>{setQuantitySize(e.target.value)}} value={quantitySize}  />
                      </div>
                      
                      <div className="input-field">
                          <label>Position</label>
                          <input type="long" onChange={(e)=>{
                            setPosition(e.target.value)}} value={position} />
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
                          <select value={volatility} onChange={(e)=>{SetVolatilty(e.target.value)}}>
                              <option selected></option>
                              <option value={.8}>High</option>
                              <option value={.4}>Medium</option>
                              <option value={.2}>Low</option>
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
                          {
                            showGraph && <div>
                            <Line data={data} width={"1000px"} height={"500px"}/>
                      </div>
                          } 
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
    

      <div className='shade'>
          </div>  
    </div>
  );
}

export default App;
