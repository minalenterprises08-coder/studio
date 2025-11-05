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
}
