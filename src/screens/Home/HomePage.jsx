import React from 'react';
import PokemonLogo from 'assets/images/pokemonLogo.png';
import Button from 'components/Button';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    function HandleStart() {        
        navigate('/map');
    }

    return (
        <div className='home'>
            <div className='home_container'>
                <img src={PokemonLogo} />
                <Button text="START" onClick={HandleStart} />
            </div>
        </div >
    )
};

export default HomePage;
