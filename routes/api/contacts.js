const express = require("express");

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

router.post("/", addContact);

router.put("/:contactId", changeContactById);

router.delete("/:contactId", deleteContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
