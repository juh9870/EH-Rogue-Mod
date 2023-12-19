const fs = require ("fs");
const path = require('path');

const walkSync = function(dir, filelist) {
            var path = path || require('path');
            var fs = fs || require('fs'),
                files = fs.readdirSync(dir);
            filelist = filelist || [];
            files.forEach(function(file) {
                if (fs.statSync(path.join(dir, file)).isDirectory()) {
                    filelist = walkSync(path.join(dir, file), filelist);
                }
                else {
                    filelist.push(path.join(dir, file));
                }
            });
            return filelist;
        };


let files = walkSync("./");
files.forEach(e=>{
    if (!e.toLowerCase().endsWith(".json")) return;
    let json = JSON.parse(fs.readFileSync(path.join(e)));

    if(json.Price){
    	json.Price=json.Price/2;
    	if(Math.floor(json.Price)!=json.Price){
    		if(json.Price%2<1)json.Price-=0.5;
    		else json.Price+=0.5;
    	}
    	if(json.Price===1)json.Price=0;
    }

    fs.writeFileSync(e,JSON.stringify(json,null,"\t"));
});