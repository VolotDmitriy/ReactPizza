import * as React from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../App.tsx';
import Categories from '../components/Categories.tsx';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';
import Sort from '../components/Sort.tsx';
import { setActiveCategory } from '../redux/slices/filterSlice.ts';
import type { AppDispatch, RootState } from '../redux/store.ts';

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

const Home = () => {
    const activeCategory = useSelector(
        (state: RootState) => state.filter.categoryId,
    );
    const sortValue = useSelector((state: RootState) => state.filter.sort);
    const dispatch: AppDispatch = useDispatch();

    const { searchValue } = useContext(SearchContext);
    const [isLoading, setIsLoading] = React.useState(true);

    const [items, setItems] = React.useState<PizzaBlockProps[]>([]);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage] = React.useState(4);
    const [maxSize, setMaxSize] = React.useState(1);

    const onClickCategory = (id: number) => {
        dispatch(setActiveCategory(id));
    };

    const getUrl = (page: number): string => {
        const category =
            activeCategory !== 0 ? `?category=${activeCategory}&` : '?';
        const sortBy = `_sort=${sortValue.sortProperty}`;
        const orderBy = `&_order=${sortValue.sortOrder}`;
        const filterItems = `${searchValue ? '&title_like=' + encodeURIComponent(searchValue) : ''}`;

        const pageParam = `&_page=${page}&_limit=${itemsPerPage}`;

        return `http://localhost:5000/pizzas${category}${sortBy}${orderBy}${filterItems}${pageParam}`;
    };
    const getMaxPage = (response: Response) => {
        const countOfItems = response.headers.get('x-total-count');
        if (countOfItems) {
            const count = parseInt(countOfItems, 10);
            const maxPages = Math.ceil(count / itemsPerPage);
            setMaxSize(maxPages);
        } else setMaxSize(1);
    };

    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchValue, sortValue]);

    React.useEffect(() => {
        setIsLoading(true);
        const url = getUrl(currentPage);
        fetch(url)
            .then((res) => {
                getMaxPage(res);
                return res.json();
            })
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [currentPage, activeCategory, sortValue, searchValue]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={activeCategory}
                    onClickCategory={onClickCategory}
                />
                <Sort options={options} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...Array(4)].map((_, index) => <Skeleton key={index} />)
                    : items.map((pizza) => (
                          <PizzaBlock key={pizza.id} {...pizza} />
                      ))}
            </div>
            <Pagination
                currentPage={currentPage}
                maxSize={maxSize}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default Home;
