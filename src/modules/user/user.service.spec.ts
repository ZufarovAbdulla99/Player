import { getModelToken } from '@nestjs/sequelize';
import { UserService, User } from '@modules';
import { Test, TestingModule } from '@nestjs/testing';
import { STRING } from 'sequelize';

describe('UserService', () => {
  let service: UserService;

  const userMockModel = {
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User), useValue: userMockModel },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  test('should be defined', async () => {
    expect(service).toBeDefined();
  });

  test('should return users', async () => {
    const requestPayload = { id: 1 };
    const responseData = [
      {
        id: 1,
        username: 'test_user',
        password: 'test_password',
        email: 'test@gmail.com',
        image: 'test.jpg',
        role: 'user-test',
      },
    ];
    userMockModel.findByPk.mockResolvedValue(responseData);

    const user = await service.getUser(requestPayload.id);

    expect(user).toHaveLength(responseData.length);
    expect(user).toMatchObject(responseData);
    expect(userMockModel.findByPk).toHaveBeenCalled();
  });

  test('should create new user', async () => {
    const createUserDto = {
      username: 'test_user',
      password: 'test_password',
      email: 'test@gmail.com',
      image: 'test.svg',
      role: 'user',
    };

    const response = await service.createUser(createUserDto);
    expect(response).toBeUndefined();
    expect(userMockModel.create).toHaveBeenCalled();
  });

  // testdan ishlamadi nimagadir fail bo'votti
  test('should update user', async () => {
    const updatedUserId = {id: 2}
    const updateUserDto = {
      username: 'test_user',
      password: 'test_password',
      email: 'test@gmail.com',
      image: 'test.svg',
      role: 'user',
    };

    const response = await service.updateUser(updatedUserId.id, updateUserDto)
    expect(response).toBeUndefined()
    expect(response).toBeUndefined()
    expect(userMockModel.update).toHaveBeenCalled()
  });

  // Bu test ham ishlamadi
  test('should delete user', async () => {
    const deletedUserId = {id: 2}

    const response = await service.deleteUser(deletedUserId.id)
    expect(response).toBeUndefined()
    expect(userMockModel.destroy).toHaveBeenCalled()
  });
});
