
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: [true,'plz provide username']
    },
    email:{
        type:String,
        required:true,
        unique: [true,'plz provide Email']
    },
    password:{
        type: String,
        required:  [true,'plz provide password']
    }
})
userSchema.pre('save', function(next){
    const user=this;
    bcrypt.hash(user.password,10,function(error,encrypted){
        user.password=encrypted
        next()
    })
})
module.exports=mongoose.model('User',userSchema)