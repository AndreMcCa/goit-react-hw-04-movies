import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {fetchReviews} from '../../services/apiServices'
import s from './Reviews.module.css'

export default function Reviews({id}) {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews(id).then(setReviews);
    }, [id])

    return (
        <div className={s.reviews}>
                {reviews.length !== 0 &&
                    <ul className={s.list}>
                        {reviews.map(({id, author, content}) => 
                            <li key={id} className={s.item}>
                                <h3 className={s.author}>{author}</h3>
                                <p className={s.text}>{content}</p>
                            </li>
                        )}
                    </ul>
                }
            
                {reviews.length === 0 &&  <h1 className={s.errorTitle}>No data</h1>}  
        </div>
    )

}

Reviews.propTypes = {
    id: PropTypes.string.isRequired,
}