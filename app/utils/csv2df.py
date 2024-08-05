import pandas as pd

def csv2df(file_path):
    df = pd.read_csv(file_path)
    return df