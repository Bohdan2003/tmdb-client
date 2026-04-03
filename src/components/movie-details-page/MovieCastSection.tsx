import { Alert, Skeleton } from '@mui/material';
import { keys } from '../../config/keys';
import { getTmdbUserErrorMessage } from '../../store/services/tmdbBaseQuery';
import { useGetMovieCreditsQuery } from '../../store/services/tmdbApi';

interface MovieCastSectionProps {
  movieId?: string;
}

export default function MovieCastSection({ movieId }: MovieCastSectionProps) {
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;
  const { data, isLoading, isError, error } = useGetMovieCreditsQuery(parsedMovieId, { skip: !isValidMovieId });

  if (!isValidMovieId) {
    return null;
  }
  const cast = data?.cast.slice(0, 6);

  return (
    <section className="pb-10">
      <div className="container">
        <h2 className="text-3xl font-semibold">Cast</h2>
        {
          isLoading 
            ? 
            <>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="pointer-events-none text-center">
                    <Skeleton
                      variant="circular"
                      sx={{
                        width: 128,
                        height: 128,
                      }}
                    />
                    <p className="mt-3">
                      <Skeleton variant="text" width="70%" />
                    </p>
                    <p className="mt-1 opacity-70">
                      <Skeleton variant="text" width="55%" />
                    </p>
                  </div>
                ))}
              </div>
            </>
            : 
            isError 
              ? 
              <div className="py-5">
                <Alert severity="error">
                  {getTmdbUserErrorMessage(error) ?? 'Failed to load cast.'}
                </Alert>
              </div>
              :
              !cast || cast.length === 0
                ?
                <div className="py-5">
                  <Alert severity="info">No cast found.</Alert>
                </div>
                :
                <> 
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {cast.map((member) => {
                      const profileSrc = member.profile_path
                        ? `${keys.tmdbImageBaseUrl}${member.profile_path}`
                        : 'https://placehold.co/300x300?text=No+Photo';

                      return (
                        <div key={member.id} className="text-center">
                          <img
                            src={profileSrc}
                            alt={member.name}
                            className="mx-auto h-32 w-32 rounded-full object-cover"
                          />
                          <p className="mt-3 text-lg font-medium">{member.name}</p>
                          <p className="mt-1 text-sm opacity-70">{member.character}</p>
                        </div>
                      );
                    })}
                  </div>
              </>
        }
      </div>
    </section>
  );
}
