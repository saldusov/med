const express = require("express");
let app = module.exports = express();

let usersRouting = require("./users");
let servicesRouting = require("./services");
let personsRouting = require("./persons");
let specialtiesRouting = require("./specialties");
let doctorsRouting = require("./doctors");

app.use("/users", usersRouting);
app.use("/services", servicesRouting);
app.use("/persons", personsRouting);
app.use("/specialties", specialtiesRouting);
app.use("/doctors", doctorsRouting);