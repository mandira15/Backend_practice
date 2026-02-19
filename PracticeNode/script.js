const fs = require("fs");

// fs.writeFile("hey.txt", "my name is Mandira ", function(err){
//     if(err){
//         console.error(err);
//     }
//     else{
//         console.log("done");
//     }
// })
// fs.appendFile("hey.txt", "I am an engineer", function(err){
//     if(err){
//         console.error(err);
//     }
//     else{
//         console.log("done");
//     }
// })

fs.unlink("hey.txt",function(err){   //delete a file
    if(err) console.error(err);
    else console.log("removed");
})