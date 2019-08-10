export interface PRODUCT {
    code: string;
    name: string;
    category: number;
    group: string;
    description: string;
    min_quantity: number;
    warehouse: string;
    quantity: number;
    total_price: number;
    price: number;
    photo: Array<string>;
    tags: Array<string>;
}
