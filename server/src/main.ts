import dotenv from "dotenv";
dotenv.config();
import createServer from "./app";
import { connectToDatabase } from "./database/connection";
try {
  

  const app = createServer()

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.log("Error on the Server", error);
}
