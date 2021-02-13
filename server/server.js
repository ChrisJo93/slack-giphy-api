const express = require('express');
const app = express();
//express and app variables bare minimum to start server 1 of3

// Middle Ware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes Include
const apiRoutes = require('./api.routes');

//Routes
app.use('/api/giphy', apiRoutes);

// Server Static Files
app.use(express.static('build'));

const PORT = process.env.PORT || 5000;
//port location needed to start server 2 of 3

app.listen(PORT, () => {
  //actual server ignition 3 of 3
  console.log(`On port: ${PORT}`);
});
