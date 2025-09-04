import qs from 'qs';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories.tsx';
import NotFoundBlock from '../components/NotFoundBlock';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';
import Sort from '../components/Sort.tsx';
import { options } from '../constants/Options.ts';
import {
    selectFilter,
    setActiveCategory,
    setCurrentPage,
} from '../redux/slices/filterSlice.ts';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice.ts';
import type { AppDispatch } from '../redux/store.ts';

const Home = () => {
    const {
        categoryId: activeCategory,
        sort: sortValue,
        currentPage: currentPage,
        searchValue,
    } = useSelector(selectFilter);
    const {
        items,
        itemsPerPage,
        totalCount: maxSize,
        status,
    } = useSelector(selectPizza);

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

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

    const getPizzas = async () => {
        const url = getUrl(currentPage);
        dispatch(fetchPizzas(url));

        window.scrollTo(0, 0);
    };

    React.useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [activeCategory, searchValue, sortValue]);

    React.useEffect(() => {
        getPizzas();
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

            {status === 'error' ? (
                <NotFoundBlock text={'Ошибка при загрузке пицц'} />
            ) : status === 'success' && items.length === 0 ? (
                <NotFoundBlock text={'Пиццы не найдены'} />
            ) : (
                <>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {status === 'loading'
                            ? [...Array(4)].map((_, index) => (
                                  <Skeleton key={index} />
                              ))
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
                </>
            )}
        </div>
    );
};

export default Home;
