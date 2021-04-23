const os=require("os");
const path=require("path");
const fs=require("fs");
const express=require("express");
const app=express();




fs.readdir("../",{withFileTypes:true},function(err,files) {
    let finalHtml='<div style="text-align:center"><h1>Local files<h1></div>';
    if(err) throw err;
        //res.send(files);
        files.forEach(fileName=>{
        if(fileName.isDirectory()){
            var imgpath="public/images/folder.png";
        }
        else if(fileName.isFile()){
            var pathname=path.extname(fileName.name);
            if(pathname=='.txt'){
            imgpath="public/images/file.png";
            }
           else if(pathname=='.png' || pathname=='.jpg' || pathname=='.jpeg'){
                imgpath="public/images/image.png";
            }
           else if(pathname=='.pdf'){
                imgpath="public/images/pdf.png";
                }
              else if(pathname=='.js'){
                    imgpath="public/images/javascript.png";
                    }
                 else if(pathname=='.docx'){
                        imgpath="public/images/word.png";
                        }
                      else if(pathname=='.xlsx'){
                            imgpath="public/images/xls.png";
                            }
        }
        if(imgpath){
              fs.readFile(imgpath,function(err,data){
              if (err) throw err;
              finalHtml+=`<div style="width:200px;height:70px;border:1px solid black;display:inline-block;padding:0.5rem;text-align:center;margin:10px">
              <div style="padding:10px 10px 10px 10px">
              <img style="height:30px" src="data:image/jpeg;base64,${Buffer.from(data).toString('base64')}"/>
                <div style="font-size:12px">${fileName.name}</div>
                </div>
                 </div>`
              })
                  
        }
        
        
        app.get("/",function(req,res){
            res.send(finalHtml)
               })


    })
})

app.listen(8000);