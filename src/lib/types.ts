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
    