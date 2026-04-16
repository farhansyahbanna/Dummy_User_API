const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateSaldo,
  updateHutang
} = require('../controllers/userController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: User's name
 *         saldo:
 *           type: number
 *           description: User's balance
 *         hutang:
 *           type: number
 *           description: User's debt
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         netWorth:
 *           type: number
 *           description: Calculated net worth (saldo - hutang)
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         saldo:
 *           type: number
 *           example: 1000000
 *         hutang:
 *           type: number
 *           example: 500000
 */

// Routes
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/:id/saldo', updateSaldo);
router.patch('/:id/hutang', updateHutang);

module.exports = router;