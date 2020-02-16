var express = require("express");
var path = require("path");
var fs = require("fs");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./public/assets/js/index")(app);





// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("./public/assets/js/index".express.);





app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});