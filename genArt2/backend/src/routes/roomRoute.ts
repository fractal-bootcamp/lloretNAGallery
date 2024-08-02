
// This file sets up the routes for room-related API endpoints
// and maps them to the appropriate controller methods.
// src/routes/roomRoutes.ts

import { Router } from 'express';
import { RoomController } from '../controllers/roomController';

const router = Router();
const roomController = new RoomController();

// Define routes

// Get all rooms
router.get('/all', roomController.getAllRooms.bind(roomController));

// Get room by Id
router.get('/room/:id', roomController.getRoomById.bind(roomController));

// Create a new room
router.post('/room/new', roomController.createRoom.bind(roomController));

// Update a room
router.put('/room/:id', roomController.updateRoom.bind(roomController));

// Delete a room
router.delete('/room/:id', roomController.deleteRoom.bind(roomController));

export default router;