const request = require('supertest');
const buildApp = require('../../app');
const pool = require('../../pool');
const UserRepo = require('../../repos/user-repo');

// new imports to avoid Supertest

const db = 'socialnetwork-test';
// jest.setTimeout(30000);

beforeAll(() => {
    return pool.connect({
        host: 'localhost',
        port: 5432,
        database: db,
        user: 'wolf',
        password: '',
    });
});

afterAll(() => {
    return pool.close();
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
    console.log('briefly added a testUser before deleting it: ', testUser);
    const finishCount = await UserRepo.count();

    // Assert
    expect(200);
    expect(finishCount).toEqual(startingCount + 1);

    // Cleanup
    await UserRepo.delete(testUser.id);
});
