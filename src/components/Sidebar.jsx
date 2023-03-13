import React, { useEffect, useState } from 'react';
import Button from './Button';
import plusIcon from '../assets/images/plus.png';
import camera from 'assets/images/camera.png';

import { usePokemonBelt } from 'context/pokebelt';

const Sidebar = ({ onEditPokemon, onCreateCustom }) => {

    const pokemonBelt = usePokemonBelt()

    const [pokemons, setPokemons] = useState();
    const [pokeBallEmpty, setPokeBallEmpty] = useState(6);

    useEffect(() => {
        if (pokemonBelt.belt) {
            setPokeBallEmpty(6 - pokemonBelt.belt.pokemons.length)
            setPokemons(pokemonBelt.belt.pokemons)
        }

    }, [pokemonBelt])

    function HandleEditPokemon(pokemon) {
        if (pokemon.custom) {
            onCreateCustom(pokemon)
        }
        else onEditPokemon(pokemon);
    }

    function HandleCreateCustom() {
        onCreateCustom();
    }

    return (
        <div className="sidebar">
            {pokemons && pokemons.map((item, index) => {
                return (
                    <div className="sidebar__item with-pokemon" onClick={() => HandleEditPokemon(item)} key={index}>
                        <img src={item.custom ? camera : item.sprites.front_default} />
                    </div>
                )
            })}
            {Array(pokeBallEmpty).fill(null).map((item, index) => {
                return (
                    <div className="sidebar__item" key={index}> ? </div>
                )
            })}

            <Button icon={<img src={plusIcon} alt="+" />} onClick={HandleCreateCustom} />
        </div>
    );
};

export default Sidebar;
