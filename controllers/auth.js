import { User } from "../models/users.js";
import HttpError from "../middlewares/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email in use");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({...req.body, password: hashPassword});
        res.status(201).json(
            {
                user: {
                    name: newName.name,
                    email: newUser.email,
                }
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
        await User.findByIdAndUpdate(user._id, { token });
        
        res.status(200).json({
            token,
            user: {
                email: user.email,
                name: newName.name,
            }
        })
    } catch (error) {
        next(error)
    }
}

export const editProfile = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const { _id } = req.user;

        const hashPassword = password;
        if (password) {
            hashPassword = await bcrypt.hash(password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(_id, { name, email, password: hashPassword }, { new: true });

        res.status(200).json({
            user: {
                name: updateUser.name,
                email: updateUser.email,
            }
        });
    } catch (error) {
        next(error);
    }
};

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