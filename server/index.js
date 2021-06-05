const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/image', require('./routes/image'));
app.use('/api/follow', require('./routes/follow'));
app.use("/api/videocomment", require("./routes/videocomment"));
app.use("/api/imagecomment", require("./routes/imagecomment"));
app.use("/api/heart", require("./routes/heart"));
app.use("/api/bigthree", require("./routes/bigthree"));
app.use("/api/freeboard", require("./routes/freeboard"));
app.use("/api/tournament", require("./routes/tournament"));
app.use("/api/foodapi", require("./routes/foodapi"));
app.use("/api/steroidinfo", require("./routes/steroidinfo"));
app.use("/api/eatlog", require("./routes/eatlog"));


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});