import request from 'supertest';
import app from '../app';
import createConnection from '../database';

describe('Survey', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it('should be able to create a new survey', async () => {
        const response = await request(app).post('/surveys').send({
            title: 'Survey Title',
            description: 'Survey description',
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should be able to get all surveys', async () => {
        await request(app).post('/surveys').send({
            title: 'Survey Title2',
            description: 'Survey description2',
        });

        const response = await request(app).get('/surveys');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});