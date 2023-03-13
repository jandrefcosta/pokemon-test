import React from 'react';

const Button = ({ text, icon, onClick }) => {

    return (
        <button className={`btn btn--${text ? 'text' : 'icon'}`} onClick={onClick}>
            {text || icon}
        </button>
    )
};

export default Button;
