import {React, useState} from "react";
import './squishCard.scss'
export default function SquishCard({squish, image, name, bio, toggleFavorite, favoriteSquishes }) {
    const isFavorite = favoriteSquishes.includes(squish.id);

    const handleClick = () => {
        if (isFavorite) {
            toggleFavorite(prevFavorites => prevFavorites.filter(id => id !== squish.id));
        } else {
            toggleFavorite(prevFavorites => [...prevFavorites, squish.id]);
        }
    };

    return (
        <main>
            <div className={`card`}>
                <img src={image} alt="hi" />
                <div className="card-content">
                    <h2>{name}</h2>
                    <p>
                        {bio}
                    </p>
                    <a href="#" className="button"  onClick={handleClick}>
                        {favoriteSquishes ? "Choose This Squish?" : "Remove This Squish"}
                        <span className="material-symbols-outlined">
                            arrow_right_alt
                        </span>
                    </a>
                </div>
            </div>
        </main>
    );
}
