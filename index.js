
// env settup
import 'dotenv/config';

import {server} from './app.js';
import connectDB from './Src/db/dbConnection.js';

const port = process.env.PORT || 5000;


server.listen(port, ()=>{
   connectDB();
    console.log(`server is fired sucessfully on port number ${port}`);
})
