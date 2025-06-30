import * as React from 'react';
import Categories from './components/Categories.tsx';
import Header from './components/Header.tsx';
import PizzaBlock from './components/PizzaBlock/PizzaBlock.tsx';
import Skeleton from './components/PizzaBlock/Skeleton.tsx';
import Sort from './components/Sort.tsx';
import './scss/app.scss';

interface PizzaBlockProps {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}

function App() {
    const [items, setItems] = React.useState<PizzaBlockProps[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('http://localhost:5000/pizzas')
            .then((res) => res.json())
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {isLoading
                            ? [...Array(6)].map((_, index) => (
                                  <Skeleton key={index} />
                              ))
                            : items.map((pizza) => (
                                  <PizzaBlock key={pizza.id} {...pizza} />
                              ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
