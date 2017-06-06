const express = require("express");
let app = module.exports = express();
let auth = require("../auth")();

let usersRouting = require("./users");
let servicesRouting = require("./services");
let goodsRouting = require("./goods");
let analyzesRouting = require("./analyzes");
let personsRouting = require("./persons");
let specialtiesRouting = require("./specialties");
let specialistsRouting = require("./specialists");
let patientsRouting = require("./patients");
let uploadsRouting = require("./uploads");
let paymentsRouting = require("./payments");

app.use("/users", usersRouting);
app.use("/services", servicesRouting);
app.use("/goods", goodsRouting);
app.use("/analyzes", analyzesRouting);
app.use("/persons", personsRouting);
app.use("/specialties", specialtiesRouting);
app.use("/specialists", specialistsRouting);
app.use("/patients", patientsRouting);
app.use("/uploads", uploadsRouting);
app.use("/payments", paymentsRouting);