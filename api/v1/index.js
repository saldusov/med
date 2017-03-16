const express = require("express");
let app = module.exports = express();

let usersRouting = require("./users");
let servicesRouting = require("./services");
let analyzesRouting = require("./analyzes");
let personsRouting = require("./persons");
let specialtiesRouting = require("./specialties");
let doctorsRouting = require("./doctors");
let patientsRouting = require("./patients");
let uploadsRouting = require("./uploads");

app.use("/users", usersRouting);
app.use("/services", servicesRouting);
app.use("/analyzes", analyzesRouting);
app.use("/persons", personsRouting);
app.use("/specialties", specialtiesRouting);
app.use("/doctors", doctorsRouting);
app.use("/patients", patientsRouting);
app.use("/uploads", uploadsRouting);