import jwt from 'jsonwebtoken';
export interface CreateUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}
export interface GetUserTokenPayload {
    email: string;
    password: string;
}
declare class UserService {
    private static hashPassword;
    static createUser(payload: CreateUserPayload): import("../generated/prisma/models.js").Prisma__UserClient<{
        id: string;
        firstName: string;
        lastName: string | null;
        profileImageURL: string | null;
        email: string;
        password: string;
        salt: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    private static getUserByEmail;
    static getUserToken(payload: GetUserTokenPayload): Promise<string>;
    static decodeJWTToken(token: any): string | jwt.JwtPayload | null;
    static getUserById(id: string): import("../generated/prisma/models.js").Prisma__UserClient<{
        id: string;
        firstName: string;
        lastName: string | null;
        profileImageURL: string | null;
        email: string;
        password: string;
        salt: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
export default UserService;
//# sourceMappingURL=user.d.ts.map