import type { Movie } from '../types/Movie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };
  
  return (
    <div 
      className="relative cursor-pointer transition-transform duration-200 hover:scale-105 block"
      style={{ 
        aspectRatio: '2/3',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <img
        src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : '/placeholder-movie.jpg'}
        alt={movie.title}
        className="w-full h-full object-cover"
        style={{
          filter: isHovered ? 'blur(4px)' : 'none',
          transition: 'filter 0.3s ease'
        }}
      />
      
      {isHovered && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px',
            textAlign: 'center',
            zIndex: 10
          }}
        >
          <h3 
            style={{ 
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '12px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            {movie.title}
          </h3>
          <p 
            style={{ 
              color: 'white',
              fontSize: '12px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}