import jwt, { SignOptions } from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "fallback_access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret";

// .env থেকে এক্সপায়ারি রিড করা (ডিফল্ট ফলব্যাক সহ)
const ACCESS_EXPIRES_IN = (process.env.JWT_ACCESS_EXPIRES_IN || "1d") as SignOptions["expiresIn"];
const REFRESH_EXPIRES_IN = (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as SignOptions["expiresIn"];


export interface TokenPayload {
    userId: string;
    email: string;
}


// Access Token তৈরি (যেমন: ১ দিন মেয়াদ)

export const generateAccessToken = (payload: TokenPayload) => {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
}

// Refresh Token তৈরি (যেমন: ৭ দিন মেয়াদ)

export const generateRefreshToken = (payload: TokenPayload) => {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

// Access Token ভেরিফাই করা

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
}

// Refresh Token ভেরিফাই করা

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
}

