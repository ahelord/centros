var express = require('express');
var router = express.Router();

//añadidos por el usuario
var config = require("../config.json");
var massive = require("massive");

// -- añadidos por el usuario
/*modulos propios*/
var user = require("../models/user.js");
/*modulos propios*/

//conexción postgres
var connectionString = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.db;
var massiveInstance = massive.connectSync({connectionString : connectionString})
var db;
db = massiveInstance;
// -- conexión postgres


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* CRUD usuarios */
router.get('/users', function(req, res, next) {
  db.user.find(function(err,user){
    res.json(user)
  });

});
router.post('/user', function(req, res, next) {
  var newUser = {
    identification_number: req.body.identificationNumber,
    id_identification_type: req.body.idIdentificationType.id_identification_type,
    id_profile: 0,
    "password":req.body.password,
    birth_date:req.body.birthDate,
    "email": req.body.email,
    first_name:req.body.firstName,
    last_name:req.body.lastName
  };
  db.users.save(newUser,function(err,user){
    if(err){res.send(err)}
    res.json(user);
  });
});
/* -- CRUD usuarios */
router.post("/studio",function(req,res,next){
  var newStudio = {
      id_staff: req.body.idUser,
      id_identification_type: req.body.idIdentificationType.id_identification_type,
      identification_number: req.body.identificationNumber,
      cod_verif: req.body.codVerif,
      description:req.body.description,
      tradename:req.body.tradeName,
      email: req.body.email,
      id_country: req.body.country.id_country,
      phone: req.body.phone,
      mobile_phone: req.body.mobilePhone,
      start_date_activities: req.body.startDateActivities,
      employees_number: req.body.employeesNumber,
      address: req.body.address,
      web: req.body.web.url,
      facebook: req.body.web.facebook,
      twitter: req.body.web.twitter,
      instagram: req.body.web.instagram,
      enable: 1
  }
  db.studio.save(newStudio,function(err,studio){
    if(err){res.send(err)}
    res.json(studio);
  });
});
/* CRUD studio */

/* -- CRUD studio */
/* tipos de identificacion registro */
router.get("/identificationtypes",function(req,res,next){
  db.identification_type.find(function(err,identificationTypes){
    if(err){res.send(err);}
    res.json(identificationTypes);
  });
});

/* tipos de identificacion registro */
/* inicia centros */
router.get("/studios",function(req,res,next){
  db.studio.find(function(err,studios){
    if(err){res.send(err);}
    res.json(studios);
  });
});

/* termina centros */
/* inicia ciudades */
router.get("/countries",function(req,res,next){
  db.country.find(function(err,countries){
    if(err){res.send(err);}
    res.json(countries);
  });
});

/* termina ciudades */


/* */
router.post("/login",function(req,res,next){
  var user = req.body;
  db.users.findOne({email: user.email,password:user.password}, function(err,user){
    if(err){res.send(err)}
    res.json(user);
  });
});
module.exports = router;