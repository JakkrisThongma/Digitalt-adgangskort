const express = require("express");
const path = require("path");

const fs = require("fs");
const https = require("https");

const app = express();

if (process.env.NODE_ENV !== "production") {
  console.error("NODE_ENV was not set to 'production'");
  console.log("exit with statuscode '1'");

  process.exit(1);
}

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert")
    },
    app
  )
  .listen(44321, function() {
    console.log(
      "Admin UI is listening on port 44321! Go to https://localhost:44321/"
    );
  });

app.use(express.static("dist"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

/*
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`http://localhost:${port}`));
*/
