import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// __dirname को डिफाइन करना जरूरी है (ES Modules के लिए)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // बैकएंड के अंदर 'public' फोल्डर का पूरा पाथ
    const uploadPath = path.join(__dirname, "../public");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ storage });