import type { Request, Response } from 'express';
import { RoomModel } from '../models/roomModel';  // Adjust path as necessary
import { ArtPeriod } from '@prisma/client'

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
    // Get rooms by Period
    async getRoomByPeriod(req: Request, res: Response): Promise<void> {
        const period = req.query.period as string;  // Use params to get the period from the URL

        const artPeriod: ArtPeriod = period as ArtPeriod;

        try {
            const rooms = await roomModel.getRoomByPeriod(artPeriod); // Adjust the model method if necessary
            if (rooms.length > 0) {
                res.status(200).json(rooms);
            } else {
                res.status(404).json({ message: 'No rooms found for the given period' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching rooms' });
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
        const period = req.query.period as string  // Use params to get room ID from the URL
        const { name, description } = req.body;
        const artPeriod: ArtPeriod = period as ArtPeriod;

        try {
            const updatedRoom = await roomModel.updateRoom(artPeriod, { name, description });
            if (updatedRoom !== undefined) {
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
    async deleteRoomsByPeriod(req: Request, res: Response): Promise<void> {
        const period = req.query.period;  // Use params to get room ID from the URL
        const artPeriod: ArtPeriod = period as ArtPeriod;

        try {
            const deletedRoom = await roomModel.deleteRoomsByPeriod(artPeriod);
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
