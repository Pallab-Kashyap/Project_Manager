import { Router } from "express";
import auth from "../middlewares/authMiddleware";
import { addMember, joinRequestAccepted, removeMember } from "../controllers/memberController";

const router = Router();

router.route('/')
    .post(auth, addMember)
    .delete(auth, removeMember)

router.route('/invitaion-acepted')
    .post(auth, joinRequestAccepted)

export default router