import express from "express";
import authRouter from "./routes/authRouter";
import connectUserDB from "./connections/userDB";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import userRouter from "./routes/userRouter";
import todoRoutes from './routes/todo';
import { authenticate } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

// Define the UserBasicInfo interface globally within Express
interface UserBasicInfo {
  _id: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

const app = express();
const port = process.env.PORT || 8000;

// Middleware setup
app.use('/api/todos', todoRoutes);
app.use(helmet());
app.use(cors({
  origin: "http://localhost:8000",
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Routes setup
app.use(authRouter);
app.use("/users", authenticate, userRouter);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
connectUserDB(); // Assume this function connects to the MongoDB

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://sinta123:sinta123@cluster0.qqt3i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

   