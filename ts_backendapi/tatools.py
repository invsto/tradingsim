from ta.trend import sma_indicator, adx
from ta.momentum import rsi
from ta.volatility import BollingerBands
from ta.volume import volume_weighted_average_price


class Indicators:
    def __init__(self, dataf):
        '''Args:
            dataf (DataFrame): with name of stock and value
        '''

        self.dataf = dataf

    def addmovingav(self, periods: list = [9, 20, 21, 50, 200]):
        '''Args:
            periods(list): list the window (or periods)

            return:
                python dataframe with a moving average column
        '''

        try:
            for period in periods:
                # adding column
                columnname = f'MA {period}'
                self.dataf[columnname] = sma_indicator(
                    self.dataf['ClosePrice'], window=period)

            print('\nMoving averages added to dataframe')

        except Exception as e:
            print(f'\n{e} while adding moving average ')

        return self.dataf

    def addrsi(self, period=14):
        '''Args:
            periods(int): the window (or periods)

            return:
                python dataframe with a rsi column
        '''

        try:
            # adding column rsi
            self.dataf['rsi'] = rsi(self.dataf['ClosePrice'], window=period)

            print('\nRSI added to dataframe')

        except Exception as e:
            print(f'\n{e} while adding rsi')

        return self.dataf

    def addbb(self, period=14):
        '''Args:
            periods(int):window (or periods)

            return:
                python dataframe with a Bhighband, Blowerband column
        '''

        try:
            # create bbobj
            bbobj = BollingerBands(self.dataf['ClosePrice'], window=period)

            self.dataf['Bhighband'] = bbobj.bollinger_hband()
            self.dataf['Blowerband'] = bbobj.bollinger_lband()

            print('\nBollinger Bands')

        except Exception as e:
            print(f'\n{e} while adding Bollinger Bands')

        return self.dataf
