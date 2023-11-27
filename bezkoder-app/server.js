require("dotenv").config();
const express = require("express");
const exphbs = require('express-handlebars');
const cors = require("cors");

const app = express();

app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
      getShortComment(comment) {
          if (comment.length < 64) {
              return comment;
          }

          return comment.substring(0, 61) + '...';
      }
  }
}));

app.set('view engine', 'hbs');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  // res.json({ message: "Welcome to bezkoder application." });
  res.render('home', {
    post: { comment: 'Hello World!' }  
  });
  
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
