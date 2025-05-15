import StatsBar from "./StatsBar";

function PokemonStats(props) {
    return (
        <div className="pokemon-status">
            <StatsBar delay="0" name="hp" color="#ff5959" number={props.stats.hp}/>
            <StatsBar delay="0.1" name="atk" color="#ffae76" number={props.stats.attack}/>
            <StatsBar delay="0.2" name="def" color="#ffe171" number={props.stats.defense}/>
            <StatsBar delay="0.3" name="satk" color="#92b8f7" number={props.stats["special-attack"]}/>
            <StatsBar delay="0.4" name="sdef" color="#88db86" number={props.stats["special-defense"]}/>
            <StatsBar delay="0.5" name="spd" color="#ff93b5" number={props.stats.speed}/>
        </div>
    )
}

export default PokemonStats;