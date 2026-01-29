const express = require("express");

require("./db/mongo"); // connect mongo
const app = express();

app.use(express.json());

// routes
app.use("/users", require("./routes/users"));
app.use("/activity", require("./routes/activity"));
app.use("/stats", require("./routes/stats"));
app.use("/login", require("./routes/login"));

app.use(express.static("public"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
