const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/StudentController');
const { PrismaClient } = require('@prisma/client');

// Mock PrismaClient
jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        student: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe('StudentController Unit Tests', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe('getStudents', () => {
        test('should return all students with status 200', async () => {
            const students = [{ id: 1, nama: 'John', umur: 20, alamat: 'Street' }];
            prisma.student.findMany.mockResolvedValue(students);

            await getStudents(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(students);
        });

        test('should return status 500 on error', async () => {
            prisma.student.findMany.mockRejectedValue(new Error('DB Error'));

            await getStudents(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'DB Error' });
        });
    });

    describe('createStudent', () => {
        test('should create student and return status 201', async () => {
            req.body = { nama: 'Jane', umur: 22, alamat: 'Avenue' };
            const newStudent = { id: 2, ...req.body };
            prisma.student.create.mockResolvedValue(newStudent);

            await createStudent(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newStudent);
        });
    });

    describe('getStudentById', () => {
        test('should return student if found', async () => {
            req.params.id = '1';
            const student = { id: 1, nama: 'John' };
            prisma.student.findUnique.mockResolvedValue(student);

            await getStudentById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(student);
        });

        test('should return 404 if not found', async () => {
            req.params.id = '999';
            prisma.student.findUnique.mockResolvedValue(null);

            await getStudentById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Student not found' });
        });
    });
});
