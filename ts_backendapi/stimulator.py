import pandas as pd
import random

def pricestimulator(close: float, volatility: float, startdate: str):
    
    #get date range of business days.
    dt = pd.date_range(start=startdate, periods=260, freq='B')

    #empty datafram
    df=pd.DataFrame(columns=['ClosePrice'],index=dt)

    for d in df.index:
        df.loc[d,['ClosePrice']]=close
        low=close-(close*volatility)
        high=close+(close*volatility)
        close=round(random.uniform(low,high),2)
    return df
