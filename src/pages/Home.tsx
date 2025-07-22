import * as React from 'react';
import Categories from '../components/Categories.tsx';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';
import Sort from '../components/Sort.tsx';

interface PizzaBlockProps {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}

export interface OptionsProps {
    name: string;
    sortProperty: string;
    sortOrder: 'asc' | 'desc';
}

const Home = ({ searchValue }: { searchValue: string }) => {
    const [items, setItems] = React.useState<PizzaBlockProps[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [sortValue, setSortValue] = React.useState(0);
    const [activeCategory, setActiveCategory] = React.useState(0);

    const options: OptionsProps[] = [
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
    const getUrl = (): string => {
        const category =
            activeCategory !== 0 ? `?category=${activeCategory}&` : '?';
        const sortBy = `_sort=${options[sortValue].sortProperty}`;
        const orderBy = `&_order=${options[sortValue].sortOrder}`;
        const filterItems = `${searchValue ? '&title_like=' + encodeURIComponent(searchValue) : ''}`;

        const url = `http://localhost:5000/pizzas${category}${sortBy}${orderBy}${filterItems}`;
        return url;
    };

    React.useEffect(() => {
        setIsLoading(true);

        const url = getUrl();
        console.log(url);
        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [activeCategory, sortValue, searchValue]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={activeCategory}
                    onClickCategory={setActiveCategory}
                />
                <Sort
                    value={sortValue}
                    onClickSort={setSortValue}
                    options={options}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...Array(6)].map((_, index) => <Skeleton key={index} />)
                    : items.map((pizza) => (
                          <PizzaBlock key={pizza.id} {...pizza} />
                      ))}
            </div>
        </div>
    );
};

export default Home;
