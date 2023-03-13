import { Fragment, useEffect, useState } from "react";

import { useTranslation } from 'react-i18next';
import { usePokemonBelt } from "context/pokebelt";


import pokeball from 'assets/images/pokeball.png';
import editIcon from 'assets/images/editIcon.png';
import closeIcon from 'assets/images/close.png';
import checkIcon from 'assets/images/checkIcon.png';
import TextInput from "./TextInput";
import Button from "./Button";

function PokemonCard({ pokemon, closeCard, fullStats }: any) {

    const { t } = useTranslation();

    const pokemonBelt = usePokemonBelt()
    const [hp, setHP] = useState("");

    const [edit, setEdit] = useState(false);
    const [pokemonEdit, setPokemonEdit] = useState<any>({});

    useEffect(() => {
        setHP(pokemon.stats.find((item: any) => item.stat.name === "hp")?.base_stat || 0)

        if (fullStats) {
            setPokemonEdit({ ...pokemon })
        }
    }, [pokemon])

    function HandleCatch() {
        const resp = pokemonBelt.catchPokemon(pokemon);
        if (resp) {
            closeCard();
        }
    }

    function HandleRelease() {
        pokemonBelt.releasePokemon(pokemon);
        closeCard();
    }

    function HandleEditName(value: boolean) {
        pokemonBelt.catchPokemon(pokemonEdit);
        setEdit(value)
    }

    function HandleEditNameCancel() {
        setPokemonEdit({ ...pokemon })
        HandleEditName(false);
    }

    function HandleChange(e: any) {
        const { value, name } = e.target;
        setPokemonEdit((prevProps: any) => {
            return { ...prevProps, [name]: value }
        })
    }

    return (
        <Fragment>
            <div className="pokemoncard_container">
                <div className="pokemoncard_container_content">

                    <div className="pokemoncard_container__sprite">
                        <img src={pokemon.sprites.front_default} />
                    </div>
                    <div className="pokemoncard_container__infos">
                        {!edit && <h2 className="pokemoncard_container__infos-name">{fullStats ? pokemonEdit.name : pokemon.name}{fullStats && <img src={editIcon} onClick={() => HandleEditName(true)} />}</h2>}
                        {edit &&
                            <div className="pokemoncard_container__infos-name-edit">
                                <TextInput className="" label="" placeholder="Nome" name="name"
                                    value={pokemonEdit.name} onChange={(e: any) => { HandleChange(e) }}
                                />
                                <Button icon={<img src={closeIcon} />} onClick={() => { HandleEditNameCancel() }} text="" />
                                <Button icon={<img src={checkIcon} />} onClick={() => { HandleEditName(false) }} text="" />
                            </div>
                        }
                        <div className="pokemoncard_container__infos_details">
                            <span>
                                <label>HP</label>
                                {hp}/{hp}
                            </span>
                            <span>
                                <label>ALTURA</label>
                                {(pokemon.height / 10).toFixed(1)} m
                            </span>
                            <span>
                                <label>PESO</label>
                                {(pokemon.weight / 10).toFixed(1)} Kg
                            </span>
                        </div>
                        <div className="pokemoncard_container__infos__nature">
                            <span>TIPO</span>
                            <div>
                                {pokemon.types.map((type: any, index: any) => {
                                    return (
                                        <label className={`type--${type.type?.name}`} key={type.slot}>
                                            {t(type.type?.name)}
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="pokemoncard_container__infos__abilities">
                            <span>HABILIDADES</span>
                            <label>
                                {pokemon.abilities.map((ability: any, index: any) => {
                                    return `${ability.ability?.name}${(index !== pokemon.abilities.length - 1) ? ", " : "."}`
                                })}
                            </label>
                        </div>

                        {fullStats &&
                            <div className="pokemoncard_container__infos__stats">
                                <span>ESTATÍSTICA</span>
                                <div>
                                    {pokemon.stats.map((item: any, index: any) => {
                                        return item.stat.name !== "hp" &&
                                            <label className={item.stat.name} key={index}>
                                                <span> {t(item.stat.name)} </span>
                                                <span>
                                                    {item.base_stat}
                                                </span>
                                            </label>
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {!fullStats &&
                <button className="catch-pokemon" onClick={HandleCatch}>
                    <img src={pokeball} />
                </button>
            }

            {fullStats &&
                <button className="btn btn--text" onClick={HandleRelease}>
                    Liberar Pokemon
                </button>

            }
        </Fragment>
    )
}

export default PokemonCard