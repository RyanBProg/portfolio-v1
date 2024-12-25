const express = require("express");
const port = process.env.PORT || 4040;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// all routes go here, above home!

// for home route
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log(`first server is running on port: ${port}`);
});
