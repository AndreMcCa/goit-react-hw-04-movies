import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import MovieCard from '../../components/MovieCard/MovieCard';
import { fetchTrending } from '../../services/apiServices';
import s from './HomePage.module.css';

export default function HomeViews() {
    
    const {url} = useRouteMatch();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        
        fetchTrending().then(r => setMovies(r))
       

    }, [])

    return (
        <main className={s.main}>
            <h1 className={s.title} >Popular today</h1>
            {movies.length !== 0 && 
                <div className={s.popularMovies}>
                {movies.map((movie) => {
                    return (
                        <Link key={movie.id} to={`${url}${movie.id}`}>
                            <MovieCard data={movie}/>
                        </Link>
                    )
                })}
                </div>             
            }
        </main>
    );
}

