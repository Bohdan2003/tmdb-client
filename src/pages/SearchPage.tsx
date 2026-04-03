import {
  Pagination,
} from '@mui/material';
import { FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieGrid from '../components/movie/MovieGrid';
import MovieSearchForm from '../components/movie/MovieSearchForm';
import Title from '../components/shared/Title';
import { useSearchMoviesQuery } from '../store/services/tmdbApi';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = searchParams.get('query') || '';
  const page = Number(searchParams.get('page') || '1');
  const [searchInput, setSearchInput] = useState(queryParams);

  const query = useSearchMoviesQuery(
    { query: queryParams, page },
    { skip: !queryParams }
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextQuery = searchInput.trim();
    const next = new URLSearchParams(searchParams);
    if (nextQuery) {
      next.set('query', nextQuery);
      next.set('page', '1');
    } else {
      next.delete('query');
      next.delete('page');
    }
    setSearchParams(next);
  };

  const onSearchInputChange = (nextValue: string) => {
    setSearchInput(nextValue);
    if (nextValue !== '') {
      return;
    }
    const next = new URLSearchParams(searchParams);
    next.delete('query');
    next.delete('page');
    setSearchParams(next);
  };

  const onPageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  return (
    <section className="py-10">
      <div className="container">
        <Title
          title="Search Movies"
          subtitle="Search by movie title and save what you like to favorites."
        />
        <MovieSearchForm
          className="mt-5"
          value={searchInput}
          onChange={onSearchInputChange}
          onSubmit={onSubmit}
        />
        {queryParams 
          ? 
          <>
            <MovieGrid
              className="mt-5"
              query={query}
              emptyMessage="Nothing found for this search query."
            />
            {
              query.data && query.data?.total_pages > 1 && 
              <div className="flex justify-center mt-5">
                <Pagination
                  page={page}
                  count={query.data?.total_pages}
                  color="primary"
                  onChange={(_, nextPage) => onPageChange(nextPage)}
                />
              </div>
            }
          </>
          : 
          <p className="mt-2 opacity-50">
            Enter a movie title to start searching.
          </p>
        }
      </div>
    </section>
  );
}
