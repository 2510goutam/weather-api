import express from "express";
import axios from "axios";

const app=express();
const port=3000;
const yourAPIKey="65125c6b5cb62fe7a7ebf3e7f1b87e4c";

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/weather", async(req,res)=>{
    const city = req.query.city;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${yourAPIKey}`;
    let weather;
    let error = null;
    try {
        const response = await axios.get(API_URL);
        weather = response.data;
    } catch (error) {
        weather = null;
        error = "Error, Please try again";
    }
    res.render("index.ejs", { weather, error });
});

app.listen(port,()=>{
    console.log(`server is running at port ${port}.`);
})