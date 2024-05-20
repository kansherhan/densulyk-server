import { join, extname } from "path";
import { diskStorage } from "multer";
import { MulterModule } from "@nestjs/platform-express";

export function CreateMulterModule() {
    return MulterModule.register({
        storage: diskStorage({
            destination: join(
                __dirname,
                "..",
                process.env.BACKEND_UPLOAD_FOLDER,
            ),
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join("");
                cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
        limits: {
            fileSize: 1024 * 1024 * 15,
        },
    });
}
