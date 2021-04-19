import { extname } from 'path';
import { diskStorage } from 'multer';

export const storageFactory = (folder: string) =>
  diskStorage({
    destination: './uploads/' + folder,
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  });
