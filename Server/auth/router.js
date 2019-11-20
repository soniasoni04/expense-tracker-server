const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const User = require('../user/model')
const bcrypt = require('bcrypt');

const router = new Router()

router.post('/login', (req, res, next) => {

  console.log('can we see the req of body :', req.body)
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ message: "Please give me some credentials, stranger" });
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        res.status(400).send({
          message : 'User with this email does not exist'
        })
      }
      else if (bcrypt.compareSync(req.body.password, user.password)) {

        // 3. if the password is correct, return a JWT with the userId of the user (user.id)
        res.send({
          jwt: toJWT({ id: user.id })
        })
      }

      else {
        res.status(400).send({
          message : 'Password was incorrect'
        })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({
        message: 'Something went wrong'
      })
    })
})

module.exports = router
