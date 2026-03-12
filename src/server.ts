import { app } from "@/app";
import { AppError } from "./utils/AppError";

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `, new AppError("Teste",202));
  
});