const mongoose = require('mongoose');
const dbConnect = async ()=>{
   try{

       await  mongoose.connect(process.env.MONGO_URI)
         console.log("DB connected")
    }
    catch(error){
        console.log(error)
}}

dbConnect()

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
})

const AdminSchema = new mongoose.Schema({
    username:String,
    password:String,
    
})

const CourseSchema = new mongoose.Schema({
    title:String,
    description:String,
    imageLink:String,
    price:Number

})

const User = mongoose.model('User',UserSchema);
const Admin = mongoose.model('Admin',AdminSchema);
const Course = mongoose.model('Course',CourseSchema);

module.exports={
    User,
    Admin,
    Course
}