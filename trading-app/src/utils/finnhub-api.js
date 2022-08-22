// require('dotenv').config()
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cbtqh1qad3i651t1f21g" // add API_KEY here
const finnhubClient = new finnhub.DefaultApi()

// testing connection
// finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, (error, data, response) => {
//     console.log(data)
// });

const getPrice = async (stock) => {
        const currentTime = await Math.round(new Date().getTime() / 1000);
        finnhubClient.stockCandles(stock, "W" , currentTime - 1000000, currentTime, (error, data, response) => {
            console.log(data.c[1]) 
            // console.log(currentTime) 
    });
}

const getPrices = (stocks) => {
    stocks.map( (stock, i) => {
        setTimeout( () => {
            getPrice(stock)
          }, 1000/29 * i) // limit : 30 req/sec
        }
    )
}

getPrices(["AAPL", "NFLX", "GOOGL"])

// getPrice("AAPL")