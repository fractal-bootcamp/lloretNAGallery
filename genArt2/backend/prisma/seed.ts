import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Define the public domain image URLs for each art period
const imageUrls = {
    HELLENISTIC: [
        'https://upload.wikimedia.org/wikipedia/commons/a/a6/Laoco%C3%B6n_and_his_sons_group.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/e/ed/Apollo_Belvedere.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/29/Sanctuary_of_Asclepius%2C_Pergamon.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/e/e2/Three_Graces_Louvre_Ma287.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/a/af/V%C3%A9nus_de_Milo_-_Mus%C3%A9e_du_Louvre_AGER_LL_299_%3B_N_527_%3B_Ma_399.jpg',
    ],
    RENAISSANCE: [
        'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/0/08/Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/e/e4/Leonardo_Da_Vinci_-_Vergine_delle_Rocce_%28Louvre%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg',
    ],
    BAROQUE: [
        'https://upload.wikimedia.org/wikipedia/commons/3/34/The_Entombment_of_Christ-Caravaggio_%28c.1602-3%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/e/e6/Museo_borghese%2C_sala_del_gladiatore%2C_g.l._bernini%2C_verit%C3%A0_svelata%2C_1645-52%2C_02.JPG',
        'https://upload.wikimedia.org/wikipedia/commons/b/bb/The_Conversion_of_Saint_Paul-Caravaggio_%28c._1600-1%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5a/The_Night_Watch_-_HD.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/36/Rape_of_Prosepina_September_2015-3a.jpg',
    ],
    NEOCLASSICISM: [
        'https://upload.wikimedia.org/wikipedia/commons/8/8c/David_-_The_Death_of_Socrates.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/8c/David_-_The_Death_of_Socrates.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/8c/David_-_The_Death_of_Socrates.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/8c/David_-_The_Death_of_Socrates.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/8c/David_-_The_Death_of_Socrates.jpg',
    ],
    REALISM: [
        'https://upload.wikimedia.org/wikipedia/commons/4/46/Gustave_Courbet_-_The_Stonebreakers_-_WGA05457.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/46/Gustave_Courbet_-_The_Stonebreakers_-_WGA05457.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/46/Gustave_Courbet_-_The_Stonebreakers_-_WGA05457.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/46/Gustave_Courbet_-_The_Stonebreakers_-_WGA05457.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/46/Gustave_Courbet_-_The_Stonebreakers_-_WGA05457.jpg',
    ],
    VANGUARDISM: [
        'https://www.wikiart.org/en/salvador-dali/the-persistence-of-memory-1931',
        'https://www.wikiart.org/en/salvador-dali/the-persistence-of-memory-1931',
        'https://www.wikiart.org/en/salvador-dali/the-persistence-of-memory-1931',
        'https://www.wikiart.org/en/salvador-dali/the-persistence-of-memory-1931',
        'https://www.wikiart.org/en/salvador-dali/the-persistence-of-memory-1931',
    ],
};

async function main() {
    // Clean up existing data
    await prisma.painting.deleteMany({});
    await prisma.room.deleteMany({});
    await prisma.user.deleteMany({});

    // Create a user if none exists
    const user = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            name: 'Admin',
            email: 'admin@example.com',
            avatarUrl: null,
        },
    });

    // Create rooms if they don't exist
    const existingRooms = await prisma.room.findMany({
        select: { period: true },
    });
    const existingPeriods = new Set(existingRooms.map(room => room.period));

    for (const period of Object.keys(imageUrls) as Array<ArtPeriod>) {
        if (!existingPeriods.has(period)) {
            await prisma.room.create({
                data: {
                    period: period,
                    name: `${period} Room`,  // Default name for the room
                },
            });
        }
    }

    // Fetch all rooms from the database
    const rooms = await prisma.room.findMany({
        where: {
            period: {
                in: Object.keys(imageUrls) as Array<ArtPeriod>,
            },
        },
    });

    console.log('Fetched rooms:', rooms); // Log the fetched rooms

    const roomMap = new Map<string, string>();
    rooms.forEach(room => roomMap.set(room.period, room.id));

    // Function to create paintings
    const createPaintings = async (period: ArtPeriod) => {
        const roomId = roomMap.get(period);
        if (!roomId) {
            console.error(`Room not found for period: ${period}`);
            return;
        }

        const paintings = imageUrls[period];
        for (const imageUrl of paintings) {
            await prisma.painting.create({
                data: {
                    title: faker.lorem.words(3),
                    description: faker.lorem.sentence(),
                    prompt: faker.lorem.sentence(),
                    negativePrompt: faker.lorem.sentence(),
                    seed: faker.number.int({ min: 1, max: 100000 }),
                    imageUrl: imageUrl,
                    frameTexture: 'wood',
                    frameColor: 'brown',
                    roomId: roomId,
                    creatorId: user.id,
                },
            });
        }
    };

    for (const period of Object.keys(imageUrls) as Array<ArtPeriod>) {
        await createPaintings(period);
    }

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
