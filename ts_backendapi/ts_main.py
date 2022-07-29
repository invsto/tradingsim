from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime
from stimulator import pricestimulator
from tatools import Indicators
from criteria import Criteria
from report import reportmateric

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def dataprocessing(close: float, volatility: float,startdate: str):
    
    dataf=pricestimulator(close, volatility, startdate)

    inobj=Indicators(dataf)
    dataf=inobj.addmovingav()
    
    criteriaobj=Criteria(dataf)
    dataf=criteriaobj.mvcrossover()
    print(len(dataf[dataf['BuyPosition']==1]))

    metrics=reportmateric(dataf)

    return metrics

@app.get('/price')
def price(close: float=10000, volatility: float=0.03,startdate: str=datetime.datetime.today()):
    return pricestimulator(close, volatility, startdate)

@app.get('/report')
def report(close: float=10000, volatility: float=0.03,startdate: str=datetime.datetime.today()):
    return dataprocessing(close, volatility, startdate)
    
# @app.post('/')
# async def result(close: float=10000, volatility: float=0.03,startdate: str=datetime.datetime.today()):
#     return pricestimulator(close, volatility, startdate)
