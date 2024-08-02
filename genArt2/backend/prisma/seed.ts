import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const s3 = new S3Client({
    region: 'us-east-2', // e.g., 'us-west-2'
    credentials: {
        accessKeyId: 'your-access-key-id',
        secretAccessKey: 'your-secret-access-key'
    }
});

// Placeholder image URL for direct use
const placeholderImageUrl = "https://via.placeholder.com/150";

async function uploadImageToS3(imageUrl: string, key: string): Promise<string> {
    const uploadParams = {
        Bucket: 'lloret-neue-alt-gallery',
        Key: key,
        Body: imageUrl,
        ContentType: 'image/jpeg', // Adjust based on your image type
    };

    try {
        await s3.send(new PutObjectCommand(uploadParams));
        return `https://${uploadParams.Bucket}.s3.amazonaws.com/${key}`;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

async function main() {
    // Create Users
    const users = Array.from({ length: 10 }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatar(),
    }));

    await prisma.user.createMany({
        data: users,
    });

    console.log('Users created.');

    // Create Rooms based on ArtPeriod enum
    const artPeriods = [
        'HELLENISTIC',
        'RENAISSANCE',
        'BAROQUE',
        'NEOCLASSICISM',
        'REALISM',
        'VANGUARDISM'
    ];

    const rooms = artPeriods.map(period => ({
        name: period,
        description: faker.lorem.sentence(),
        period: period as 'HELLENISTIC' | 'RENAISSANCE' | 'BAROQUE' | 'NEOCLASSICISM' | 'REALISM' | 'VANGUARDISM',
    }));

    await prisma.room.createMany({
        data: rooms,
    });

    console.log('Rooms created.');

    // Fetch created users and rooms
    const createdUsers = await prisma.user.findMany();
    const createdRooms = await prisma.room.findMany();

    if (createdUsers.length === 0 || createdRooms.length === 0) {
        throw new Error('No users or rooms found to associate with paintings.');
    }

    // Create Paintings
    const paintingPromises = Array.from({ length: 20 }).map(async () => {
        const creatorId = faker.helpers.arrayElement(createdUsers).id;
        const roomId = faker.helpers.arrayElement(createdRooms).id;

        // Use placeholder image directly
        const imageUrl = placeholderImageUrl;

        // You could also upload the placeholder image if needed:
        // const localImagePath = path.join(__dirname, 'sample.jpg');
        // const imageUrl = await uploadImageToS3(localImagePath, `paintings/${faker.string.uuid()}.jpg`);

        return prisma.painting.create({
            data: {
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                prompt: faker.lorem.sentence(),
                negativePrompt: faker.lorem.sentence(),
                seed: faker.number.int({ min: 0, max: 2147483647 }), // Ensure seed is within valid range for Int
                imageUrl,
                frameTexture: faker.word.adjective(),
                frameColor: faker.color.human(),
                roomId,
                creatorId,
            },
        });
    });

    await Promise.all(paintingPromises);

    console.log('Paintings created.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
