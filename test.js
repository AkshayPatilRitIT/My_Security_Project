var mongoose=require('mongoose')

const Post=require('./database/modules/post')


//mongoose.connect('mongodb://localhost/nodeBlog-testDB')
/*
Post.find({
    title:'my Second DB'
},(error,post)=>{

    console.log(error,post)
})
*/

Post.findByIdAndUpdate("5b600660f093371104e91d48",{
    title:'Second Document',
    decription:'Second id Updated',
    content:'Content also deleted'
},(error,post)=>{

    console.log(error,post)
})

/*
Post.create({
    title:'my Second DB',
    decription:'Second DB is Creating',
    content:'No Second content'
},(error,post)=>{

    console.log(error,post)
})*/