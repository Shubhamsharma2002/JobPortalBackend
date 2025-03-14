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
server.use(
  cors({
    // origin:process.env.CORS_ORIGIN,
    Credential: true,
  })
);
server.use('/api/v1', router);
server.use(morgan("dev"));

server.get("/", (req, res) => {
  return res.send("Server is fired successfully :---:)");
});

export { server };
