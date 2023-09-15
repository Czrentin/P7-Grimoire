const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(
      token,
      "cO09nKHaKjhgfvI9WNAZYWk8Dr!Xsp5CukYDgHWW1-OL9!yeMoi-7T/4/ugKPflj?sAQmk/8OAndQlKNclGqE2Is65N8M=AtVB4wjeCfVll7CANvr5G9snFHl!W7AeTxkjyIELHIJzzu1VWvnBBHi56N7rA9!PDnjLv!OUy7TlKPW=ExMvXyycvF=Lzy0pSMn7Ieq/NWvSsJ!6=V-qu6JcrxjGORUY9ANQnBgrEacGbd10XrzeV6h6cpp=6jc1N/"
    )
    const userId = decodedToken.userId
    req.auth = {
      userId: userId,
    }
    next()
  } catch (error) {
    res.status(401).json({ error })
  }
}
