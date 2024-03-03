import { Board } from '../models/boardModel.js'

async function addBoard(req) {
  const result = await Board.create({ ...req.body })

  return result
}


async function getBoard(id) {
    const result = await Board.findById(id)
   // const result = await Board.findById(id).populate({
        // path: "columns",
        // select: {
        //   _id: 1,
        //   updatedAt: 1,
        //   title: 1,
        //   tasks: 1,
        // },
        // populate: {
        //   path: "tasks",
        //   select: {
        //     _id: 1,
        //     updatedAt: 1,
        //     title: 1,
        //     description: 1,
        //     priority: 1,
        //     deadline: 1,
        //   },
        // },
     // });
    return result
  }



export { addBoard, getBoard }
