const express = require("express");
let app = module.exports = express();
let auth = require("../auth")();
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

app.use("/users", usersRouting);
app.use("/services", auth.authenticate(), checkAccess('services'), servicesRouting);
app.use("/analyzes", auth.authenticate(), checkAccess('analyzes'), analyzesRouting);
app.use("/persons", auth.authenticate(), checkAccess('persons'), personsRouting);
app.use("/specialties", auth.authenticate(), checkAccess('specialties'), specialtiesRouting);
app.use("/doctors", auth.authenticate(), checkAccess('doctors'), doctorsRouting);
app.use("/patients", auth.authenticate(), checkAccess('patients'), patientsRouting);
app.use("/uploads", auth.authenticate(), checkAccess('uploads'), uploadsRouting);
app.use("/payments", auth.authenticate(), checkAccess('payments'), paymentsRouting);