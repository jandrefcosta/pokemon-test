import React, { createContext, useContext, useEffect, useState } from 'react';

interface DefaultPagesProps {
    children: React.ReactNode;
}

export interface PokemonBeltContextData {
    belt: any;
    catchPokemon(pokemon: any): boolean;
    releasePokemon(pokemon: any): void;
    editPokemon(pokemon: any): void;
}


const PokemonBeltContext = createContext<PokemonBeltContextData>({} as PokemonBeltContextData)

export const PokemonBeltProvider: React.FC<DefaultPagesProps> = ({ children }) => {

    const [belt, setBelt] = useState<any>(null)

    useEffect(() => {
        const storage = sessionStorage.getItem('@App:pokemonbelt');
        if (storage) {
            setBelt(JSON.parse(storage));
        }
    }, [])

    useEffect(() => {
        if (belt)
            sessionStorage.setItem('@App:pokemonbelt', JSON.stringify(belt));
    }, [belt])

    function catchPokemon(pokemon: any): boolean {

        if (belt?.pokemons?.length > 5) {
            window.alert("Você só pode capturar 6 pokemons!");
            return false;
        }

        setBelt((previousState: any) => {
            return { ...previousState, pokemons: previousState?.pokemons ? [...previousState.pokemons.filter((_pokemon: any) => { return _pokemon.id !== pokemon.id }), pokemon] : [pokemon] }
        })

        return true;
    }

    function releasePokemon(pokemon: any) {
        setBelt((previousState: any) => {
            return { ...previousState, pokemons: previousState.pokemons.filter((pokemonOnBelt: any) => { return pokemonOnBelt.id !== pokemon.id }) }
        })
    }

    function editPokemon(pokemon: any) {
        setBelt((previousState: any) => {
            return { ...previousState, editPokemon: pokemon };

        })
    }

    return (
        <PokemonBeltContext.Provider value={{ belt, catchPokemon, releasePokemon, editPokemon }}>
            {children}
        </PokemonBeltContext.Provider>
    );
}

export function usePokemonBelt() {
    const context = useContext(PokemonBeltContext);
    return context;
}