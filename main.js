let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./repoPage");
request(url,cb);
function cb(err,response,html){
  if(err){
      console.log(err);
   }
   else if(response.statusCode == 404){
      console.log("Page Not Found");
   }
   else{
      //    console.log(html);
      getTopicLink(html);
   }
}

function getTopicLink(html){
    let $ = cheerio.load(html);
   let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
   // console.log(linkElemArr);
   for(let i=0; i<linkElemArr.length; i++){
       let href = $(linkElemArr[i]).attr("href");
       //console.log(href);
       //pop -> `Removes the last element from an array and returns it. If the array is empty,
       //   undefined is returned and the array is not modified.`
      let topic = href.split("/").pop();
      console.log(topic);
     let fullLink = "https://github.com/"+href;
      //console.log(fullLink);
     getReposPageHtml(fullLink,topic);
   } 
}