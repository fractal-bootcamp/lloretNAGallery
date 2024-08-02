// src/models/roomModel.ts

// This file contains functions to interact with the database using Prisma for
//room-related operations

import { PrismaClient } from '@prisma/client';
import { ArtPeriod } from '@prisma/client';

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

    // Get a specific room by ID
    async getRoomById(id: string) {
        return prisma.room.findUnique({
            where: { id },
        })
    }


    // Create a new room

    async createRoom(data: { name: string; description: string; period: ArtPeriod; }) {
        return prisma.room.create({
            data,
        })
    }

    // Update an existing room

    async updateRoom(id: string, data: { name?: string; description?: string; period?: ArtPeriod; }) {
        return prisma.room.update({
            where: { id },
            data
        })
    }

    // Delete a room

    async deleteRoom(id: string) {
        return prisma.room.delete({
            where: { id },
        })
    }
}