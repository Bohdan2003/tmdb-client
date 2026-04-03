import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Card, IconButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keys } from '../../config/keys';
import { getMovieDetailsRoute } from '../../router/routes';
import { toggleFavorite } from '../../store/features/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { Movie } from '../../types/tmdb';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((item) => item.id === movie.id)
  );
  const posterSrc = movie.poster_path
    ? `${keys.tmdbImageBaseUrl}${movie.poster_path}`
    : 'https://placehold.co/500x750?text=No+Poster';
  const voteAverage = Number.isFinite(movie.vote_average) ? movie.vote_average : 0;
  const ratingColor = voteAverage >= 7 ? '#16a34a' : voteAverage < 4 ? '#ef4444' : '#facc15';
  const ratingTextColor = voteAverage >= 7 || voteAverage < 4 ? '#ffffff' : '#111827';

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        overflow: 'visible',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 180ms ease',
        },
      }}
    >
      <button onClick={() => navigate(getMovieDetailsRoute(movie.id))}>
        <Box sx={{ position: 'relative' }}>
          <Box
            component="img"
            src={posterSrc}
            alt={movie.title}
            sx={{
              width: '100%',
              aspectRatio: '2 / 3',
              borderRadius: '22px',
              objectFit: 'cover',
              display: 'block',
              backgroundColor: '#e5e7eb',
            }}
          />
          <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                dispatch(toggleFavorite(movie));
              }}
              aria-label="toggle favorite"
              className="movie-like-button"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 40,
                height: 40,
                bgcolor: 'rgba(17, 24, 39, 0.75)',
                color: isFavorite ? '#ef4444' : '#ffffff',
                opacity: isFavorite ? 1 : 0,
                transform: isFavorite ? 'scale(1)' : 'scale(0.9)',
                transition: 'opacity 180ms ease, transform 180ms ease',
                '&:hover': {
                  bgcolor: 'rgba(17, 24, 39, 0.9)',
                },
              }}
            >
              {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Box
            sx={{
              position: 'absolute',
              right: 12,
              bottom: 12,
              width: 40,
              height: 40,
              borderRadius: '999px',
              bgcolor: ratingColor,
              color: ratingTextColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography component="span" sx={{ fontWeight: 700, fontSize: 20, lineHeight: 1 }}>
              {voteAverage.toFixed(1)}
            </Typography>
          </Box>
        </Box>
        <Typography
          component="h3"
          sx={{
            mt: 2,
            fontWeight: 500,
            color: 'text.primary',
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.8rem',
          }}
        >
          {movie.title}
        </Typography>
      </button>
    </Card>
  );
}
