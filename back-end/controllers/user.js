const User = require("../models/User")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      })
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Utilisateur/ mot de passe incorrect !" })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: "Utilisateur/ mot de passe incorrect !" })
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              "cO09nKHaKjhgfvI9WNAZYWk8Dr!Xsp5CukYDgHWW1-OL9!yeMoi-7T/4/ugKPflj?sAQmk/8OAndQlKNclGqE2Is65N8M=AtVB4wjeCfVll7CANvr5G9snFHl!W7AeTxkjyIELHIJzzu1VWvnBBHi56N7rA9!PDnjLv!OUy7TlKPW=ExMvXyycvF=Lzy0pSMn7Ieq/NWvSsJ!6=V-qu6JcrxjGORUY9ANQnBgrEacGbd10XrzeV6h6cpp=6jc1N/",
              {
                expiresIn: "24h",
              }
            ),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
