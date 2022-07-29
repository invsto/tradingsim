import pandas as pd
import numpy as np

class Criteria:

    def  __init__(self, dataf):
        '''Args:
        dataf (dataframe): dataframe with indicators
        '''
        self.dataf=dataf

    def mvcrossover(self, aMv='MA 50', bMv='MA 200' ,type='buy'):
        '''Args:
        aMv (str): Moving average column name., to be above.
        bMv (str): Moving average column name , to be below.

        type (str): Buy type or sell type

        return: 
        dataf with position column.
        '''

        #buy type position
        if type.lower()=='buy':
            con=self.dataf[aMv]>self.dataf[bMv]
            self.dataf['BuyPosition']=np.where(con,1,0)
        
        #sell type position
        elif type.lower()=='sell':
            con=self.dataf[aMv]>self.dataf[bMv]
            self.dataf['SellPosition']=np.where(con,1,0)

        return self.dataf
    
    def closeandmoveaverage(self, Mv='MA 21', type='buy', averagepos='below'):
        '''Args:
        Mv (str): Moving aveage column name.
        type (str): Buy type or sell type
        averagepos (str): position of moving average should be (above/below)

        return:
        dataf with position column
        '''

        if type.lower()=='buy':
            if averagepos.lower()=='above':
                con=self.dataf[Mv]>self.dataf['ClosePrice']
                self.dataf['BuyPosition']=np.where(con,1,0)
            elif averagepos.lower()=='below':
                con=self.dataf[Mv]<self.dataf['ClosePrice']
                self.dataf['BuyPosition']=np.where(con,1,0)

        elif type.lower=='sell':
            if averagepos.lower()=='above':
                con=self.dataf[Mv]>self.dataf['ClosePrice']
                self.dataf['SellPosition']=np.where(con,1,0)
            elif averagepos.lower()=='below':
                con=self.dataf[Mv]<self.dataf['ClosePrice']
                self.dataf['SellPosition']=np.where(con,1,0) 

        return self.dataf
    
    def rsirange(self, rsipos='above', rsiscore=40, type='buy'):
        '''Args:
        rsiscore (flaot): score to be compare
        type (str): Buy type or sell type
        rsipos (str): position of rsi should be (above/below)

        return:
        dataf with position column
        '''

        if type.lower()=='buy':
            if rsipos.lower()=='above':
                con=self.dataf['rsi']>rsiscore
                self.dataf['BuyPosition']=np.where(con,1,0)
            elif rsipos.lower()=='below':
                con=self.dataf['rsi']<rsiscore
                self.dataf['BuyPosition']=np.where(con,1,0)

        elif type.lower=='sell':
            if rsipos.lower()=='above':
                con=self.dataf['rsi']>rsiscore
                self.dataf['SellPosition']=np.where(con,1,0)
            elif rsipos.lower()=='below':
                con=self.dataf['rsi']<rsiscore
                self.dataf['SellPosition']=np.where(con,1,0) 

        return self.dataf

    
    def bbrange(self, band='Blowerband', bandpos='above', type='buy'):
        '''Args:
        band (str): band name (Blowerband/Bhighband)
        bandpos (str): position of band should be (above/below)
        type (str): Buy type or sell type

        return:
        dataf with position column
        '''
        if type.lower()=='buy':
            if bandpos.lower()=='above':
                con=self.dataf[band]>self.dataf['ClosePrice']
                self.dataf['BuyPosition']=np.where(con,1,0)
            elif bandpos.lower()=='below':
                con=self.dataf[band]<self.dataf['ClosePrice']
                self.dataf['BuyPosition']=np.where(con,1,0)

        elif type.lower=='sell':
            if bandpos.lower()=='above':
                con=self.dataf[band]>self.dataf['ClosePrice']
                self.dataf['SellPosition']=np.where(con,1,0)
            elif bandpos.lower()=='below':
                con=self.dataf[band]<self.dataf['ClosePrice']
                self.dataf['SellPosition']=np.where(con,1,0) 

        return self.dataf