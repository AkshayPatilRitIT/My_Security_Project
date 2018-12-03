
//required files
    var path=require('path')
    var expressEdge=require('express-edge')
    var express=require('express')
    const edge=require('edge.js')
    var bodyParser=require('body-parser')
    var fileUpload=require('express-fileupload')
    var mongoose=require('mongoose')
    const Post=require('./database/modules/post')
    const expressSession=require('express-session')
    const connectMongo=require('connect-mongo')
    const connectFlash=require('connect-flash')
    const mongoStore=connectMongo(expressSession)  

// declared controller
    const createPostController=require('./controllers/createPost')
    const getPostController=require('./controllers/getPost') 
    const storePostController=require('./controllers/storePost')
    const homePageController=require('./controllers/homePage')
    const createUserController=require('./controllers/createUser')
    const storeUserController=require('./controllers/storeUser')
    const loginController=require('./controllers/login')
    const loginUserController=require('./controllers/loginUser')
    const logoutController=require('./controllers/logout')
   

//App user declration   
    const app=express()
   
    mongoose.connect('mongodb://localhost/nodeFormData')
     
    app.use(fileUpload())
    app.use(connectFlash())
    app.use(express.static('public'))
    app.use(expressEdge)
    
    app.set('views',`${__dirname}/views`)
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    app.use(expressSession({
        secret:'secret',
        store:new mongoStore({
            mongooseConnection:mongoose.connection
        })
    }))
// mongoDB connection
   


// custom middleware    
     const validatingCustomMiddleware=require('./middleware/storePost')
    app.use('/posts/store',validatingCustomMiddleware) 
    const auth=require('./middleware/auth')

    const redirectifauthenticated=require('./middleware/redirectifauthenticated')
    app.use('*',(request,response,next)=>
    {
            edge.global('auth',request.session.userId)
            next()
    })

// calling pages using controller
    app.get('/',homePageController)
    app.get('/posts/new',auth,createPostController)
    app.get('/auth/login',redirectifauthenticated,loginController)
    app.post('/posts/store',auth,storePostController)
    app.get('/post/:id', getPostController);
    app.get('/auth/logout',logoutController )
    app.get('/auth/register',redirectifauthenticated, createUserController)
    app.post('/users/login',redirectifauthenticated,loginUserController)
    app.post('/users/register',redirectifauthenticated,storeUserController)
    app.get('/about',(request,response)=> {
        response.render('about')
        })
    app.get('/contact',(request,response)=> {
        response.render('contact')
        })

//assigning port
    app.listen(2200,()=>{
        console.log('express start loading')
    })
    
    /*const http=require('http')
    
    const fs=require('fs')
    
    const aboutPage=fs.readFileSync('about.htm')
    const generalPage=fs.readFileSync('general.htm')
    const contactPage=fs.readFileSync('contact.htm')
    const loginPage=fs.readFileSync('Login.htm')
    
    const server=http.createServer((request,response)=>{
       // console.log(request.url)
        if(request.url === '/about')
        {
           return response.end(aboutPage)
        }else if(request.url==='/contact')
        {
           return response.end(contactPage)
        }else if(request.url==='/general')
        {
           return response.end(generalPage)
        }else if(request.url==='/')
        {
           return response.end(loginPage)
        }
        else{
            response.writeHead(404)
            response.end('the page was not found')
        }
       
    })   
    
    server.listen(5600)*/