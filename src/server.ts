import { app } from "./middleware";
import { registerRoutes } from "./routes";

const start = async () => {
  const PORT = 5000;

  try {
    app.register(registerRoutes);
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
