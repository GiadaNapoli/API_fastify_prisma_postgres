"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
=======
// src/__tests__/example.test.ts
>>>>>>> d62d64bb5a790376fb9ffb65392299525c4b268b
const userService = __importStar(require("../services/user.service"));
const server_1 = require("../server");
const error_1 = require("../error/error");
describe("Example Test Suite", () => {
    it("should pass this test", () => {
        expect(true).toBe(true);
    });
});
describe("POST /users", () => {
    const userData = {
        email: "useruser@example.com",
    };
    it("should create a new user", async () => {
        const res = await server_1.fastify.inject({
            method: "POST",
            url: "/users",
            payload: userData,
        });
        expect(res.statusCode).toBe(200);
        const { data } = JSON.parse(res.payload);
        expect(data).toMatchObject({ ...userData, id: expect.any(String) });
    });
    it("should return 409 for duplicate email", async () => {
        jest.spyOn(userService, "createUser").mockImplementationOnce(() => {
            throw new error_1.DuplicateEntryError("Email already exists");
        });
        const res = await server_1.fastify.inject({
            method: "POST",
            url: "/users",
            payload: {
                email: userData.email,
            },
        });
        expect(res.statusCode).toBe(409);
        expect(JSON.parse(res.payload)).toEqual({
            error: "Email already exists",
        });
    });
    it("should handle unknown errors", async () => {
        jest.spyOn(userService, "createUser").mockImplementationOnce(() => {
            throw new Error("Unknown error");
        });
        const res = await server_1.fastify.inject({
            method: "POST",
            url: "/users",
            payload: userData,
        });
        expect(res.statusCode).toBe(500);
        expect(JSON.parse(res.payload)).toEqual({
            error: "Internal Server Error",
        });
    });
});
