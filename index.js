//Import express and axios
import express from "express";
import axios from "axios";
//Create an express app and set the port number.
const app = express();
const port = 3000;
//Use the public folder for static files.
app.use(express.static("public"));
//When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
    try {
        //Use axios to get a random cocktail and pass it to index.ejs to display the drink,
        //instruction, cocktail image, glass, ingredients and measures.
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const cocktailImage = response.data.drinks[0].strDrinkThumb;
        //Rendering the template with the data
        res.render("index.ejs", {cocktail: response.data.drinks[0].strInstructions, title: response.data.drinks[0].strDrink, 
        image: cocktailImage, drinks: response.data.drinks, glass: response.data.drinks[0].strGlass});
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

//Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})