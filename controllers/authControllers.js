import catchAsync from "../helpers/catchAsync.js";
import { signup, login } from "../services/usersServices.js";
import { User } from "../models/userModel.js";

export const registerUser = async (req, res, next) => {
    try {
        const userData = req.body; 
        const { token, user } = await signup(userData);

      res.status(201).json({
            token,
            user: {
                name: user.name,
                email: user.email,
                avatarURL: user.avatarURL,
                boards: user.boards,
                theme: user.theme,
            }
      });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await login(email, password);
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
};

export const getCurrentUser = async (req, res, next) => {
    try {
        const { _id, name, email, avatarURL, boards, theme } = req.user;
        
        await User.findById(_id, { new: true })
            .populate("boards", {
                _id: 1,
                title: 1,
                icon: 1,
                background: 1,
                updatedAt: 1,
            })
            .then((user) => {
                res.status(201).json({
                    user: {
                    name,
                    email,
                    avatarURL,
                    boards,
                    theme,                   
                }
            })            
        })
    } catch (error) {
        next(error)
    }
}

export const logoutUser = catchAsync(async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
});
