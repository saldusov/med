const express = require("express");
let app = module.exports = express();
const passport = require("passport");
let checkAccess = require("./users/middleware").checkAccess;

let usersRouting = require("./users");
let servicesRouting = require("./services");
let analyzesRouting = require("./analyzes");
let personsRouting = require("./persons");
let specialtiesRouting = require("./specialties");
let doctorsRouting = require("./doctors");
let patientsRouting = require("./patients");
let uploadsRouting = require("./uploads");
let paymentsRouting = require("./payments");

app.use("/users", checkAccess('users'), usersRouting);
app.use("/services", checkAccess('services'), servicesRouting);
app.use("/analyzes", checkAccess('analyzes'), analyzesRouting);
app.use("/persons", checkAccess('persons'), personsRouting);
app.use("/specialties", checkAccess('specialties'), specialtiesRouting);
app.use("/doctors", checkAccess('doctors'), doctorsRouting);
app.use("/patients", checkAccess('patients'), patientsRouting);
app.use("/uploads", checkAccess('uploads'), uploadsRouting);
app.use("/payments", checkAccess('payments'), paymentsRouting);