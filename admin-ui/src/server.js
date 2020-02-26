const express = require("express");
const path = require("path");

const app = express();

if (process.env.NODE_ENV !== "production") {
  console.error("NODE_ENV was not set to 'production'");
  console.log("exit with statuscode '1'");

  process.exit(1);
}

app.use(express.static("dist"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`http://localhost:${port}`));
