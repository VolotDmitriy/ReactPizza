import axios, { type AxiosResponse } from 'axios';
import qs from 'qs';
import * as React from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../App.tsx';
import Categories from '../components/Categories.tsx';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';
import Sort from '../components/Sort.tsx';
import { options } from '../constants/Options.ts';
import type { IPizzaBlock } from '../constants/types&Interfaces.ts';
import {
    setActiveCategory,
    setCurrentPage,
} from '../redux/slices/filterSlice.ts';
import type { AppDispatch, RootState } from '../redux/store.ts';

const Home = () => {
    const {
        categoryId: activeCategory,
        sort: sortValue,
        currentPage: currentPage,
    } = useSelector((state: RootState) => state.filter);

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { searchValue } = useContext(SearchContext);

    const [isLoading, setIsLoading] = React.useState(true);
    const [items, setItems] = React.useState<IPizzaBlock[]>([]);
    const [itemsPerPage] = React.useState(4);
    const [maxSize, setMaxSize] = React.useState(1);

    const onClickCategory = (id: number) => {
        dispatch(setActiveCategory(id));
    };

    const getUrl = (page: number): string => {
        const params: Record<string, string> = {
            _sort: sortValue.sortProperty,
            _order: sortValue.sortOrder,
            _page: String(page),
            _limit: String(itemsPerPage),
        };
        if (activeCategory !== 0) params.category = String(activeCategory);
        if (searchValue) params.title_like = searchValue;

        const queryString = new URLSearchParams(params).toString();
        return `http://localhost:5000/pizzas?${queryString}`;
    };
    const getMaxPage = (response: AxiosResponse) => {
        const countOfItems = response.headers['x-total-count'];
        if (countOfItems) {
            const count = parseInt(countOfItems, 10);
            const maxPages = Math.ceil(count / itemsPerPage);
            setMaxSize(maxPages);
        } else setMaxSize(1);
    };

    const fetchPizzas = async () => {
        setIsLoading(true);
        const url = getUrl(currentPage);
        try {
            const res = await axios.get(url);
            getMaxPage(res);
            setItems(res.data);
        } catch (err) {
            console.log('Error fetch pizzas', err);
        } finally {
            setIsLoading(false);
        }

        window.scrollTo(0, 0);
    };

    React.useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [activeCategory, searchValue, sortValue]);

    React.useEffect(() => {
        fetchPizzas();
    }, [currentPage, activeCategory, sortValue, searchValue]);

    React.useEffect(() => {
        const queryString = qs.stringify({
            category: activeCategory,
            _sort: sortValue.sortProperty,
            _page: currentPage,
        });
        navigate(`?${queryString}`);
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
                setCurrentPage={(page: number) =>
                    dispatch(setCurrentPage(page))
                }
            />
        </div>
    );
};

export default Home;
