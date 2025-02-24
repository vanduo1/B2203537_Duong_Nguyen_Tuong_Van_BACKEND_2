const express = require("express");
const cors = require("cors");
const app = express();
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error"); //** */

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

// handle 404 response
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

//** */
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
