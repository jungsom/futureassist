import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

// const authentication = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
//         const publicKey = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');

//         console.log(privateKey);
//         console.log(publicKey);
//         const token = jwt.sign({ email: "test@user.com" }, privateKey, {
//             algorithm: "RS256",
//             expiresIn: "7d"
//         });

//         console.log(privateKey);
//         console.log(token);

//         res.status(200).json({ token });
//     } catch (err) {
//         next(err);
//     }
// };

// export { authentication };
