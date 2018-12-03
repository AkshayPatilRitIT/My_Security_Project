const Post=require('../database/modules/post')

module.exports=async (request,response)=>{
    const posts=await Post.find({})
      console.log(request.session)
        response.render('index',{
            posts
        })
    };
    
    