export type Product = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    category: string;
};

export type PortfolioItem = {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    tags: string[];
};

export type CoreOffering = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    order: number;
};

export type OwnerProfile = {
    id: 'owner_profile'; // Singleton document
    name: string;
    title: string;
    bio1: string;
    bio2: string;
    imageUrl: string;
};

export type SiteMedia = {
    id: string; // e.g. 'hero-background'
    name: string; // e.g. 'Hero Background Image'
    description: string; // e.g. 'The main background image for the homepage hero section.'
    imageUrl: string;
};
    
    