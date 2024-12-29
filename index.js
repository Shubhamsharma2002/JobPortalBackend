

import 'dotenv/config';

import {server} from './app.js';

const port = process.env.PORT || 5000;


server.listen(port, ()=>{
   
    console.log(`server is fired sucessfully on port number ${port}`);
})
