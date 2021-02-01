import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {fetchCredits} from '../../services/apiServices'
import mask from '../../images/mask.jpg'

import s from './Cast.module.css'

export default function Cast({ id }) {
    
    const [cast, setCast] = useState([]);

    useEffect(() => {
        fetchCredits(id).then(setCast);
    }, [id])

    return (
        <div className={s.cast}>
            {cast.length !== 0 && 
                <ul className={s.items}>
                    {cast.map(({id, profile_path, name}) => 
                    <li key={`${id}${name}`} className={s.item}>
                        <img className={s.image} src={`${profile_path ? `https://image.tmdb.org/t/p/w500/${profile_path}` : mask}`} alt={name}/>
                        <p className={s.title}>{name}</p>
                    </li>)}
                </ul>
            }

            {cast.length === 0 &&  <h1 className={s.errorTitle}>No data</h1>}  
        </div>
    );   
}

Cast.propTypes = {
    id: PropTypes.string.isRequired,
}