const router = require("express").Router();
const mongoose = require("mongoose");
const userSchema = require("../Schema/Userschema");
const User = mongoose.model("user", userSchema);
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
router.post("/signup", async (req, res) => {
  const hasedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = new User({
      email: req.body.email,
      password: hasedPassword,
    });
    user.save();
    res.send("success");
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.find({ email: req.body.email });

  try {
    if (user) {
      const isVaildPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isVaildPassword) {
        const token = jwt.sign(
          {
            email: user[0]?.email,
            userId: user[0]?._id,
          },
          "dulal",
          {
            expiresIn: "1h",
          }
        );

        res.send(token);
      } else {
        res.json({
          error: "fail",
        });
      }
    } else {
      res.json({
        error: "fail2",
      });
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
