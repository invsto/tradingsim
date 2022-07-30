from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime

from numpy import average
from stimulator import pricestimulator
from tatools import Indicators
from criteria import Criteria
from report import reportmateric

app = FastAPI()

origins = [
    "http://localhost.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def dataprocessing(close: float, volatility: float, startdate: str, capital: float, buycriteria: list, sellcriteria: list, slcriteria: list = None, tpcriteria: list = None):

    dataf = pricestimulator(close, volatility, startdate)

    inobj = Indicators(dataf)
    dataf = inobj.addmovingav()
    dataf = inobj.addrsi()

    dataf['Capital'] = capital
    criteriaobj = Criteria(dataf)

    criteriadic = {'MA': criteriaobj.mvcrossover,
                   'CPMA': criteriaobj.closeandmoveaverage, 'rsi': criteriaobj.rsirange}
    for criteria in buycriteria:
        dataf = criteriadic[criteria]()
        print(dataf[dataf['BuyPosition'] == 1])

    criteriaobj = Criteria(dataf)
    for criteria in sellcriteria:
        dataf = criteriadic[criteria](type='sell', averagepos='above')
        print(dataf[dataf['SellPosition'] == 1])

    metrics = reportmateric(dataf)

    return metrics


@app.get('/price')
def price(close: float = 10000, volatility: float = 0.03, startdate: str = datetime.datetime.today()):
    return pricestimulator(close, volatility, startdate)


@app.get('/report')
def report(close: float = 10000, volatility: float = 0.03, startdate: str = datetime.datetime.today(), capital=100000, buycriteria=['MA'], sellcriteria=['CPMA']):
    return dataprocessing(close, volatility, startdate, capital=capital, buycriteria=buycriteria, sellcriteria=sellcriteria)
