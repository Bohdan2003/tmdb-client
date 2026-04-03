import {
  Button,
  Chip,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Typography,
  useColorScheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetGenresQuery } from '../../store/services/tmdbApi';

export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularity (descending)' },
  { value: 'popularity.asc', label: 'Popularity (ascending)' },
  { value: 'vote_average.desc', label: 'Rating (descending)' },
  { value: 'vote_average.asc', label: 'Rating (ascending)' },
  { value: 'primary_release_date.desc', label: 'Release date (descending)' },
  { value: 'primary_release_date.asc', label: 'Release date (ascending)' },
  { value: 'original_title.asc', label: 'Title (A-Z)' },
  { value: 'original_title.desc', label: 'Title (Z-A)' },
];

interface FiltersBarProps {
  selectedGenreIds: number[];
  sortBy: string;
  ratingRange: [number, number];
  onGenreToggle: (genreId: number) => void;
  onSortChange: (sortBy: string) => void;
  onRatingChange: (range: [number, number]) => void;
  onReset: () => void;
}

export default function FiltersBar({
  selectedGenreIds,
  sortBy,
  ratingRange,
  onGenreToggle,
  onSortChange,
  onRatingChange,
  onReset,
}: FiltersBarProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const genresQuery = useGetGenresQuery();
  const genres = genresQuery.data?.genres ?? [];
  const [sliderValue, setSliderValue] = useState<[number, number]>(ratingRange);

  useEffect(() => {
    setSliderValue(ratingRange);
  }, [ratingRange]);

  useEffect(() => {
    if (sliderValue[0] === ratingRange[0] && sliderValue[1] === ratingRange[1]) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      onRatingChange(sliderValue);
    }, 350);
    return () => window.clearTimeout(timeoutId);
  }, [sliderValue, ratingRange, onRatingChange]);

  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        p: 3,
        borderRadius: '18px',
        bgcolor: isDark ? theme.palette.grey[900] : '#f3f4f6',
        color: 'text.primary',
      })}
    >
      <Typography variant="h6" sx={{ fontSize: 24, fontWeight: 700 }}>
        Filters / Sort
      </Typography>

      <Stack spacing={3} sx={{ mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            label="Sort by"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <FormLabel sx={{ color: 'text.primary', fontWeight: 600 }}>Rating</FormLabel>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {ratingRange[0].toFixed(1)} - {ratingRange[1].toFixed(1)}
            </Typography>
          </Stack>
          <Slider
            value={sliderValue}
            min={0}
            max={10}
            step={0.1}
            onChange={(_, value) => setSliderValue(value as [number, number])}
            valueLabelDisplay="auto"
          />
        </Stack>

        <Stack direction="row" flexWrap="wrap" gap={1}>
          {genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              clickable
              color={selectedGenreIds.includes(genre.id) ? 'primary' : 'default'}
              variant={selectedGenreIds.includes(genre.id) ? 'filled' : 'outlined'}
              onClick={() => onGenreToggle(genre.id)}
            />
          ))}
        </Stack>

        <Button variant="contained" onClick={onReset} sx={{ borderRadius: '999px', width: 'fit-content' }}>
          Reset filters
        </Button>
      </Stack>
    </Paper>
  );
}
