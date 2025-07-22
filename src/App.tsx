import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.tsx';
import Cart from './pages/Cart.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import './scss/app.scss';

function App() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="content">
                <Routes>
                    <Route
                        path="/"
                        element={<Home searchValue={searchValue} />}
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
