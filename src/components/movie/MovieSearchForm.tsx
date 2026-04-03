import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField } from '@mui/material';
import { FormEvent } from 'react';
import { cn } from '../../utils/cn';

type MovieSearchFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
};

export default function MovieSearchForm({
  value,
  onChange,
  onSubmit,
  className,
}: MovieSearchFormProps) {
  return (
    <form onSubmit={onSubmit} className={cn('flex flex-col gap-3 md:flex-row max-w-[700px]', className)}>
      <TextField
        type="search"
        fullWidth
        value={value}
        label="Movie title"
        placeholder="Inception"
        onChange={(event) => onChange(event.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '2rem',
            backgroundColor: 'background.paper',
          },
        }}
      />
      <Button
        disabled={!value}
        type="submit"
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: '2rem',
          '&.Mui-disabled': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            opacity: 0.5,
          },
        }}
      >
        Search
      </Button>
    </form>
  );
}
