import express from "express";



const server = express();

server.use(
    express.urlencoded({ extended: true })
);
// for data handlling
server.use(express.json());


server.get('/', (req, res) => {
    return res.send("Server is fired successfully :---:)");
});




export  {server};