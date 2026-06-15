import mongoose from "mongoose";
import config from "./app/config/index.js";
import app from "./app.js";




async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`server set up  app running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

main(); 
