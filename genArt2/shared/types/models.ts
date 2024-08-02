// User model type
export interface User {
    id: string;
    name: string;
    email: string;
    // clerkId: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    avatarUrl?: string;
}

// Painting model type
export interface Painting {
    id: string;
    title: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    isPublished: boolean;
    isDeleted: boolean;
    prompt: string;
    negativePrompt?: string;
    seed?: number;
    imageUrl: string;
    frameTexture: string;
    frameColor?: string;
    roomId: string;
    creatorId: string;
}

// Room model type
export interface Room {
    id: string;
    name: string;
    description?: string;
    period: ArtPeriod;
    paintings: Painting[];
}

export type Rooms = Room[];


// Enum for Art Period
export enum ArtPeriod {
    HELLENISTIC = 'HELLENISTIC',
    RENAISSANCE = 'RENAISSANCE',
    BAROQUE = 'BAROQUE',
    NEOCLASSICISM = 'NEOCLASSICISM',
    REALISM = 'REALISM',
    VANGUARDISM = 'VANGUARDISM',
}
