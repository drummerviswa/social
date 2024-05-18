import express from "express";
import { getUser , updateUser, getAllUser, deleteUser} from "../controllers/user.js";

const router = express.Router()

router.get("/all",getAllUser)
router.delete("/:userId",deleteUser)
router.get("/find/:userId", getUser)
router.put("/", updateUser)


export default router