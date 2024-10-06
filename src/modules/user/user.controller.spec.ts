// import { Test, TestingModule } from "@nestjs/testing";
// import { UserController } from "./user.contoller";
// import { UserService } from "./user.service";

// describe("UserController", () => {
//     let userController: UserController;
//     let userService: UserService;

//     const mockUserService = {
//         getAllUsers: jest.fn().mockResolvedValue([{ id: 1, username: "Abdulla_2", password: "1234", email: "abdulla02@gmail.com", image: "image.png", role: "user" }])
//     }

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             controllers: [UserController],
//             providers: [{ provide: UserService, useValue: mockUserService }]
//         }).compile()

//         userController = module.get<UserController>(UserController)
//         userService = module.get<UserService>(UserService)
//     })

//     afterEach(() => {
//         jest.clearAllMocks()
//     })

//     it("get all users", async () => {
//         const users = await userController.getAllUsers()

//         expect(users).toHaveLength(1)
//         expect(users[0].username).toEqual("Abdulla_2")
//         expect(users[0].password).toEqual("1234")
//         expect(users[0].email).toEqual("abdulla02@gmail.com")
//         expect(users[0].image).toEqual("image.png")
//         expect(users[0].role).toEqual("user")
//         expect(userService.getAllUsers).toHaveBeenCalled()
//     })
// })