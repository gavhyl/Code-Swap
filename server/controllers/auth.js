var User = require("../models/user");
var jwt = require("jwt-simple");
var config = require("../config");

function createUserToken(user) {
	var timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id }, config.secret);
}

exports.signin = function(req, res, next) {
	// User has already had their email and pw authed, we just need to give them a token
	res.send({ token: createUserToken(req.user) });
};

exports.signup = function(req, res, next) {
	//1
	var email = req.body.email;
	var password = req.body.password;

	if( !email || !password) {
		return res.status(418).send({error: "Email and password must be provided"});
	}
	//2
	User.findOne({ email: email }, function(err, existingUser) {
		if(err) {
			return next(err);
		//return search error
		}
		if(existingUser) {
			// return res.status(418).send(err); 
			return res.status(418).send("Account with that email has already been created");
			// handles existing users
		}
	});

	// 3
	var user = new User({
		email: email,
		password: password
	});
	// to save the record to the DB
	user.save(function(err) {
		if(err) { 
			return next(err); 
		}
		// respond to req indicating the user was created
		res.json({ 
			token: createUserToken(user)
		});
	});

	//test
	// res.send("authorization is happening, yo");
	// console.log(req.body);
};

