import mongoose from "mongoose";
import { Server } from "http";
import config from "./app/config/index.js";
import app from "./app.js";
import { connectRedis } from "./app/config/redis.config.js";


let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

   server =   app.listen(config.port, () => {
      console.log(`server set up  app running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

(async () => {
    await connectRedis()
    await main()
    
})()


process.on('SIGTERM',() =>{
    console.log('SIGTERM dective.. server down');
    if(server){
        server.close(() =>{
            process.exit(1)
        })
    }
    process.exit(1)
})



process.on('SIGINT',() =>{
    console.log('SIGINT dective.. server down');
    if(server){
        server.close(() =>{
            process.exit(1)
        })
    }
    process.exit(1)
})



process.on('unhandledRejection',(err) =>{
    console.log('unhandle reacjection dective.. server down', err);
    if(server){
        server.close(() =>{
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on('uncaughtException',(err) =>{
    console.log('uncaughtException dective.. server down', err);
    if(server){
        server.close(() =>{
            process.exit(1)
        })
    }
    process.exit(1)
})
