module.exports=(request,response)=>{

    console.log(request.session.registrationError)
    response.render('register',{
        errors:request.flash('registrationError'),
        data:request.flash('data')[0]
    })
    
}