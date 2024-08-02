// src/models/roomModel.ts

// This file contains functions to interact with the database using Prisma for
//room-related operations

import { PrismaClient } from '@prisma/client';
import { ArtPeriod, Room } from '@prisma/client';

const prisma = new PrismaClient();

export class RoomModel {

    //Get all rooms

    async getAllRooms() {
        return prisma.room.findMany({
            include: {
                paintings: true,
            }
        });
    }

    // Get a specific room by period
    async getRoomByPeriod(period: ArtPeriod): Promise<Room | null> {
        return prisma.room.findFirst({
            where: { period },
        })
    }


    // Create a new room

    async createRoom(data: { name: string; description: string; period: ArtPeriod; }) {
        return prisma.room.create({
            data,
        })
    }

    // Update an existing room

    async updateRoom(period: ArtPeriod, data: { name?: string; description?: string; period?: ArtPeriod; }) {
        const room = await prisma.room.findFirst({
            where: { period }
        })

        if (!room) {
            throw new Error("Room not found");
        }

    }

    // Delete a room
    async deleteRoomsByPeriod(period: ArtPeriod) {
        // Retrieve all rooms matching the given period
        const rooms = await prisma.room.findMany({
            where: { period },
        });

        // Delete each room
        const deletePromises = rooms.map(room =>
            prisma.room.delete({
                where: { id: room.id }, // Assumes `id` is the unique identifier
            })
        );

        // Execute all delete operations
        await Promise.all(deletePromises);

        return { message: `${rooms.length} room(s) deleted.` };
    }
}