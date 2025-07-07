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

const Home = () => {
    const [items, setItems] = React.useState<PizzaBlockProps[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('http://localhost:5000/pizzas')
            .then((res) => res.json())
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
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
