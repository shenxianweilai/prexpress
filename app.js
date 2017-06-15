var express =require('express');
var path = require('path');
//var mongoose = require('mongoose');
//var Dota2 = require('./models/dota2');
var app = express();

//mongoose.connect('mongodb://localhost/prexpress');
app.use(require('body-parser')());

var handlebars =require('express3-handlebars')
          .create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
//app.set('view engine','pug');//设置模板引擎
app.set('views',path.join(__dirname,'views'));//设置模板相对路径

app.set('port',process.env.PORT || 3000);

app.get('/',function(req,res){
	    //res.type('text/plain');
	  /*  Dota2.fetch(function(err,dota2s) {
	    	if (err) {
	    		console.log(err)
	    	}*/
	    	res.render('home'/*,{
	    		tittle:'daot2首页',
	    	    dota2s:dota2s
	    	});
	    }*/)
	    
});

app.get('/login', function(req,res){
	res.render('login',{cstf:'CSRF token goes here'});
});
app.post('/process',function(req,res){
	console.log('Form (from querystring):' + req.query.form);
	console.log('CSRF token (form hidden form field):' + req.body._csrf);
	console.log('Name(from visible form field):' + req.body.name);
	console.log('Email(from visible form field):' + req.body.email);
	res.redirect(303,'/谢谢');
});

var fortunes =[
"影魔",
"火猫",
"tk",
"蓝猫",
"女王",];
app.get('/about',function(req,res){
	   //res.type('text/plain');
	   var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
	   res.render('about', {fortune:randomFortune});
});

function getWeatherData(){
	return{
		locations:[
			{
				name:'南京',
				forecastUrl:'http://www.weather.com.cn/weather/101190101.shtml',
				iconUrl:'http://www.weather.com.cn/weather/101190101.shtml',
				weather:"多云",
				temp:'20°C',
			},
			{
				name:'南京',
				forecastUrl:'http://www.weather.com.cn/weather/101190101.shtml',
				iconUrl:'',
				weather:"多云",
				temp:'20°C',
			},
			{
				name:'南京',
				forecastUrl:'http://www.weather.com.cn/weather/101190101.shtml',
				iconUrl:'',
				weather:"多云",
				temp:'20°C',
			},
		],
	};
}

app.use(function(req,res,next){
	if (!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = getWeatherData();	
	next();
	});
//404
app.use(function(req,res){
         //res.type('text/plain');
         res.status(404);
         res.render('404');
});

//500
app.use(function(req,res){
	   console.error(err.stack);
	   //res.type('text/plain');
	   res.status(500);
	   res.send('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl-c to terminate.');
});