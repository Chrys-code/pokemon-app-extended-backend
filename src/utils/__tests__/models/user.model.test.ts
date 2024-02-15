import connectToDB, { disconnectFromDB } from "../../../config/db_config";
import UserModel, { User, UserInput } from "../../../models/user.model";
import { mockUser } from "../data/mockdata";

describe("User Model Testing", () => {
    beforeAll(async () => {
        await connectToDB();
    });

    afterAll(async () => {
        await UserModel.collection.drop();
        await disconnectFromDB();
    });

    it("Should create user", async () => {
        // Prepare
        const initUser: UserInput = mockUser;

        // Act
        const person: User = new UserModel(initUser);
        const createdUser: User = await person.save();

        // Assert
        expect(createdUser).toBeDefined();
        expect(createdUser.email).toBe(mockUser.email);
        expect(createdUser).toHaveProperty("_id");
        expect(createdUser).toHaveProperty("password");
        expect(createdUser).toHaveProperty("createdAt");
        expect(createdUser).toHaveProperty("updatedAt");
    });
});
