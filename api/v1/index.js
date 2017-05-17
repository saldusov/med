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
app.use("/services", passport.authenticate("jwt"), checkAccess('services'), servicesRouting);
app.use("/analyzes", passport.authenticate("jwt"), checkAccess('analyzes'), analyzesRouting);
app.use("/persons", passport.authenticate("jwt"), checkAccess('persons'), personsRouting);
app.use("/specialties", passport.authenticate("jwt"), checkAccess('specialties'), specialtiesRouting);
app.use("/doctors", passport.authenticate("jwt"), checkAccess('doctors'), doctorsRouting);
app.use("/patients", passport.authenticate("jwt"), checkAccess('patients'), patientsRouting);
app.use("/uploads", uploadsRouting);
app.use("/payments", passport.authenticate("jwt"), checkAccess('payments'), paymentsRouting);