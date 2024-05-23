import mongoose from "mongoose";
import app from "./app";
import { configs } from "./app/configs/configs";

async function main() {
  try {
    await mongoose.connect(configs.database_url as string);
    app.listen(configs.port, async () => {
      console.log("listening to port ", configs.port);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
