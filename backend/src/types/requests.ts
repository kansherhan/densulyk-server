import { Request } from "express";

import { User } from "@/users/models/users.model";

export type AuthenticatedRequest = Request & {
    user: User;
    allowUnauthorizedRequest: boolean;
};
