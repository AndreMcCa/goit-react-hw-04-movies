import PropTypes from 'prop-types';

import s from './MovieCard.module.css'

export default function MovieCard({ data }) {

    const { poster_path, title, release_date } = data;

    return (
        <div className={s.moviesItem}>
            <div className={s.poster}>
                <img className={s.image} src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt={title} height={417}></img>
            </div>

            <div className={s.info} >
                <h3 className={s.infoTitle}>{title}</h3>
                <p className={s.infoContainer}>{release_date}</p>
            </div>
        </div>

    )
}

MovieCard.propTypes = {
    data: PropTypes.object.isRequired,
}