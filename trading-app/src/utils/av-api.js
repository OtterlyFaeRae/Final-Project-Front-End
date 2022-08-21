
export const getPrice = async (symbol) => {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=A310K92NKKI3VLLD`)
        const data = await response.json()
        return data["Time Series (5min)"][Object.keys(data["Time Series (5min)"])[0]]["1. open"]
    } catch (error) {
        console.log(error);
    }

  }