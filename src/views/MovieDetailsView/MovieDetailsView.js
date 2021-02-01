import {lazy, Suspense} from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useParams, Route, useRouteMatch } from 'react-router-dom';

import { fetchId } from '../../services/apiServices';
import s from './MovieDetailsView.module.css';

const Cast = lazy(() => import('../../components/Cast/Cast' /* webpackChunkName: "Cast"*/));
const Reviews = lazy(() => import('../../components/Reviews/Reviews' /* webpackChunkName: "Reviews"*/));


export default function MovieDetailsView() {
    
    const { movieId } = useParams();
    const { url } = useRouteMatch();

    const [movieDetails, setMovieDetails] = useState(null);
    
    useEffect(() => {
        fetchId(movieId).then(r => setMovieDetails(r))
    }, [movieId])
    
    return (
        <>
        { movieDetails && 
        <article>
            <div  className={s.movieDetails}>
            <div className={s.posterBox}>
                <img className={s.posterImage} src={`https://image.tmdb.org/t/p/w1280${movieDetails.poster_path}`} alt={movieDetails.title} width={640}></img>
            </div>

            <div className={s.infoBox}>
                <h1 className={s.title}>{movieDetails.title}</h1>
                <ul className={s.infoItems}> 
                    <li>
                        <p className={s.description}>Vote / Votes</p>
                        <p>
                            <span className={s.vote}>{movieDetails.vote_average}</span>
                            <span> / </span>
                            <span>{movieDetails.vote_count}</span>
                        </p>        
                    </li>
                    <li>
                        <p className={s.description}>Popularity</p>
                        <p>{movieDetails.popularity}</p>
                    </li>
                    <li>
                        <p className={s.description}>Original Title</p>
                        <p>{movieDetails.original_title}</p>
                    </li>
                    <li>
                        <p className={s.description}>Genre</p>
                        <p className={s.genre}>
                            {movieDetails.genres.map(g => <span key={g.name}>{g.name}</span>)}
                        </p>
                    </li>
                </ul>
            
                <p className={s.aboutTitle}>About</p>
                <p className={s.about}>{movieDetails.overview}</p>
            </div>
        </div>
            <div>
                <div className={s.links}>
                    <NavLink className={s.button} activeClassName={s.activeBtn}  key={'cast'} to={`${url}/cast`}>Cast</NavLink>
                    <NavLink className={s.button} activeClassName={s.activeBtn}  key={'reviews'} to={`${url}/reviews`}>Reviews</NavLink>
                </div>
                <div>
                <Suspense fallback={<h1>...</h1>}>
                    <Route path={`${url}/cast`}>
                        <Cast id={movieId} />
                    </Route>
                    <Route path={`${url}/reviews`}>
                        <Reviews id={movieId}/>
                    </Route>
                </Suspense>
                </div>
            </div>
        </article>}
        </>
    );
}