import express from "express";
import authenticateUser from "../../middleware/authenticateUser.js";
import {
  carbonReduction,
  renewables,
  saveSearch,
  sentenceGender,
  supplyChain,
  wasteAndRecycling,
  waterManagement,
} from "../../controller/tool/index.js";

const toolRouter = express.Router();

toolRouter.get(
  "/carbonReduction",
  authenticateUser as unknown as express.RequestHandler,
  carbonReduction as unknown as express.RequestHandler
);

toolRouter.get(
  "/wasteAndRecycling",
  // authenticateUser as unknown as express.RequestHandler,
  wasteAndRecycling as unknown as express.RequestHandler
);

toolRouter.get(
  "/waterManagement",
  // authenticateUser as unknown as express.RequestHandler,
  waterManagement as unknown as express.RequestHandler
);

toolRouter.get(
  "/sentenceGender",
  // authenticateUser as unknown as express.RequestHandler,
  sentenceGender as unknown as express.RequestHandler
);

toolRouter.get(
  "/supplyChain",
  // authenticateUser as unknown as express.RequestHandler,
  supplyChain as unknown as express.RequestHandler
);

toolRouter.get(
  "/renewables",
  // authenticateUser as unknown as express.RequestHandler,
  renewables as unknown as express.RequestHandler
);

toolRouter.post(
  "/search",
  authenticateUser as unknown as express.RequestHandler,
  saveSearch as unknown as express.RequestHandler
);

toolRouter.get("/test", (req, res) => {
  res.send("Tool route working!");
});

export default toolRouter;
