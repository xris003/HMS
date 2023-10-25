const express = require("express");
const roomController = require("./../controllers/roomController");
const authController = require("./../controllers/authController");

const router = express.Router();

// router.param("no", roomController.CheckNO);

router
  .route("/top-5-rooms")
  .get(roomController.topRooms, roomController.getAllRooms);

router.route("/monthly-plan/:month").get(roomController.getMonthlyPlan);

router
  .route("/")
  .get(authController.protect, roomController.getAllRooms)
  .post(roomController.createRoom);
router
  .route("/:no")
  .get(roomController.getRoom)
  .patch(roomController.updateRoom)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    roomController.deleteRoom
  );

module.exports = router;
