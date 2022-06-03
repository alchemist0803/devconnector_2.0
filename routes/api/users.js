const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Cities = require('../../models/Cities');

router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, userType, city, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      user = await User.findOne({ name });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      let foundCity = await Cities.findOne({ name: city });
      if (foundCity === null) {
        const cities = [
          {
            name: "Jerusalem",
            position: [{
              x: 31.7833,
              y: 35.2167,
            }]
          },
          {
            name: "Tel Aviv-Yafo",
            position: [{
              x: 32.0800,
              y: 34.7800,
            }]
          },
          {
            name: "Haifa",
            position: [{
              x: 32.8000,
              y: 34.9833,
            }]
          },
          {
            name: "Rishon LeẔiyyon",
            position: [{
              x: 31.9500,
              y: 34.8000,
            }]
          },
          {
            name: "Petaẖ Tiqwa",
            position: [{
              x: 32.0833,
              y: 34.8833,
            }]
          },
          {
            name: "Ashdod",
            position: [{
              x: 31.7978,
              y: 34.6503,
            }]
          },
          {
            name: "Netanya",
            position: [{
              x: 32.3328,
              y: 34.8600,
            }]
          },
          {
            name: "Beersheba",
            position: [{
              x: 31.2589,
              y: 34.7978,
            }]
          },
          {
            name: "Bené Beraq",
            position: [{
              x: 32.0807,
              y: 34.8338,
            }]
          },
          {
            name: "Holon",
            position: [{
              x: 32.0167,
              y: 34.7667,
            }]
          },
          {
            name: "Ramat Gan",
            position: [{
              x: 32.0700,
              y: 34.8235,
            }]
          },
          {
            name: "Ashqelon",
            position: [{
              x: 31.6658,
              y: 34.5664,
            }]
          },
          {
            name: "Reẖovot",
            position: [{
              x: 31.8914,
              y: 34.8078,
            }]
          },
          {
            name: "Bat Yam",
            position: [{
              x: 32.0231,
              y: 34.7503,
            }]
          },
          {
            name: "Bet Shemesh",
            position: [{
              x: 31.7514,
              y: 34.9886,
            }]
          },
          {
            name: "Kefar Sava",
            position: [{
              x: 32.1858,
              y: 34.9077,
            }]
          },
          {
            name: "Herẕliyya",
            position: [{
              x: 32.1556,
              y: 34.8422,
            }]
          },
          {
            name: "Hadera",
            position: [{
              x: 32.4500,
              y: 34.9167,
            }]
          },
          {
            name: "Modi‘in Makkabbim Re‘ut",
            position: [{
              x: 31.9339,
              y: 34.9856,
            }]
          },
          {
            name: "Nazareth",
            position: [{
              x: 32.7021,
              y: 35.2978,
            }]
          },
          {
            name: "Lod",
            position: [{
              x: 31.9500,
              y: 34.9000,
            }]
          },
          {
            name: "Ramla",
            position: [{
              x: 31.9318,
              y: 34.8736,
            }]
          },
          {
            name: "Ra‘ananna",
            position: [{
              x: 32.1833,
              y: 34.8667,
            }]
          },
          {
            name: "Rahat",
            position: [{
              x: 31.3925,
              y: 34.7544,
            }]
          },
          {
            name: "Nahariyya",
            position: [{
              x: 33.0036,
              y: 35.0925,
            }]
          },
          {
            name: "Givatayim",
            position: [{
              x: 32.0697,
              y: 34.8117,
            }]
          },
          {
            name: "Hod HaSharon",
            position: [{
              x: 32.1500,
              y: 34.8833,
            }]
          },
          {
            name: "Rosh Ha‘Ayin",
            position: [{
              x: 32.0833,
              y: 34.9500,
            }]
          },
          {
            name: "Qiryat Ata",
            position: [{
              x: 32.8000,
              y: 35.1000,
            }]
          },
          {
            name: "Umm el Faḥm",
            position: [{
              x: 32.5158,
              y: 35.1525,
            }]
          },
          {
            name: "Qiryat Gat",
            position: [{
              x: 31.6061,
              y: 34.7717,
            }]
          },
          {
            name: "Eilat",
            position: [{
              x: 29.5500,
              y: 34.9500,
            }]
          },
          {
            name: "Nes Ẕiyyona",
            position: [{
              x: 31.9333,
              y: 34.8000,
            }]
          },
          {
            name: "‘Akko",
            position: [{
              x: 32.9261,
              y: 35.0839,
            }]
          },
          {
            name: "El‘ad",
            position: [{
              x: 32.0523,
              y: 34.9512,
            }]
          },
          {
            name: "Ramat HaSharon",
            position: [{
              x: 32.1461,
              y: 34.8394,
            }]
          },
          {
            name: "Karmiel",
            position: [{
              x: 32.9000,
              y: 35.2833,
            }]
          },
          {
            name: "Afula",
            position: [{
              x: 32.6078,
              y: 35.2897,
            }]
          },
          {
            name: "Tiberias",
            position: [{
              x: 32.7897,
              y: 35.5247,
            }]
          },
          {
            name: "Eṭ Ṭaiyiba",
            position: [{
              x: 32.2667,
              y: 35.0000,
            }]
          },
          {
            name: "Qiryat Yam",
            position: [{
              x: 32.8331,
              y: 35.0664,
            }]
          },
          {
            name: "Qiryat Moẕqin",
            position: [{
              x: 32.8381,
              y: 35.0794,
            }]
          },
          {
            name: "Qiryat Bialik",
            position: [{
              x: 32.8331,
              y: 35.0664,
            }]
          },
          {
            name: "Qiryat Ono",
            position: [{
              x: 32.0636,
              y: 34.8553,
            }]
          },
          {
            name: "Or Yehuda",
            position: [{
              x: 32.0333,
              y: 34.8500,
            }]
          },
          {
            name: "Ma‘alot Tarshīḥā",
            position: [{
              x: 33.0167,
              y: 35.2708,
            }]
          },
          {
            name: "Ẕefat",
            position: [{
              x: 32.9658,
              y: 35.4983,
            }]
          },
          {
            name: "Dimona",
            position: [{
              x: 31.0700,
              y: 35.0300,
            }]
          },
          {
            name: "Tamra",
            position: [{
              x: 32.8511,
              y: 35.2071,
            }]
          },
          {
            name: "Netivot",
            position: [{
              x: 31.4167,
              y: 34.5833,
            }]
          },
          {
            name: "Sakhnīn",
            position: [{
              x: 32.8667,
              y: 35.3000,
            }]
          },
          {
            name: "Yehud",
            position: [{
              x: 32.0333,
              y: 34.8833,
            }]
          },
          {
            name: "Al Buţayḩah",
            position: [{
              x: 32.9087,
              y: 35.6320,
            }]
          },
          {
            name: "Al Khushnīyah",
            position: [{
              x: 32.9994,
              y: 35.8108,
            }]
          },
          {
            name: "Fīq",
            position: [{
              x: 32.7793,
              y: 35.7003,
            }]
          }
        ];
        Cities.insertMany(cities)
          .then(() => console.log("Cities Added"))
          .catch((err) => {
            return res
              .status(400)
              .json("Error: " + err)
          })
        city = await Cities.findOne({ city });
      }
      const position = foundCity.position;
      user = new User({
        name,
        userType,
        email,
        city,
        position,
        password,
      });
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
