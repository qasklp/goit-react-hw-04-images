import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './Searchbar.module.css'

export const Searchbar = ({ onSubmit }) => {
    const [request, setRequest] = useState('');

    const handleChange = e => {
        setRequest(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ request });
        setRequest('');
    }

    return <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
            <button type="submit" className={styles.SearchFormButton}>
                <span className={styles.SearchFormButtonLabel}>Search</span>
            </button>

            <input
                className={styles.SearchFormInput}
                name="request"
                value={request}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={handleChange}
                required
            />
        </form>
    </header>;
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}