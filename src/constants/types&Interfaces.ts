export type SizeVariant = 0 | 1 | 2;
export const sizeVariants: Record<SizeVariant, number> = {
    0: 26,
    1: 30,
    2: 40,
};

export interface IPizzaBlock {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}

export interface CartBlock {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    size: number;
    type: number;
}

export interface ICartObjectProps {
    totalPrice: number;
    items: {
        quantity: number;
        item: CartBlock;
    }[];
}
