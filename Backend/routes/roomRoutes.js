const express = require("express");
const roomController = require("./../controllers/roomController");

const router = express.Router();

router.param("no", roomController.CheckNO);

router
  .route("/")
  .get(roomController.getAllRooms)
  .post(roomController.CheckBody, roomController.createRoom);
router
  .route("/:no")
  .get(roomController.getRoom)
  .patch(roomController.updateRoom)
  .delete(roomController.deleteRoom);

module.exports = router;
