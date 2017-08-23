var fs = require('fs'),
appDB = require('../../config/dbConnect.js');
module.exports = {
    // the function to handle login page and after submit the page 
     index : function(req,res){	
			message = '';
			if(req.method == "POST"){
				var post  = req.body;
				var title= post.title;

				if (!req.files || typeof req.files.img === 'undefined'){
					message = "No files were uploaded.";
					res.render('index',{message: message});
				}
				else {
				var file = req.files.img;
				var img_name=Math.random().toString(36).substring(7)+file.name;

					if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

						file.mv('public/uploads/'+img_name, function(err) {
							if (err)

							return res.status(500).send(err);
							var sql = "INSERT INTO `user`(`title`,`img`) VALUES ('" + title + "','" + img_name + "')";
							var query = appDB.getConn(sql, function(err, result) {								
								res.redirect('listing');
							});
					});
					} else {
						message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
						res.render('index',{message: message});
					}
				}
			} else {
			res.render('index');
			}			
		},
     listing : function(req, res){
			var sql = "select id,title,img from user order by id desc";
			var query = appDB.getConn(sql, function(err, result) {									
					res.render('listing', {list:result});					
			});
		}
};
