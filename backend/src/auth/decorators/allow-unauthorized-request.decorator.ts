import { SetMetadata, CustomDecorator } from "@nestjs/common";

export const ALLOW_UNAUTHORIZED_REQUEST = "allow-unauthorized-request";

export const AllowUnauthorizedRequest = (): CustomDecorator =>
    SetMetadata(ALLOW_UNAUTHORIZED_REQUEST, true);
