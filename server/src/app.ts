import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

const app = express();

// =======================
// Global Middlewares
// =======================

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// =======================
// Health Check Route
// =======================

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BIT Buy & Sell Backend is running 🚀",
  });
});

export default app;
