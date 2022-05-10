const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;  //indicates which server its being run on

//by using scraper api (that allows for automated retrieval of data from websites) the user is tasked to enter his api to the url link
const generateScraperUrl = (apikey) => `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to Nnamdis Personal API.'); //when user enters the url, diplay message
});

// GET Product Details
app.get('/products/:productId', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;  // we are getting the API key from here

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`); //getting a response from scraper API about a specific product

        res.json(JSON.parse(response));
    } catch(error){
        res.json(error);
    }
});

// Get Product Reveiws
app.get('/products/:productId/reviews', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`); //getting a response from scraper API about a specific product

        res.json(JSON.parse(response));
    } catch(error){
        res.json(error);
    }
});


//GET PRODUCT OFFERS
app.get('/products/:productId/offers', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`); //getting a response from scraper API about a specific product

        res.json(JSON.parse(response));
    } catch(error){
        res.json(error);
    }
});


// GET SEARCH RESULTS
app.get('/search/:searchQuery', async(req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=/${searchQuery}`); //getting a response from scraper API about a specific product

        res.json(JSON.parse(response));
    } catch(error){
        res.json(error);
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));