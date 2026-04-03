import { Route, Routes } from 'react-router-dom';
import CategoryPage from '../pages/CategoryPage';
import DetailsPage from '../pages/DetailsPage';
import FavoritesPage from '../pages/FavoritesPage';
import FilteredPage from '../pages/FilteredPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import SearchPage from '../pages/SearchPage';
import { routes } from './routes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.home} element={<HomePage />} />
      <Route path={routes.categories} element={<CategoryPage />} />
      <Route path={routes.filtered} element={<FilteredPage />} />
      <Route path={routes.search} element={<SearchPage />} />
      <Route path={routes.favorites} element={<FavoritesPage />} />
      <Route path={routes.details} element={<DetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
