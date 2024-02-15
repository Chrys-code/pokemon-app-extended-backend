const app = require("../../../../server");
import request from "supertest";
// import { user } from "../data/mockdata";

describe("Auth", () => {

    // describe("POST /auth/register", () => {
    //     // @ts-ignore
    //     it("Should create a new user", async (done) => {
    //         const res = await request(app).post("/auth/register").send(user);
    //         expect(res.status).toEqual(201);
    //         expect(res.body).toHaveProperty('message');
    //         expect(res.body).toHaveProperty('user');
    //         done();
    //     });

    //     // @ts-ignore
    //     it("Should not create a new user when email is taken", async (done) => {
    //         const res = await request(app).post("/auth/register").send(user);
    //         expect(res.status).toEqual(403);
    //         expect(res.body).toHaveProperty('message');
    //         expect(res.body).not.toHaveProperty('user');
    //         done();
    //     });
    // })


    // describe("PUT /auth/updateUser", () => {
    //     it("Should update user", async () => {
    //         const res = await request(app).post("/auth/update").send(auth);
    //         expect(res.status).toEqual(201);
    //         expect(res.body).toHaveProperty('message');
    //         expect(res.body).not.toHaveProperty('auth');
    //     });
    // })

    // describe("DELETE /auth/deleteUser", () => {
    //     it("Should delete user", async () => {
    //         const res = await request(app).post("/auth/delete").send(auth);
    //         expect(res.status).toEqual(200);
    //         expect(res.body).toHaveProperty('message');
    //         expect(res.body).not.toHaveProperty('auth');
    //     });
    // })

    describe("POST /auth/login", () => {
        // @ts-ignore
        it("Should log in a user", async (done) => {

            // Act
            // const res = await request(app).post("/auth/login").send(user);

            // Assert
            // expect(res.status).toEqual(200);
            // expect(res.body).toHaveProperty('success');
            // expect(res.body).toHaveProperty('user');

            done();
        });
    })
})
