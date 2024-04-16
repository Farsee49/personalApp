require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env["PORT"] 
const cors = require('cors');
const apiRouter = require('./api'); // references the index.js in that folder by default
const client = require('./db/client');
const bodyParser = require("body-parser");
const chalk = require("chalk");
app.use(cors());

// Setup your Middleware and API Router here
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('dev'));                                                           
app.use(express.json());
app.use('/api', apiRouter);


app.listen(PORT, () => {
    console.log(
      chalk.blueBright("Server is listening on PORT:"),
      chalk.yellow(PORT),
      chalk.blueBright("SPACE PORTAL OPEN!!!")
    )
  });
  try {
    client.connect();
    console.log(chalk.greenBright("DATABASE ENGAGED!"));
    } catch (error) {
    console.error(chalk.redBright("DATABASE START FAILURE!!!!!!!!!!"));
    }
    
    app.use((req, res, next) => {
        console.log(chalk.cyanBright("<____Body Logger START____>"));
        console.log(req.body);
        console.log(chalk.cyanBright("<_____Body Logger END_____>"));
        next();
      });

module.exports = {app, client};