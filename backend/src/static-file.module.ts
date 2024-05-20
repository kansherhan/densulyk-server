import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

export function CreateStaticFileModule() {
    return ServeStaticModule.forRoot({
        rootPath: join(__dirname, "..", process.env.BACKEND_UPLOAD_FOLDER),
        serveRoot: "/uploads/",
    });
}
