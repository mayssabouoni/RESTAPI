const express = require("express");
const DBconnect = require("./configg/connectDB");
const User = require("./models/user");
require("dotenv").config({ path: "./configg/.env" });
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

DBconnect();


// GET :  RETURN ALL USERS 
app.get("/get_users", async (req, res) => {
    try {
      let users = await User.find();
      res.send(users);
    } catch (error) {
      res.send(error);
    }
  });

// POST :  ADD A NEW USER TO THE DATABASE
app.post("/add_users", async (req, res) => {
    const { name, lastName, email, phone } = req.body;
    const newUser = new User({ name, email, lastName, phone });
    try {
      let user = await newUser.save();
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  });

  //PUT : EDIT A USER BY ID 
  app.put("/edit_user/:userID", async (req, res) => {
    try {
      let editedUser = await User.findByIdAndUpdate(
        req.params.userID,
        { ...req.body },
        { new: true }
      );
      res.send(editedUser);
    } catch (error) {
      res.send(error);
    }
  });

  //DELETE : REMOVE A USER BY ID 
  app.delete("/delete_user/:userID", async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.userID);
      res.send({ message: "user deleted successfully" });
    } catch (error) {
      res.send(error);
    }
  });






  app.listen(PORT, () => console.log(`server is running on port  ${PORT}... `));