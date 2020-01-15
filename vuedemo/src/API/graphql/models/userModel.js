import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dbConn from '../database'

// object constructor
const User = function(user) {
  this.id = user.id
  this.fullname = user.name
  this.email = user.email
  this.password = user.password
  this.state = user.state
  this.accessToken = user.token
}

User.authentication = (email, password) =>
  new Promise((resolve, reject) => {
    // password hash
    // User.password = bcrypt.hashSync(password, 10)
    try {
      // Check email & password
      User.state = false
      User.email = email
      User.password = password
      User.fullname = 'Carlos Chacon'
      User.id = '00001254-1101-4654-5647-56466645'
      if (email != 'carlos.echc11@gmail.com') {
        User.state = false
      } else if (
        !bcrypt.compareSync(
          password,
          '$2b$10$LoVZ5pXteEjkQY87cg4Tm.Fb3FYoS4TUKgvdry/qJAQ.SWd17SiiO'
        )
      ) {
        User.state = false
      } else {
        User.accessToken = jwt.sign(
          {
            data: {
              id: User.id,
              email: User.email,
              name: User.fullname,
              date: Date.now(),
            },
          },
          process.env.TOKEN_SECRET,
          { expiresIn: process.env.TOKEN_LIMIT }
        )
        User.state = true
      }
      resolve(User)
    } catch (err) {
      console.log(`[FATAL] ${err.message}`)
      reject({ message: err.message, errorCode: 500 })
    }
  })

export default User
