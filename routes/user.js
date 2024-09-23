const express = require('express');
const userMiddleware = require('../middleware/user');
const { User,Course } = require('../db');
const router = express.Router();

router.post('/signup',  async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
   
    await User.create({
        username,
        password
    });
    res.json({
        message: "User created Successfully"
    })

})

router.get('/courses', async (req, res) => {
    const response = await Course.find({})
    res.json({
        courses: response
    })


})

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.username;
    await User.updateOne({
        username: username
    },
        {
            "$push":{
                purchasedCourses: courseId
            }
        }
    )
    // console.log(response)
    res.json({
        message:"Purchase complete"
    })
})

router.get('/purchasedCourses',userMiddleware, async (req, res) => {
    const user = await User.findOne({
        username: req.headers.username
    })
     const courses = await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
     })

     res.json({
        message:courses
     })

})
module.exports = router;