const User = require('../redis/models/UserModel.js')
// const  asyncHandler= require('express-async-handler')
// const generateToken = require('../utils/generateToken.js')

// @desc        Authenticate user
// @route       POST /api/users/login
// @access      Public
const authUser = (async (req, res) => {
    const { email, password } = req.body
})

// @desc        Get user profile
// @route       GET /api/users/profile
// @access      Private
const getUserProfile = (async (req, res) => {
})

// @desc        Update profile
// @route       GET /api/users/profile
// @access      Private
const updateUserProfile = (async (req, res) => {
})

// @desc        Register user
// @route       POST /api/users
// @access      Public
const registerUser = (async (req, res) => {
    const { name, email, password } = req.body
})


module.exports = { authUser, getUserProfile, registerUser, updateUserProfile }