const User = require('../models/User')
const bcrypt = require('bcrypt')

const createUser = async (req, res, next) => {
  try {
    // grab details from the request
    const { firstName, lastName, username, email, password } = req.body
    // hash user password
    const hashedPassword = await bcrypt.hash(password, 10)
    // create user object
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    })
    // save to database
    const createdUser = await newUser.save()
    // return response
    return res.status(201).json({
      status: true,
      data: createdUser,
    })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  createUser,
}
