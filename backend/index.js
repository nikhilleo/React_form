
require("./Database/database");
require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const user_routes = require("./routes/user_routes");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));


app.use(user_routes);


app.listen(port, () => {
    console.log(`Server started http://localhost:${port}`);
});