import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./Src/Routes/Index.js";
// server by express
const server = express();
// for data handlling
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
// cors setup
server.use(
  cors({
    // origin:process.env.CORS_ORIGIN,
    Credential: true,
  })
);
// api veriso 
server.use('/api/v1', router);
// logger
server.use(morgan("dev"));
// server message
server.get("/", (req, res) => {
  return res.send("Server is fired successfully :---:)");
});

export { server };
