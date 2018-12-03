const bcrypt=require('bcrypt')
const User=require('../database/modules/User')

module.exports=(request,response)=>
{
    //try to find user 
    const {email , password}=request.body;

    User.findOne({email},(error,user)=>{
        if(user)
        {
            bcrypt.compare(password,user.password,(error,same)=>
            {
                if(same)
                {
                    request.session.userId=user._id
                    response.redirect('/')
                }
                else{
                    response.redirect('/auth/login')
                }
            })
        }
        else{
            return response.redirect('/auth/login')
        }
    })
   
}