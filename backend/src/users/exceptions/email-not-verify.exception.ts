import { BaseException } from "@/exceptions/base.exception";
import { HttpStatusCode } from "@/utilities/http-status-code";

export class EmailNotVerifyException extends BaseException {
    public constructor(data: any = true) {
        super(
            "Ваша электронная почта не подтверждена",
            HttpStatusCode.HTTP_STATUS_EMAIL_NOT_VERIFY,
            data,
        );
    }
}
