import express from 'express'
import { postAddBoard, getOneBoard} from '../controllers/boardsController.js'
import { validateBody } from '../middlewares/validateBody.js'
import { isValidId } from '../middlewares/isValidId.js'
import { addBoardSchema } from '../schemas/addBoardSchema.js'
const boardsRouter = express.Router()

boardsRouter.post(
  '/',
  validateBody(addBoardSchema, `missing fields`),
  postAddBoard
)
boardsRouter.get("/:id", isValidId, getOneBoard);

export default boardsRouter
