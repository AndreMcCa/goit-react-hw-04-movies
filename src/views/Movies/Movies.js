import {useState, useEffect} from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from '../../components/Form/Form';
import MovieCard from '../../components/MovieCard/MovieCard';
import Button from '../../components/Button'
import {fetchMovie} from '../../services/apiServices';
import s from './Movies.module.css'

export default function Movies() {

    const {url} = useRouteMatch();

    const [searchQuery, setSearchQuery] = useState('');
    const [currentSearch, setCurrentSearch] = useState('')
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if(currentSearch !== searchQuery) {
            setCurrentSearch(searchQuery)
            setMovies([]);
            setPage(1);
        }

    }, [currentSearch, searchQuery])

    useEffect(() => {
        if(currentSearch === '') {
            return
        }

        fetchMovie(currentSearch, page)
        .then(setMovies)
        .catch(errorMsg => {
            toast.error(`${errorMsg}`)
        });;

    }, [currentSearch, page]) 

    function handleFormSubmit(value) {
        setSearchQuery(value);
    }

    function onLoadMore () {
        setPage(prev => prev + 1)
    }

    return (
        <main className={s.main}>
        <Form onSubmit={handleFormSubmit}/>

        {movies.length !== 0 && 
        <>
            <div className={s.box}>
                <h1 className={s.title}>{`Search results for the query "${searchQuery}"`}</h1>
                <div className={s.movies}>
                    {movies.map(movie => {
                    return (
                        <Link key={movie.id} to={`${url}/${movie.id}`}>
                            <MovieCard data={movie} />
                        </Link>
                    )})}
                </div>
            </div>

            <div className={s.loadBox}>
                <Button type="button" className={s.loadMore} onClick={onLoadMore}>Load More</Button>
            </div>
        </>                
        }
        </main>
    )

}