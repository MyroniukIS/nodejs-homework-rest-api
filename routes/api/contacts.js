const express = require("express");

const {authenticate} = require("../../middlewares");

const router = express.Router();

const {
  addContact,
  changeContactById,
  deleteContact,
  findContactById,
  getAllContacts,
  updateStatusContact,
} = require("../../controllers");

router.get("/", getAllContacts);

router.get("/:contactId", findContactById);

router.post("/", authenticate, addContact);

router.put("/:contactId", changeContactById);

router.delete("/:contactId", deleteContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
