// *********************************************************************************
// all-users-api-routes.js. This file provides routes for signing in, logging in, and 
// getting leaderboard information. (Info pertaining to all the users). 
// *********************************************************************************

/*
Todo:
	- make a logout route
		- removes cookie
		- redirect to landing page
*/

// Dependencies
// =============================================================
// Requiring our models
const DB = require("../models");

// Routes
// =============================================================
module.exports = function(app) 
{
	//Registering a new user
	app.post("/api/user/signup", function(req, res)
	{
		//check sign up input
		if (req.body.signUpName !== "" && req.body.signUpPassword === req.body.signUpPasswordConfirm)
		{
			//check if username is already taken
			DB.allUsers.findOne(
			{
				where: {username: req.body.signUpName}
			}).then(function(result)
			{
				//if username is available
				if (result === null)
				{
					//create user
					DB.allUsers.create(
					{
						username: req.body.signUpName,
						password: req.body.signUpPassword
					}).then(function(newUser)
					{
						console.log("Created a new user");
						console.log(newUser.dataValues);
						//set a cookie containing that user's id#
						res.cookie("id", newUser.dataValues.id);
						//redirect to user homepage via front end functions
						res.send(
						{
							success: true,
							redirectTo: "/user-homepage"
						});
					});
				}
				else //username is already taken
				{
					console.log("Username already taken.");
					//send error
					res.json({error: "Username already taken"});
				}
			});
		}
		else //sign up info invalid 
		{
			if (req.body.signUpName === "")
			{
				console.log("username can't be blank");
				res.json({error: "Username can't be blank"});
			}
			else
			{
				console.log("passwords didn't match.");
				res.json({error: "Passwords entered did not match"});
			}
		}
	});

	//User signing in 
	app.post("/api/user/login", function(req, res)
	{
		// Check if username exists in database 
		DB.allUsers.findOne(
		{
			where: 
			{
				username: req.body.signInName,
			}
		}).then(function(user)
		{
			//if username doesn't exist in database
			if (user === null)
			{
				console.log("user does not exist in database.");
				console.log(user);
				//send error message and redirect back
				res.json({error: "User does not exist."});
			}
			else //username exists in database
			{
				//if passwords match
				if (req.body.signInPassword == user.dataValues.password)
				{
					//sign user in
					console.log("passwords match. Welcome back.");
					console.log(user.dataValues);
					//set a cookie of the users id
					res.cookie("id", user.dataValues.id);
					//redirect to user homepage via front end functions
					res.send(
					{
						success: true,
						redirectTo: "/user-homepage"
					});
				}
				else //passwords didnt' match
				{
					//indicate passwords didn't match
					console.log("passwords don't match");
					res.json({error: "Incorrect password"});
				}
			}
		});
	});

	//Pulling leaderboard information
	app.get("/api/leaderboard", function(req, res)
	{
		DB.sequelize.query("SELECT " + 
		"username AS `player`," + 
		"(au.money_earned - au.money_spent) AS `profit` " +
		"FROM allUsers au " +
		"ORDER BY `Profit` DESC " + 
		"LIMIT 25;").then(function(results)
		{
			//Rank must be added to results manually
			//sequelize doesn't allow the SET operation in its queries.
			for (var index = 0; index < results[0].length; index++)
				results[0][index].rank = index + 1;

			//respond with an array of player objects in ranked order
			res.json(results[0]);
		});
	});

	//Log out a currently signed in user
	app.put("/api/user/logout", function(req, res)
	{
		// //When we swtich to token, set that users token to null
		// DB.allUsers.update(
		// {
		// 	token: null
		// }, 
		// {
		// 	where:
		// 	{
		// 		token: req.cookies.token
		// 	}
		// }).then(function(signedOutUser)
		// {
		// 	//wipe the cookie
		// 	res.clearCookie("token");

		// 	//redirect to landing page via front end functions
		// 	res.send(
		// 	{
		// 		success: true,
		// 		redirectTo: "/"	
		// 	});
		// });


		//wipe the cookie
		res.clearCookie("id");
		console.log("cookie cleared");
		//redirect to landing page via front end functions
		res.send(
		{
			success: true,
			redirectTo: "/"
		});
	});

	//Get only one user's stats from 'allUsers'
	app.get("/api/user/:id", function(req, res)
	{
		DB.allUsers.findOne({where: {id: req.params.id}})
		.then(function(data)
		{
			var userStats = {
				"id": data.id,
				"username": data.username,
				"balance": data.balance,
				"money_spent": data.money_spent,
				"money_earned": data.money_earned
			}

			res.json(userStats);
		});		
	});
};













