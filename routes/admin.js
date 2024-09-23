const express = require('express');
const adminMiddleware = require('../middleware/admin');
const { Admin, Course, User } = require('../db');
const router = express.Router();
const {z} = require('zod')
const jwt = require('jsonwebtoken')
const {jwt_Secret} = require('../config')

router.post('/signup', async (req, res) => {
     const {username, password} = req.body

    await Admin.create({
        username,
        password 
    })
    res.json({
        message: "Admin created successfully"
    })

    // .then(function () {
    //     res.json({
    //         message: "Admin created successfully"
    //     })
    // })
    // .catch(function (){
    //     res.json({
    //         message:"Admin not created"
    //     })
    // })

})
router.post('/signIn',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })
    if(user){
        const token = jwt.sign({username},jwt_Secret)
        res.json({
            token
        })
    }
    res.json({
        message:"Incorrect email and password"
    })

})

router.post('/courses', adminMiddleware, async  (req, res) => {
      const title = req.body.title;
      const description = req.body.description;
      const imageLink = req.body.imageLink;
      const price = req.body.price;

    //   const title = schema.safeParse(courseTitle);   // zod validation
    //   const description  = schema.safeParse(courseDescription);
    //   const imageLink = schema.safeParse(courseImageLink);
    //   const price = schema1.safeParse(coursePrice);

     const newCourse =  await Course.create({
        title,
        description,
        imageLink,
        price
        
      })
       console.log(newCourse)
      res.json({
        message:"Course created successfully",
        courseId:newCourse._id
      })


})


router.get('/courses', adminMiddleware, async (req, res) => {
    const response = await Course.find({})
    res.json({
        courses: response
    })
    console.log(response);

})


module.exports = router;