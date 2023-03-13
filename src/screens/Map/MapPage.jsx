import { useEffect, useState } from 'react';
import Sidebar from 'components/Sidebar';
import Modal from 'components/Modal';
import PokemonTrainer from 'components/PokemonTrainer';
import PokemonCard from 'components/PokemonCard';

import { GetRandomPokemon } from 'services/pokemon.services';
import { PokemonBeltProvider, usePokemonBelt } from 'context/pokebelt';
import PokemonCardCustom from 'components/PokemonCardCustom';

const MapPage = () => {

    const pokemonBelt = usePokemonBelt()

    const [pokemonFinded, setPokemonFinded] = useState();

    const [opened, setOpened] = useState();
    const [editPokemon, setEditPokemon] = useState();

    const [customPokemon, setCustomPokemon] = useState();
    const [editCustomPokemon, setEditCustomPokemon] = useState();


    useEffect(() => {
        // encouterPokemon()
        if (pokemonBelt.editPokemon) {
            setEditPokemon(pokemonBelt.editPokemon)
        }

    }, [pokemonBelt])

    async function encouterPokemon(callback) {
        setOpened(false);
        setPokemonFinded(undefined);
        try {
            const random = Math.floor((Math.random() * 806) + 1);
            const { sprites, height, name, types, weight, stats, abilities, id } = await GetRandomPokemon(random);
            setPokemonFinded({ sprites, height, name, types, weight, stats, abilities, id })
        } catch (error) {

        } finally {
            setOpened(true);
            callback();
        }
    }

    function HandleClose() {
        setOpened(false);
    }

    function HandleEditPokemon(pokemon) {
        setEditPokemon(pokemon)
    }

    function HandleCloseEdit() {
        setEditPokemon()
    }

    function HandleCustomPokemon(pokemon) {
        if (pokemon)
            setEditCustomPokemon(pokemon)

        setCustomPokemon(true)
    }

    function HandleCloseCustom() {
        setEditCustomPokemon()
        setCustomPokemon()
    }

    return (
        <PokemonBeltProvider>
            <div className="map">
                <Sidebar onEditPokemon={HandleEditPokemon} onCreateCustom={HandleCustomPokemon} />
                {opened &&
                    <Modal close={HandleClose}>
                        <PokemonCard pokemon={pokemonFinded} closeCard={HandleClose} />
                    </Modal>
                }
                {editPokemon &&
                    <Modal close={HandleCloseEdit}>
                        <PokemonCard pokemon={editPokemon} closeCard={HandleCloseEdit} fullStats />
                    </Modal>
                }

                {customPokemon &&
                    <Modal close={HandleCloseCustom}>
                        <PokemonCardCustom close={HandleCloseCustom} editCustom={editCustomPokemon} />
                    </Modal>
                }

                <PokemonTrainer findPokemon={encouterPokemon} />
            </div>
        </PokemonBeltProvider>
    );
};

export default MapPage;
