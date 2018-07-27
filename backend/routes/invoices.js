const express = require("express");
const checkAuth = require("../Middleware/check-auth-admin");
const InvoiceController = require('../controllers/invoices');


const router = express.Router();



router.post("", checkAuth, InvoiceController.createInvoice);

router.put("/:id", checkAuth, InvoiceController.addRequest);

router.put("/request/:id", checkAuth, InvoiceController.editRequest);

router.put("/driver/update/:id", checkAuth, InvoiceController.driverUpdate);

router.get("/:id", InvoiceController.getInvoices);

router.get("/route/:route", checkAuth, InvoiceController.getRouteInvoices);

router.delete("/:invId/:reqId", checkAuth, InvoiceController.deleteInvoice);

router.delete("/destroy/:accountId", checkAuth, InvoiceController.deleteAllInvoicesForCustomer);

module.exports = router;
