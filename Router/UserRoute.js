const router = require("express").Router();
const mongoose = require("mongoose");
const userSchema = require("../Schema/Userschema");
const User = mongoose.model("user", userSchema);
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
router.post("/signup", async (req, res) => {
  // for send email
  const sendVerifiEmail = async (name, email) => {
    try {
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 25,
        secure: false,
        auth: {
          user: "dulal.dpi.387364@gmail.com",
          pass: "cbgwcoglqvmqldgw",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      var mailOption = {
        from: "dulal.dpi.387364@gmail.com",
        to: email,
        subject: "Borkah-shop",
        html:
          '<p> "Hi"  ' +
          name +
          " " +
          "please" +
          "    <a href='http://localhost:3001/' > Click </a>  to verify  </p>",
      };

      transporter.sendMail(mailOption, function (error, info) {
        if (error) {
          console.log(error.message);
        } else {
          console.log("email has send", info.response);
        }
      });
    } catch (error) {
      console.log("error from last block");
    }
  };
  const hasedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const existUser = await User.findOne({ email: req.body.email });
    const user = new User({
      user_name: req.body.user_name,
      email: req.body.email,
      password: hasedPassword,
    });

    if (existUser) {
      res.send({ success: false });
    } else {
      const userInfo = await user.save();
      sendVerifiEmail(req.body.user_name, req.body.email);

      res.send("Signup scucessfully , please verify your email");
    }
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
        console.log(token);

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
