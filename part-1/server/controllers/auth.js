const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        let existing = bcrypt.compareSync(password, users[i].pinHash)

        if (users[i].username === username && existing) {
          let usersToReturn = {...users[i]}
          delete usersToReturn.pinHash
          console.log(users[i])
          console.log(usersToReturn)
          res.status(200).send(usersToReturn)
          return
        }
      }
      res.status(400).send("User not found.")
    },


    register: (req, res) => {
      const{username, email, firstName, lastName, password, password2} = req.body
      let salt = bcrypt.genSaltSync(5)
      let pinHash = bcrypt.hashSync(password, salt)
        const newUser = {
          username,
          email, 
          firstName,
          lastName,
          pinHash
        }
        console.log('Registering User')
        users.push(newUser)
        let newUserToReturn = {...newUser}
        delete newUserToReturn.pinHash
        console.log(newUserToReturn)
        res.status(200).send(newUserToReturn)
  }
}