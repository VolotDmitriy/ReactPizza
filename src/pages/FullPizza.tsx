import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { IPizzaBlock } from '../constants/types&Interfaces.ts';

const FullPizza = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState<IPizzaBlock>();

    useEffect(() => {
        const fetchPizzaById = async (id: number) => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/pizzas/${id}`,
                );
                console.log(data);
                setItem(data);
            } catch (error) {
                console.log(error);
                navigate('/');
            }
        };

        fetchPizzaById(Number(params.id));
    }, [params]);

    if (!item) {
        return (
            <div className={'container'}>
                <h2>Загрузка ... </h2>
            </div>
        );
    }
    return (
        <div className={'container'}>
            <h2>{item.title}</h2>
            <img src={item.imageUrl} alt={'image'} />
        </div>
    );
};

export default FullPizza;
