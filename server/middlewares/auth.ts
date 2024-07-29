// import dotenv from 'dotenv';
// import { OAuth2Client, TokenPayload } from "google-auth-library";
// import { Jwt } from "jsonwebtoken";
// import { Request, Response } from 'express';
// import datasource from "../config/db";

// dotenv.config();

// const client = new OAuth2Client();

// export async function verify() {
// 		const ticket = await client.verifyIdToken({
// 			idToken: 'token',
//             audience: process.env.CLIENT_ID
// 		});
// 		const payload = ticket.getPayload();
// 		const userid = payload['sub'];

//     }
//     verify().catch(console.error);

// 		connection.execute('SELECT `TOKEN` FROM `innoboost_user` WHERE `ID`= ?', [userid], (err, results) => {
// 			if (err) throw err;
// 			let token = '';
// 			if (results.length > 0) {
// 				console.log('DB에 있는 유저', results);
// 				token = updateToken(payload);
// 			} else {
// 				console.log('DB에 없는 유저');
// 				//새로 유저를 만들면 jwt 토큰값을 받아온다.
// 				token = insertUserIntoDB(payload);
// 			}
// 			res.send({
// 				token
// 			});
// 		});
// 	}
// 	verify().then(() => {}).catch(console.error);
// });

// const updateToken = (payload) => {
// 	const {
// 		sub,
// 		name,
// 		email
// 	} = payload;
// 	console.log(`id: ${sub}\n name:${name}\n, email:${email}`);
// 	const token = jwt.sign({
// 			id: sub,
// 			name,
// 			email
// 		},
// 		JWT_SECRET
// 	);

// 	connection.execute('UPDATE `innoboost_user` SET `TOKEN`= ? WHERE (`ID`= ?)', [token, sub], (err, results) => {
// 		console.log(results)
// 	});
// 	return token;
// }

// const insertUserIntoDB = (payload) => {
// 	const {
// 		sub,
// 		name,
// 		email
// 	} = payload;
// 	console.log(`id: ${sub}\n name:${name}\n, email:${email}`);
// 	const token = jwt.sign({
// 			id: sub,
// 			name,
// 			email
// 		},
// 		JWT_SECRET
// 	);

// 	connection.execute(
// 		'INSERT INTO `innoboost_user` (ID, EMAIL, NAME, TOKEN) VALUES (?, ?, ?, ?)',
// 		[sub, email, name, token],
// 		(err, results, fields) => {
// 			if (err) {
// 				console.log('fail');
// 				throw err;
// 			}

// 		}
// 	);
// 	return token;
// };
