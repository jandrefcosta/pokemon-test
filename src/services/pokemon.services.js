import RequestService from './index'

export async function GetRandomPokemon(id) {
    const { data } = await RequestService.get(`pokemon/${id}`);
    return data;
}

export async function getTypes(){
    const { data } = await RequestService.get(`type/`);
    return data;
}

export async function getStat(){
    const { data } = await RequestService.get(`stat/`);
    return data;
}

    

export async function GetRandomPokemonHabitat() {
    const { data } = await RequestService.get(`pokemon-habitat/`);
    return data;
}

export async function GetLanguage() {
    const { data } = await RequestService.get(`language/pt-BR`);
    return data;
}