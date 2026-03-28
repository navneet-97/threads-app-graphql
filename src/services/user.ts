import { createHmac, randomBytes } from 'crypto'
import { prisma } from '../lib/db.js';
import jwt from 'jsonwebtoken'
const secret = 'SP!derM@n'

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

export interface CreateThreadPayload {
    title: string;
    content: string;
    createdById: string;
}

class UserService {
    private static hashPassword(password: string, salt: string) {
        return createHmac('sha256', salt)
            .update(password)
            .digest('hex')
    }

    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload
        const salt = randomBytes(16).toString()
        const hashedPassword = this.hashPassword(password, salt);
        return prisma.user.create({
            data: {
                firstName,
                lastName: lastName ?? null,
                email,
                salt,
                password: hashedPassword
            }
        })
    }

    private static getUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } })
    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const { email, password } = payload
        const user = await this.getUserByEmail(email);
        if (!user) throw new Error('User Not Found')

        const salt = user.salt;
        const hashedPassword = user.password;
        const newHashedPassword = this.hashPassword(password, salt);

        if (hashedPassword !== newHashedPassword) throw new Error('Password Incorrect');
        return jwt.sign({
            id: user.id,
            email: user.email,
            firstName: user.firstName
        }, secret)
    }

    public static decodeJWTToken(token: any) {
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return null;
        }
    }

    public static getUserById(id: string) {
        return prisma.user.findUnique({ where: { id } })
    }

    public static createThread(payload: CreateThreadPayload) {
        const { title, content, createdById } = payload
        return prisma.thread.create({
            data: {
                title,
                content,
                createdById,
            }
        })
    }

    public static async getAllThreads() {
        return await prisma.thread.findMany({});
    }

    public static async getAllThreadsByUserId(id: string) {
        return await prisma.thread.findMany({ where: { createdById: id } });
    }

    public static async getAllUsers() {
        return await prisma.user.findMany({});
    }

    public static async getLikesCount(id: string) {
        return await prisma.like.count({
            where: {
                threadId: id
            }
        })
    }

    public static async checkCurrentUserLikeOnThread(userId: string, threadId: string) {
        return await prisma.like.findFirst({
            where: {
                userId, threadId
            }
        })
    }

    public static async createLike(userId: string, threadId: string) {
        await prisma.like.create({
            data: {
                userId,
                threadId,
            }
        })
    }

    public static async deleteLike(userId: string, threadId: string) {
        await prisma.like.delete({
            where: {
                userId_threadId: {
                    userId, threadId
                }
            }
        })
    }
}

export default UserService