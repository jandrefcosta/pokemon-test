import React from 'react';

const TextInput = ({ className, label, placeholder, name, onChange, value}) => {

    return (
        <div className={`${className} input__container`}>
            {label && (
                <label className="input__label">
                    {label}
                </label>
            )}
            <input className="input" type="text" placeholder={placeholder} name={name} onChange={onChange} value={value} />
        </div>
    )
};

export default TextInput;
