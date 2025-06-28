const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

const routes = require("./routes");
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})