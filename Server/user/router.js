const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/users", (req, res, next) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10) 
  })
    .then(() => res
                .status(200)
                .send({message : 'user is created'}))
    .catch(next);
});


router.get("/users",  async (req, res, next) => {
      try {
        const user = await User.findAll()
        res
        .status(200)
        .send(user)
    }
    catch (error) {
        next(error)
    }
});

module.exports = router;
