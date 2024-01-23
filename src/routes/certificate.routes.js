const express = require("express");
const router = express.Router();
const {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
} = require("../controller/certificate.controller");
const isAuthenticated = require("../middleware/authentication.middelware");

module.exports = () => {
  router.post("/createCertificate", isAuthenticated, createCertificate);
  router.get("/getCertificate", isAuthenticated, getAllCertificates);
  router.get("/getCertificate/:id", isAuthenticated, getCertificateById);
  router.patch("/updateCertificate/:id", isAuthenticated, updateCertificate);
  router.delete("/deleteCertificate/:id", isAuthenticated, deleteCertificate);
  //   router.post("/login",login)
  return router;
};
