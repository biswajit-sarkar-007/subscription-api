import mongoose from "mongoose";

import {DB_URI, NODE_ENV} from '../config/env.js'

if(!DB_URI) {
    throw new Error('please define the MONGODB uri properly in .env.<developement/production>.local')
}

const connetectToDatabase = async () =>{
    try {
        await mongoose.connect(DB_URI);
        console.log(`connect to database is ${NODE_ENV} mode`);
        
    } catch (error) {
        console.log('Erro connecting to database: ', error);
        process.exit(1);
    }
}

export default connetectToDatabase;