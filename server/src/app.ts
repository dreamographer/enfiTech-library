import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRoute";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";

function createServer(){
    const corsOptions = {
      origin: `${process.env.CLIENT_URL}`, //client origin
    };
    const app = express();
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use("/api/user", userRouter);
    app.use("/api/books", bookRoutes);
    return app
}

export default createServer;
