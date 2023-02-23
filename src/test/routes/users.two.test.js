// const request = require('supertest');
// const buildApp = require('../../app');
const pool = require('../../pool');
const UserRepo = require('../../repos/user-repo');
const TestContext = require('../testContext');

let testContext;

beforeAll(async () => {
    testContext = await TestContext.build();

    console.log(
        'Context for users.two.test is roleName: ',
        testContext.roleName
    );
});

afterAll(() => {
    return testContext.goodBye();
});

it('create a user', async () => {
    //! Supertest not working...
    // await request(buildApp())
    //     .post('/users')
    //     .send({ username: 'testuser', bio: 'test bio' })
    //     .expect(200);

    // Arrange
    const startingCount = await UserRepo.count();
    const params = { username: 'testuser', bio: 'test bio' };

    // Act
    const testUser = await UserRepo.insert(params.username, params.bio);

    const finishCount = await UserRepo.count();

    // Assert
    expect(200);
    expect(finishCount).toEqual(startingCount + 1);
});
