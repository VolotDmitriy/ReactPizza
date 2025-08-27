export interface OptionsProps {
    name: string;
    sortProperty: string;
    sortOrder: 'asc' | 'desc';
}

export const options: OptionsProps[] = [
    {
        name: 'популярности (возрастанию)',
        sortProperty: 'rating',
        sortOrder: 'asc',
    },
    {
        name: 'популярности (убыванию)',
        sortProperty: 'rating',
        sortOrder: 'desc',
    },
    { name: 'цене (возрастанию)', sortProperty: 'price', sortOrder: 'asc' },
    { name: 'цене (убыванию)', sortProperty: 'price', sortOrder: 'desc' },
    {
        name: 'алфавиту (возрастанию)',
        sortProperty: 'title',
        sortOrder: 'asc',
    },
    {
        name: 'алфавиту (убыванию)',
        sortProperty: 'title',
        sortOrder: 'desc',
    },
];
