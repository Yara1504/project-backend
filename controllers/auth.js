import { User } from "../models/users.js";
import HttpError from "../middlewares/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email in use");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ ...req.body, password: hashPassword });
        
        const { _id: id } = newUser;
        const payload = { id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

        await User.findByIdAndUpdate(id, { token }, { new: true })
            .populate("boards", {
                _id: 1,
                title: 1,
                icon: 1,
                background: 1,
                updatedAt: 1,
            })
            .then((user) => {
                res.status(201).json({
                token: token,
                    user: {
                    name: user.name,
                    email: user.email,
                    avatarURL: user.avatarURL,
                    boards: user.boards,
                    theme: user.theme,                   
                }
            })            
        })
    } catch (error) {
        next(error)
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw HttpError(401, "Email or password is wrong");           
        }
        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

        await User.findByIdAndUpdate(user._id, { token }, { new: true })
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
                    name: user.name,
                    email: user.email,
                    avatarURL: user.avatarURL,
                    boards: user.boards,
                    theme: user.theme,                   
                }
            })            
        })
    } catch (error) {
        next(error)
    }
};

export const getCurrent = async (req, res, next) => {
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

export const updateAvatar = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { path: tempUpload, originalname } = req.file;
        if (!req.file) {
            throw HttpError(400);
        }
        const filename = `${_id}_${originalname}`;
        const resultUpload = path.join(avatarDir, filename);

        const img = await Jimp.read(tempUpload);
        await img.resize(250, 250).quality(60).write(tempUpload);

        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("avatars", filename);
        await User.findByIdAndUpdate(_id, { avatarURL });

        res.json({
            avatarURL
        })

    } catch (error) {
        next(error)
    }
}