import ashfront from 'assets/images/ashFront.png';
import tooltip from 'assets/images/searchTooltip.png';
import tooltipSearch from 'assets/images/searchingTooltip.png';
import { Fragment, useEffect, useState } from 'react';

function PokemonTrainer({ findPokemon }: any) {

    const [search, setSearch] = useState(false)
    
    useEffect(() => {

    }, [])

    function HandleSearch() {
        findPokemon(stopSearching)
        setSearch(true);
    }

    function stopSearching(){
        setSearch(false);
    }

    return (
        <div className='pokemon-trainer-container' onClick={HandleSearch}>
            {!search &&
                <Fragment>
                    <img className='pokemon-trainer-container__tooltip-img' src={tooltip} />
                    <img src={ashfront} />
                </Fragment>
            }
            {search &&
                <Fragment>
                    <img className='pokemon-trainer-container__tooltip-search' src={tooltipSearch} />
                    <img className='pokemon-trainer-container__walking' />
                </Fragment>
            }
        </div>
    )

}

export default PokemonTrainer;