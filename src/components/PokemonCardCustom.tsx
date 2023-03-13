import { Fragment, useEffect, useState } from "react";

import camera from 'assets/images/camera.png';
import { useTranslation } from "react-i18next";

import { usePokemonBelt } from "context/pokebelt";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import Dropdown from "./Dropdown";

import { getStat, getTypes } from "services/pokemon.services";

function PokemonCardCustom({ close, editCustom }: any) {

    const pokemonBelt = usePokemonBelt()

    const [pokeTypes, setPokeTypes] = useState()

    const [customPokemon, setCustomPokemon] = useState({
        custom: true,
        id: Math.floor(Math.random() * 1000) + 1000,
        name: "",
        height: 0,
        weight: 0,
        ability1: "",
        ability2: "",
        ability3: "",
        ability4: "",
        types: new Array(),
        stats: [
            { "base_stat": 0, "stat": { "name": "hp" } },
            { "base_stat": 0, "stat": { "name": "defense" } },
            { "base_stat": 0, "stat": { "name": "attack" } },
            { "base_stat": 0, "stat": { "name": "special-defense", } },
            { "base_stat": 0, "stat": { "name": "special-attack" } },
            { "base_stat": 0, "stat": { "name": "speed", } }]
    })


    useEffect(() => {
        if (editCustom) setCustomPokemon(editCustom)
        if (!pokeTypes) getAllTypes()
    }, [])

    async function getAllTypes() {
        const { results } = await getTypes()
        const data = await getStat()
        setPokeTypes(results.map((type: any) => { return { text: type.name, value: type.name } }))
    }

    function HandleChange(e: any) {
        const { value, name } = e.target ? e.target : e;

        if (name === 'types') {
            const values = [...e?.target?.selectedOptions]?.map((item: any) => { return item.value })
            if (values.length <= 2) setCustomPokemon((prevProps) => { return { ...prevProps, [name]: values } });
            else {
                window.alert("Selecione apenas 2 tipos!");
            }
        } else {
            setCustomPokemon((prevProps) => {
                return { ...prevProps, [name]: (name === 'height' || name === 'weight') ? parseInt(value) : value }
            })
        }

    }

    function HandleChangeStats(e: any) {
        const { value, name } = e;
        const newStat = { ...getStats(name), base_stat: parseInt(value) };
        setCustomPokemon((prevProps) => {
            const newStats: any = [...prevProps.stats.filter(item => { return item.stat.name !== name }), newStat]
            return { ...prevProps, stats: newStats }
        })
    }

    function getStats(value: string) {
        return customPokemon.stats.find(item => { return item.stat.name === value }) || { base_stat: 0 }
    }

    function validate(): boolean {
        let canCreate = true;

        if (!customPokemon.name || customPokemon.name === "") canCreate = false;
        if (!customPokemon.height || customPokemon.height === 0) canCreate = false;
        if (!customPokemon.weight || customPokemon.weight === 0) canCreate = false;
        customPokemon.stats.map(stat => { if (stat.base_stat === 0) canCreate = false; })
        if (!customPokemon.types || customPokemon.types.length === 0) canCreate = false;
        if (!customPokemon.ability1 || customPokemon.ability1 === "") canCreate = false;

        return canCreate;
    }


    function HandleCreate() {
        const resp = pokemonBelt.catchPokemon(customPokemon);
        if (resp) close();
    }

    function HandleRelease() {
        pokemonBelt.releasePokemon(customPokemon);
        close()
    }

    return (
        <Fragment>
            <div className="pokemoncard_container custom_input_pokemon">
                <div className="pokemoncard_container_content">

                    <div className="pokemoncard_container__sprite">
                        <img src={camera} />
                    </div>
                    <div className="pokemoncard_container__infos">

                        <div className="pokemoncard_container__infos_details">
                            <TextInput className="" label="Nome" placeholder="Nome" name="name"
                                value={customPokemon.name} onChange={(e: any) => { HandleChange(e) }}
                            />
                            <NumberInput className="" label="HP" placeholder="HP" name="hp" suffix=""
                                value={getStats("hp")?.base_stat} onChange={(e: any) => { HandleChangeStats(e) }}

                            />
                            <NumberInput className="" label="ALTURA" placeholder="Altura" name="height" suffix="Kg"
                                value={customPokemon.height} onChange={(e: any) => { HandleChange(e) }}
                            />
                            <NumberInput className="" label="PESO" placeholder="Peso" name="weight" suffix="cm"
                                value={customPokemon.weight} onChange={(e: any) => { HandleChange(e) }}
                            />
                        </div>
                        {pokeTypes &&
                            <div className="pokemoncard_container__infos__nature">
                                <span>TIPO</span>
                                <Dropdown options={pokeTypes} multiple onChange={(e: any) => { HandleChange(e) }} value={customPokemon.types} />
                            </div>
                        }
                        <div className="pokemoncard_container__infos__abilities">
                            <span>HABILIDADES</span>
                            <TextInput className="" label="" placeholder="Habilidade 1" name="ability1" value={customPokemon.ability1} onChange={(e: any) => { HandleChange(e) }} />
                            <TextInput className="" label="" placeholder="Habilidade 2" name="ability2" value={customPokemon.ability2} onChange={(e: any) => { HandleChange(e) }} />
                            <TextInput className="" label="" placeholder="Habilidade 3" name="ability3" value={customPokemon.ability3} onChange={(e: any) => { HandleChange(e) }} />
                            <TextInput className="" label="" placeholder="Habilidade 4" name="ability4" value={customPokemon.ability4} onChange={(e: any) => { HandleChange(e) }} />
                        </div>

                        <div className="pokemoncard_container__infos__stats">
                            <span>ESTATÍSTICA</span>
                            <label className="defense">
                                <span> Defesa </span>
                            </label>
                            <NumberInput className="" label="" placeholder="Defesa" name="defense" suffix=""
                                value={getStats("defense")?.base_stat} onChange={(e: any) => { HandleChangeStats(e) }}
                            />
                            <label className="attack">
                                <span> Ataque </span>
                            </label>
                            <NumberInput className="" label="" placeholder="Ataque" name="attack" suffix=""
                                value={getStats("attack")?.base_stat} onChange={(e: any) => { HandleChangeStats(e) }}
                            />
                            <label className="defense">
                                <span> Defesa Especial </span>
                            </label>
                            <NumberInput className="" label="" placeholder="Defesa Especial" name="special-defense" suffix=""
                                value={getStats("special-defense")?.base_stat} onChange={(e: any) => { HandleChangeStats(e) }}
                            />
                            <label className="attack">
                                <span> Ataque Especial</span>
                            </label>
                            <NumberInput className="" label="" placeholder="Ataque Especial" name="special-attack" suffix=""
                                value={getStats("special-attack")?.base_stat} onChange={(e: any) => { HandleChangeStats(e) }}
                            />
                            <label className="speed">
                                <span> Velocidade </span>
                            </label>
                            <NumberInput className="" label="" placeholder="Velocidade" name="speed" suffix=""
                                value={getStats("speed")?.base_stat} onChange={(e: any) => { HandleChangeStats(e) }}
                            />
                        </div>
                        {!editCustom &&
                            <button className="btn btn--text" disabled={!validate()} onClick={HandleCreate}>
                                Criar Pokemon
                            </button>
                        }
                        {editCustom &&
                            <div className="botoes-acoes">
                                <button className="btn btn--text liberar-pokemon" disabled={!validate()} onClick={HandleRelease}>
                                    Liberar Pokemon
                                </button>

                                <button className="btn btn--text salvar-edicao" disabled={!validate()} onClick={HandleCreate}>
                                    Salvar Edição
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </Fragment >
    )
}

export default PokemonCardCustom