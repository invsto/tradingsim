import numpy as np
import quantstats as qs


def reportmateric(dataf):
    '''Args:
    dataf(dataframe): datafram with BuyPosition and SellPosition column


    return: matrics
    '''

    buysellcheck = (
        'BuyPosition' in dataf.columns and 'SellPosition' in dataf.columns)
    buycheck = ('BuyPosition' in dataf.columns)
    sellcheck = ('SellPosition' in dataf.columns)

    if buysellcheck:

        con = [(dataf['BuyPosition']+dataf['SellPosition'] == 2),
               (dataf['BuyPosition']+dataf['SellPosition'] == 1) & (dataf['BuyPosition'] == 1)]
        dataf['Position'] = np.select(con, [0, 1])

        print(dataf[dataf['Position'] == 1])
        dataf['nextclose'] = dataf['ClosePrice'].shift(-1)
        dataf['Profit'] = [dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']
                           if dataf.loc[i, 'Position'] == 1 else 0 for i in dataf.index]

        return qs.reports.metrics(dataf['Profit'], mode='full', display=False)

    elif buysellcheck == False and buycheck:
        dataf['nextclose'] = dataf['ClosePrice'].shift(-1)
        dataf['Profit'] = [dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']
                           if dataf.loc[i, 'BuyPosition'] == 1 else 0 for i in dataf.index]

        return qs.reports.metrics(dataf['Profit'], mode='full', display=False)

    elif buysellcheck == False and sellcheck:
        dataf['nextclose'] = dataf['ClosePrice'].shift(-1)
        dataf['Profit'] = [dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']
                           if dataf.loc[i, 'BuyPosition'] == 1 else 0 for i in dataf.index]

        return qs.reports.metrics(dataf['Profit'], mode='full', display=False)

    else:
        print("Don't have position column in the given dataframe.")
