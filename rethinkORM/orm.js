var thinky = require('thinky')();
var type = thinky.type;
thinky.db="Employee";
var Post = thinky.createModel("POST", {
    id: String,
    title: String,
    content: String,
    idAuthor: String

});
 
var Author = thinky.createModel("Author", {
  id: type.string(),     // a normal string
  name: type.string().min(2),  // a string of at least two characters
  email: type.string().email()  // a string that is a valid email
});

Post.belongsTo(Author,"author","idAuthor","id");
var post = new Post({
  title: "Hello World!",
  content: "This is an example."
});

var author = new Author({
  name: "Michel",
  email: "orphee@gmail.com"
});

post.author=author;
post.saveAll().then(function(result) {
    console.log(result);  

      
    });

/*Post.filter({id:'9c3ccf6c-1170-4a5f-a73f-eb4e77215d77'}).getJoin().run().then(function(result){
    console.log(result);
});*/
/*Post.getJoin().run().then(function(result){
    console.log(result);
});*/
// Post.run().then(function(result){
//     console.log(result);
// });
Post.update({title:'techify'}).run().then(function(result){
    console.log(result);
})