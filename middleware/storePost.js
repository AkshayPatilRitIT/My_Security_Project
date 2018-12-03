module.exports=(request,response,next)=>{
    if(!request.files.image){
        return response.redirect('/posts/new')
       }
      next()
     }


     /*
      <li class="nav-item">
              <a class="nav-link" href="/auth/register">Register</a>
            </li>

             <li class="nav-item">
              <a class="nav-link" href="/auth/login">Login</a>
            </li>
     */