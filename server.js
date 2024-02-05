import { app } from "./app.js";
import { connectDB } from "./data/database.js";

const PORT = process.env.PORT || 3000;

connectDB()

app.listen(PORT, () => {
  console.log(`Server Is Running ${PORT}`);
});
