const express = require("express");
const roomController = require("./../controllers/roomController");
const authController = require("./../controllers/authController");
const reviewRouter = require("./../routes/reviewRoutes");

const router = express.Router();

// router.param("no", roomController.CheckNO);

router.use("/:roomId/reviews", reviewRouter);

router
  .route("/top-5-rooms")
  .get(roomController.topRooms, roomController.getAllRooms);

router
  .route("/monthly-plan/:month")
  .get(
    authController.protect,
    authController.restrictTo("admin", "manager", "supervisor"),
    roomController.getMonthlyPlan
  );

router
  .route("/")
  .get(roomController.getAllRooms)
  .post(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    roomController.createRoom
  );
router
  .route("/:id")
  .get(roomController.getRoom)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    roomController.updateRoom
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    roomController.deleteRoom
  );

module.exports = router;
