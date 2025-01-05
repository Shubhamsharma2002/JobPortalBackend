import cors from "cors";
import express from "express";
import morgan from "morgan";

const server = express();

server.use(express.urlencoded({ extended: true }));
// for data handlling
server.use(express.json());
server.use(
  cors({
    // origin:process.env.CORS_ORIGIN,
    Credential: true,
  })
);
server.use(morgan("dev"));

server.get("/", (req, res) => {
  return res.send("Server is fired successfully :---:)");
});

export { server };
