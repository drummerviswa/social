import express from "express";
import { getRelationships, addRelationship, deleteRelationship, getFollowers } from "../controllers/relationship.js";

const router = express.Router()

router.get("/", getRelationships)
router.get("/follow",getFollowers)
router.post("/", addRelationship)
router.delete("/", deleteRelationship)


export default router