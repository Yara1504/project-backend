import catchAsync from '../helpers/catchAsync.js'
import { addBoard ,getBoard} from '../services/boardService.js'
import HttpError from '../helpers/HttpError.js'

export const postAddBoard = catchAsync(async (req, res) => {
  
  const result = await addBoard(req)
  if (!result) {
    throw HttpError(404, `Not found`)
  }

  const { _id, title, icon, background, columns, updatedAt } = result
  res.status(201).json({ _id, title, icon, background, updatedAt, columns })
})

export const getOneBoard = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await getBoard(id)
  if (!result) {
    throw HttpError(404, `Not found`)
  }
  const { _id, title, icon, background, columns, updatedAt } = result
  res.status(200).json({ _id, title, icon, background, updatedAt, columns })
})
