// const app = require("../../../server");
// const request = require("supertest");
// require("dotenv").config();
// const { reqaddProduct, requpdateProduct } = require("../data/product.test.data");


// const token = process.env.TOKEN;
// let productId = 'asd-123';

// GET TEST
// describe("GET /products/get", () => {
//     it("should return a specific product", async () => {
//         return request(app)
//             .get(`/products/get/${productId}`)
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((res) => {
//                 expect(res.statusCode).toBe(200);
//             })
//     });
// });

// GET ALL TEST
// describe("GET /products/getAll", () => {
//     it("should return all products", async () => {
//         return request(app)
//             .get("/products/getAll")
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((res) => {
//                 expect(res.statusCode).toBe(200);
//             })
//     });
// });


// // CREATE TEST
// describe("POST /products/create", () => {
//     test("should create a product", async () => {
//         return request(app)
//             .post("/products/create")
//             .set('Authorization', 'Bearer TOKEN')
//             .send(reqaddProduct)
//             .expect(201)
//             .then(({ body }) => {
//                 productId = body.data.productId
//             })
//     });
// });

// // UPDATE TEST
// describe("PUT /products/update/:id", () => {
//     test("should update a product", async () => {
//         return request(app)
//             .put(`/products/update/${productId}`)
//             .set('Authorization', `Bearer ${token}`)
//             .send(requpdateProduct)
//             .expect(201)
//             .then(({ body }) => {
//                 console.log(productId)
//             })
//     });
// });