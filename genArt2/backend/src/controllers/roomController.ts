import type { Request, Response } from 'express';
import { RoomModel } from '../models/roomModel';  // Adjust path as necessary

const roomModel = new RoomModel();

export class RoomController {

    // Get all rooms
    async getAllRooms(req: Request, res: Response): Promise<void> {
        try {
            const rooms = await roomModel.getAllRooms();
            console.log("getAllRooms from BE", rooms)
            res.status(200).json(rooms);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching rooms' });
        }
    }

    // Get room by Id
    async getRoomById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;  // Use params to get room ID from the URL
        try {
            const room = await roomModel.getRoomById(id);
            if (room) {
                res.status(200).json(room);
            } else {
                res.status(404).json({ message: 'Room not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching room' });
        }
    }

    // Create a new room
    async createRoom(req: Request, res: Response): Promise<void> {
        const { name, description, period } = req.body;
        try {
            const newRoom = await roomModel.createRoom({ name, description, period });
            res.status(201).json(newRoom);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating room' });
        }
    }

    // Update an existing room
    async updateRoom(req: Request, res: Response): Promise<void> {
        const { id } = req.params;  // Use params to get room ID from the URL
        const { name, description, period } = req.body;
        try {
            const updatedRoom = await roomModel.updateRoom(id, { name, description, period });
            if (updatedRoom) {
                res.status(200).json(updatedRoom);
            } else {
                res.status(404).json({ message: 'Room not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating room' });
        }
    }

    // Delete a room
    async deleteRoom(req: Request, res: Response): Promise<void> {
        const { id } = req.params;  // Use params to get room ID from the URL
        try {
            const deletedRoom = await roomModel.deleteRoom(id);
            if (deletedRoom) {
                res.status(200).json({ message: 'Room deleted' });
            } else {
                res.status(404).json({ message: 'Room not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting room' });
        }
    }
}
