import express from "express";
import authenticateUser from "../../middleware/authenticateUser.js";
import { carbonReduction, renewables, saveSearch, sentenceGender, supplyChain, wasteAndRecycling, waterManagement, } from "../../controller/tool/index.js";
const toolRouter = express.Router();
toolRouter.get("/carbonReduction", authenticateUser, carbonReduction);
toolRouter.get("/wasteAndRecycling", 
// authenticateUser as unknown as express.RequestHandler,
wasteAndRecycling);
toolRouter.get("/waterManagement", 
// authenticateUser as unknown as express.RequestHandler,
waterManagement);
toolRouter.get("/sentenceGender", 
// authenticateUser as unknown as express.RequestHandler,
sentenceGender);
toolRouter.get("/supplyChain", 
// authenticateUser as unknown as express.RequestHandler,
supplyChain);
toolRouter.get("/renewables", 
// authenticateUser as unknown as express.RequestHandler,
renewables);
toolRouter.post("/search", authenticateUser, saveSearch);
export default toolRouter;
