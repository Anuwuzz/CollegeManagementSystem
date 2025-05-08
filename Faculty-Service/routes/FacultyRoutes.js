const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/FacultyController');
 
/**
 * @swagger
 * tags:
 *   name: Faculties
 *   description: Faculty management endpoints
 */
 
/**
 * @swagger
 * /api/faculties/register:
 *   post:
 *     summary: Register a new faculty
 *     tags: [Faculties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               faculty_id:
 *                 type: string
 *               name:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Faculty registered successfully
 */
router.post('/register', facultyController.registerFaculty);
 
/**
 * @swagger
 * /api/faculties/login:
 *   post:
 *     summary: Login faculty
 *     tags: [Faculties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', facultyController.loginFaculty);
 
/**
 * @swagger
 * /api/faculties/delete:
 *   delete:
 *     summary: Delete a faculty
 *     tags: [Faculties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               faculty_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Faculty deleted successfully
 */
router.delete('/delete', facultyController.deleteFaculty);
 
/**
 * @swagger
 * /api/faculties/update:
 *   put:
 *     summary: Update a faculty's info
 *     tags: [Faculties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               faculty_id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Faculty updated successfully
 */
router.put('/update', facultyController.updateFaculty);
 
/**
 * @swagger
 * /api/faculties/all:
 *   get:
 *     summary: Get all faculties
 *     tags: [Faculties]
 *     responses:
 *       200:
 *         description: List of faculties
 */
router.get('/all', facultyController.getAllFaculties);
 
module.exports = router;
 
 