import { extname } from 'path';
import { diskStorage } from 'multer';

export const storageFactory = (folder: string) =>
  diskStorage({
    destination: './uploads/' + folder,
    filename: (req, file, cb) => {
      // Generating a 32 random chars long string
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      //Calling the callback passing the random name generated with the original extension name
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  });
