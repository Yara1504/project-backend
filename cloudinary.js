import cloudinary from "cloudinary";
import 'dotenv/config'; 

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: async (req, file) => {
    let folder;
    if (file.fieldname === "avatar") {
      folder = "avatars";
    }
    return {
      folder: folder,
      format: ["jpg", "png"],
      public_id: file.originalname
    };
  },
});

export const upload = multer({ storage });
