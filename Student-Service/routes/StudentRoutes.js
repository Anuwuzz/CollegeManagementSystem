const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentController');
 
/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management API
 */
 
/**
 * @swagger
 * /api/students/register:
 *   post:
 *     summary: Register a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - student_name
 *               - phone_no
 *               - department
 *               - marks
 *               - email
 *               - password
 *             properties:
 *               student_id:
 *                 type: string
 *               student_name:
 *                 type: string
 *               phone_no:
 *                 type: string
 *               department:
 *                 type: string
 *               marks:
 *                 type: number
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', studentController.registerStudent);
 
/**
 * @swagger
 * /api/students/login:
 *   post:
 *     summary: Student login
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', studentController.loginStudent);
 
/**
 * @swagger
 * /api/students/delete:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */
router.delete('/delete', studentController.deleteStudent);
 
/**
 * @swagger
 * /api/students/update:
 *   put:
 *     summary: Update student information
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 */
router.put('/update', studentController.updateStudent);
 
/**
 * @swagger
 * /api/students/all:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of all registered students
 */
router.get('/all', studentController.getAllStudents);
 
module.exports = router;