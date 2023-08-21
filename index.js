const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());


app.use("/api", routes);


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });


app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});