import express from "express";



const server = express();

server.use(
    express.urlencoded({ extended: true })
);
server.use(express.json());


server.get('/', (req, res) => {
    return res.send("Server is fired successfully :---:)");
});




export  {server};