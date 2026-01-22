const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const { nama, umur, alamat } = req.body;
    const student = await prisma.student.create({
      data: { nama, umur, alamat },
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { nama, umur, alamat } = req.body;
    const student = await prisma.student.update({
      where: { id: parseInt(req.params.id) },
      data: { nama, umur, alamat },
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await prisma.student.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
