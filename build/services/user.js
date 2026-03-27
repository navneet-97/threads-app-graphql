import { createHmac, randomBytes } from 'crypto';
import { prisma } from '../lib/db.js';
import jwt from 'jsonwebtoken';
const secret = 'SP!derM@n';
class UserService {
    static hashPassword(password, salt) {
        return createHmac('sha256', salt)
            .update(password)
            .digest('hex');
    }
    static createUser(payload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(16).toString();
        const hashedPassword = this.hashPassword(password, salt);
        return prisma.user.create({
            data: {
                firstName,
                lastName: lastName ?? null,
                email,
                salt,
                password: hashedPassword
            }
        });
    }
    static getUserByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
    static async getUserToken(payload) {
        const { email, password } = payload;
        const user = await this.getUserByEmail(email);
        if (!user)
            throw new Error('User Not Found');
        const salt = user.salt;
        const hashedPassword = user.password;
        const newHashedPassword = this.hashPassword(password, salt);
        if (hashedPassword !== newHashedPassword)
            throw new Error('Password Incorrect');
        return jwt.sign({
            id: user.id,
            email: user.email,
            firstName: user.firstName
        }, secret);
    }
    static decodeJWTToken(token) {
        try {
            return jwt.verify(token, secret);
        }
        catch (error) {
            return null;
        }
    }
    static getUserById(id) {
        return prisma.user.findUnique({ where: { id } });
    }
}
export default UserService;
//# sourceMappingURL=user.js.map