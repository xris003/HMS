const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

// console.log(process.env);
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connection);
    console.log("DB connected succesfully");
  });

const roomSchema = new mongoose.Schema({
  no: {
    type: String,
    required: [true, "A room must have a number"],
    unique: true,
  },
  types: {
    type: String,
    required: [true, "Must have a type"],
  },
  price: {
    type: Number,
    required: [true, "A room must have a price"],
  },
  rating: {
    type: Number,
    default: 1.0,
  },
});

const Room = mongoose.model("Room", roomSchema);

const testRoom = new Room({
  no: 1,
  types: "Executive Single",
  price: 15000,
});

testRoom
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR 🎇", err);
  });

//START SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
