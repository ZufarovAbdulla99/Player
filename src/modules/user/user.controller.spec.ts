import { Test, TestingModule } from '@nestjs/testing';
import { UserController, UserService } from '@modules';
import { Readable } from 'stream';
import { Role } from './dtos';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    getUser: jest.fn(),
    getAllUsers: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    deleteAllUsers: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Har bir testdan keyin mock'larni tozalash
  });

  describe('Get one user', () => {
    test('should return one user', async () => {
      const user: object = 
        {
          id: 1,
          username: 'test_user',
          password: 'test_password',
          email: 'test@gmail.com',
          image: 'test.jpg',
          role: 'user-test',
        };
      mockUserService.getUser.mockResolvedValue(user);

      const result = await userController.getUser(1);
      expect(result).toEqual(user);
      expect(userService.getUser).toHaveBeenCalled();
    });
  });

  describe('Get all users', () => {
    test('should return an array of users', async () => {
      const users: any[] = [
        {
          id: 1,
          username: 'test_user',
          password: 'test_password',
          email: 'test@gmail.com',
          image: 'test.jpg',
          role: 'user-test',
        },
        {
            id: 2,
            username: 'test_user',
            password: 'test_password',
            email: 'test@gmail.com',
            image: 'test.jpg',
            role: 'user-test',
          },
      ];
      mockUserService.getAllUsers.mockResolvedValue(users);

      const result = await userController.getAllUsers();
      expect(result).toEqual(users);
      expect(userService.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('create user', () => {
    it('should create a new user', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'image',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 12345,
        buffer: Buffer.from(''),
        destination: '',
        filename: 'test.jpg',
        path: '',
        stream: new Readable(),
      } as any;
      const createUserDto = {
        username: 'test_user',
        password: 'test_password',
        email: 'test@gmail.com',
        image: 'test.jpg',
        role: Role.USER,
      };

      const result = await userController.createUser(createUserDto, mockFile);
      expect(result).toBeUndefined();
      expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('update user', () => {
    it('should update a new user', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'image',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 12345,
        buffer: Buffer.from(''),
        destination: '',
        filename: 'test-update.jpg',
        path: '',
        stream: new Readable(),
      } as any;
      const updateUserDto = {
        username: 'test_user',
        password: 'test_password',
        email: 'test@gmail.com',
        image: 'test-update.jpg',
        role: Role.USER,
      };

      const result = await userController.updateUser(1, updateUserDto, mockFile);
      expect(result).toBeUndefined();
      expect(userService.updateUser).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('delete user', () => {
    it('should delete one user', async () => {
      const result = await userController.deleteUser(1);
      expect(result).toBeUndefined();
      expect(userService.deleteUser).toHaveBeenCalledWith(1);
    });
  });

  describe('delete all users', () => {
    it('should delete all users', async () => {
      const result = await userController.deleteAllUsers();
      expect(result).toBeUndefined();
      expect(userService.deleteAllUsers).toHaveBeenCalledWith();
    });
  });
});
