const express=require('express');
const hbs =require('hbs');
const fs=require('fs');
var request = require('request');
var moment=require('moment');


const port =process.env.PORT || 3000;

var app=express();

hbs.registerPartials(__dirname +'/views/partials')

app.set('view engine','hbs');


app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

app.get('/',(req,res)=>{
//res.send('<h1>Hello Express</h1>');
res.render('home.hbs',{
	currentYear: new Date().getFullYear()
});
});



app.param('name', function(req, res, next, name) {

    // save name to the request
    req.name = name;

    next();
});



app.get('/:name',(req,res)=>{
	

if (moment(req.name,'MM-DD-YYYY').isValid()) {
	res.send({	

		unix:new Date(req.name).getTime() / 1000,
		natural:req.name
	
});
} else {
	res.send({unix:null,
	natural:null
});
	
};
});


app.listen(port,()=>{
	console.log(`server is up on port ${port}`);
});