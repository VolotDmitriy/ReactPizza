import debounce from 'lodash.debounce';
import { type ChangeEvent, useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice.ts';
import styles from './Search.module.scss';

const Search = () => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const debounceFunc = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 1000),
        [],
    );

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
        debounceFunc(e.currentTarget.value);
    };

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 50 50"
            >
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
            {value && (
                <svg
                    className={styles.clearIcon}
                    onClick={() => {
                        dispatch(setSearchValue(''));
                        setValue('');
                        inputRef.current?.focus();
                    }}
                    width="800px"
                    height="800px"
                    viewBox="0 0 512 512"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>cancel</title>
                    <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                    >
                        <g
                            id="work-case"
                            fill="#000000"
                            transform="translate(91.520000, 91.520000)"
                        >
                            <polygon
                                id="Close"
                                points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
                            ></polygon>
                        </g>
                    </g>
                </svg>
            )}
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => onChangeInput(e)}
                className={styles.input}
                type="text"
                placeholder="Поиск ..."
            />
        </div>
    );
};

export default Search;
