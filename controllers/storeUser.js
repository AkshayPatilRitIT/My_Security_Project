const User=require('../database/modules/User')

module.exports=(request,response)=>
{
User.create(request.body,(error,user)=>{
    if(error)
    {
      //console.log(Object.keys(error.errors).map(key=>error.errors[key].message))

      const registrationError=Object.keys(error.errors).map(key=>error.errors[key].message)

      request.flash('registrationError',registrationError) 
      request.flash('data',request.body)
      return response.redirect('/auth/register')
    }
    response.redirect('/')
})
}