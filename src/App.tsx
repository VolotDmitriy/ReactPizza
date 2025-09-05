import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout.tsx';
import Cart from './pages/Cart.tsx';
import FullPizza from './pages/FullPizza.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import './scss/app.scss';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/pizza/:id" element={<FullPizza />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
