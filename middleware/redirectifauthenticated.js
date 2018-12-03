const User=require('../database/modules/User')

module.exports=(request,response,next)=>{
if(request.session.userId)
{
    return response.redirect('/')
}
next()
}