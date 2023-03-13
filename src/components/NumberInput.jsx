import React from 'react';
import chevron from '../assets/images/chevronDownBlack.png';

const NumberInput = ({ className, label, placeholder, name, suffix, value, onChange }) => {


    function _onChange(e) {
        const { target: { value, name } } = e;

        onChange({ name, value })
    }

    function increase() {
        onChange({ name, value: value + 1 })
    }

    function decrease() {
        onChange({ name, value: value - 1 })
    }

    return (
        <div className={`${className} input__container`}>
            {label && (
                <label className="input__label">
                    {label}
                </label>
            )}
            <div className="input__number">
                <input className="input" type="number" placeholder={placeholder} name={name} onChange={_onChange} value={parseInt(value)} />
                {suffix && (
                    <p className="input__suffix">
                        {suffix}
                    </p>
                )}
                <div className="input__btns">
                    <img src={chevron} className="input__increase" alt="Mais" onClick={increase} />
                    <img src={chevron} className="input__decrease" alt="Menos" onClick={decrease} />
                </div>
            </div>
        </div>
    )
};

export default NumberInput;
