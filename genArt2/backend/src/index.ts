import express from 'express';
import type { Application } from 'express';
// import { requireAuth, type ClerkMiddlewareOptions, type RequireAuthProp, type LooseAuthProp } from '@clerk/clerk-sdk-node';
import { PrismaClient } from '@prisma/client'; // Import the User type from '@prisma/client'

// import "dotenv/config";

// import { ClerkExpressWithAuth, type EmailAddress } from '@clerk/clerk-sdk-node';

// import optionalUser from './middleware/optionalUser';

import roomRoutes from './routes/roomRoute'

import cors from "cors";
import bodyParser from 'body-parser';

const app: Application = express();

// declare global {
//     namespace Express {
//         interface Request extends LooseAuthProp { }
//     }
// }

const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(express.json());
// allow urlencoded data to be submitted using middleware
app.use(express.urlencoded({ extended: true }))


// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5176',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));


// Use Room Routes
app.use('/gallery', roomRoutes);  // Adjust path as necessary

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// clerk modifies the request by adding req.auth
// this takes the token and communicates with clerk to get user information
// which gets assigned to req.auth

// app.use(ClerkExpressWithAuth())

//this is the clerk middleware we wrote for auth

// app.use(optionalUser)

// const exampleMiddleware: RequestHandler = (req, res, next) => {
//     // modify request
//     req.user = {
//         id: "1"
//     }
//     console.log(req.user)
//     next()
// }
//on the /artfeed endpoint, create GET to pull in prisma art data



// // Clerk webhook to handle user creation
// app.post('/clerk-webhook', async (req, res) => {
//     const { type, data } = req.body;
//     console.log('Webhook received:', req.body);

//     if (type === 'user.created') {
//         const { id: clerkId, email_addresses, first_name, last_name, profile_image_url } = data;
//         const email = email_addresses[0]?.email_address;
//         const name = `${first_name} ${last_name}`;
//         const avatarUrl = profile_image_url;

//         if (!email) {
//             console.log('Email not provided in the webhook data');
//             return res.status(400).json({ error: 'Email not provided' });
//         }

//         try {
//             console.log('Creating user in the database...');
//             const user = await prisma.user.create({
//                 data: {
//                     clerkId,
//                     email,
//                     name,
//                     avatarUrl,
//                 },
//             });
//             console.log('User created:', user);

//             return res.status(200).json({ message: 'User created successfully' });
//         } catch (error) {
//             console.error('Error creating user:', error);
//             return res.status(500).json({ error: 'Failed to create user' });
//         }
//     }

//     console.log('Unhandled event type:', type);
//     res.status(200).json({ error: 'Unhandled event type' });
// });


// here, we will get all the art stored under a particular room/period

//Question: how to route that? Is it up to me or do I have to relate with the 
// // enum in my Prisma schema??

// enum ArtPeriod {
//     HELLENISTIC
//     RENAISSANCE
//     BAROQUE
//     REALISM
//     VANGUARDISM
//   }


// app.get('/rooms/feed', async (req: Request, res: Response) => {
//     try {
//         const data = await prisma.art.findMany();
//         res.json(data);
//     } catch (error: any) {
//         console.error('Error fetching backgrounds:', error.message);
//         res.status(500).json({ error: 'Failed to fetch backgrounds' });
//     }
// });



// Get the last creation per room

// Get the descending most popular arts

// app.get('/shop', async (req: Request, res: Response) => {
//     try {
//         const dataArt = await prisma.art.findMany();
//         const dataWarnsdorff = await prisma.warnsdorff.findMany();

//         // Combine both data sets into a single object
//         const responseData = {
//             art: dataArt,
//             warnsdorff: dataWarnsdorff
//         };

//         // Send the combined response
//         res.json(responseData);

//     } catch (error: any) {
//         console.error('Error fetching backgrounds:', error.message);
//         res.status(500).json({ error: 'Failed to fetch backgrounds' });
//     }
// });


// // See all the 'curators'
// app.get('/artists', async (req: Request, res: Response) => {
//     try {
//         const data = await prisma.art.findMany();
//         res.json(data);
//     } catch (error: any) {
//         console.error('Error fetching backgrounds:', error.message);
//         res.status(500).json({ error: 'Failed to fetch backgrounds' });
//     }
// });


//Endpoints to save diverse Art params
//Question: How do I handle the AI?

// // Endpoint to save background color
// const saveBackgroundHandler = app.post('/backgrounds', async (req: Request, res: Response) => {
//     console.log('Request received on /backgrounds');
//     console.log('Request headers:', req.headers);
//     console.log('Request body:', req.body);

//     const { bgcolor } = req.body;
//     const creatorId = req.auth?.userId;  // This should match the Clerk user ID
//     console.log('Background color:', bgcolor);
//     console.log('Creator ID:', creatorId);

//     try {
//         // Ensure the user exists
//         console.log('Checking if user exists in the database...');
//         const user = await prisma.user.findUnique({
//             where: { clerkId: creatorId }  // Use clerkId to find the user
//         });

//         if (!user) {
//             console.log('User not found in the database');
//             return res.status(404).json({ error: 'User not found' });
//         }

//         console.log('Saving new art to the database...');
//         const newArt = await prisma.art.create({
//             data: {
//                 bgcolor,
//                 isPublished: true,
//                 creatorId: user.id,  // Store the user's database ID
//             },
//         });
//         console.log('Art saved:', newArt);
//         res.status(200).json(newArt);
//     } catch (error: any) {
//         console.error('Error saving background:', error.message);
//         console.error(error.stack);
//         res.status(500).json({ error: 'Failed to save background' });
//     }
// });


// // Route handler to save boardState from chess game
// const saveChessStateHandler = app.post('/chess', async (req: Request, res: Response) => {
//     console.log('Request received on /chess');
//     console.log('Request headers:', req.headers);
//     console.log('Request body:', req.body);

//     // const { boardSize, path, gigerMode }: Warnsdorff = req.body;
//     const { boardSize, path, currentStep, gigerMode, clerkId } = req.body;
//     const creatorId = req.auth?.userId;  // This should match the Clerk user ID

//     console.log('This is the creatorId:', creatorId);
//     console.log('Creator ID:', creatorId);

//     try {
//         // Ensure the user exists
//         console.log('Checking if user exists in the database...');
//         const user = await prisma.user.findUnique({
//             where: { clerkId: creatorId }  // Use clerkId to find the user
//         });

//         if (!user) {
//             console.log('User not found in the database');
//             return res.status(404).json({ error: 'User not found' });
//         }

//         console.log('Saving new board state to the database...');
//         const newBoardState = await prisma.warnsdorff.create({
//             data: {
//                 boardSize,
//                 path: path as [number, number][],
//                 currentStep,
//                 gigerMode,
//                 isPublished: true,
//                 creatorId: user.id,  // Store the user's database ID
//             },
//         });
//         console.log('Board state saved:', newBoardState);
//         res.status(200).json(newBoardState);
//     } catch (error: any) {
//         console.error('Error saving board state:', error.message);
//         console.error(error.stack);
//         res.status(500).json({ error: 'Failed to save board state' });
//     }
// });


