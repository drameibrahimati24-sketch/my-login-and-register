const request = require('supertest');
const app = require('../app');

describe('Student Controller API Tests', () => {
    let studentId;

    // POST Test
    test('POST /api/students - should create a new student', async () => {
        const response = await request(app)
            .post('/api/students')
            .send({
                nama: 'John Doe',
                umur: 20,
                alamat: 'Jl. Merdeka No. 123'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nama).toBe('John Doe');
        studentId = response.body.id;
    });

    // GET Test
    test('GET /api/students - should get all students', async () => {
        const response = await request(app).get('/api/students');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // PUT Test
    test('PUT /api/students/:id - should update a student', async () => {
        const response = await request(app)
            .put(`/api/students/${studentId}`)
            .send({
                nama: 'John Doe Updated',
                umur: 21,
                alamat: 'Jl. Merdeka No. 456'
            });

        expect(response.status).toBe(200);
        expect(response.body.nama).toBe('John Doe Updated');
    });

    // DELETE Test
    test('DELETE /api/students/:id - should delete a student', async () => {
        const response = await request(app).delete(`/api/students/${studentId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Student deleted successfully');
    });
});
