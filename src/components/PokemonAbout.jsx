function PokemonAbout(props) {
    
    const heightM = props.height / 10;
    const heightInches = heightM * 39.3701;
    const heightFeet = Math.floor(heightInches / 12);
    const remainingInches = Math.round(heightInches % 12);

    const weightKg = props.weight / 10;
    const weightLbs = (weightKg * 2.20462).toFixed(1);    
    
    const femaleRate = props.genderRate >= 0 ? (props.genderRate / 8) * 100 : null;
    const maleRate = props.genderRate >= 0 ? 100 - femaleRate : null;
    const catchRatePercent = Math.round((props.captureRate / 255) * 100);

    const generation = props.generation.url.split("/").filter(Boolean).pop();
    const pokemonGenerations = [
        { number: 1, color: " #1167e9, #1EA92D, #fddf11, #f4092b", starter:[1, 4, 7]},
        { number: 2, color: " #fdc828, white, #3699c3", starter:[152, 155, 158]},
        { number: 3, color: " #9f0631, #3953c7, #258769", starter:[252, 255, 258]},
        { number: 4, color: " #35327d, #fab7d0, #8e92a2", starter:[387, 390, 393]},
        { number: 5, color: " black, white, #e76929, #03affe", starter:[495, 498, 501]},
        { number: 6, color: " #5933db, #c31024", starter:[650, 653, 656]},
        { number: 7, color: " #f48a26, #300c8a", starter:[722, 725, 728]},
        { number: 8, color: " #00adef, #ED1166", starter:[810, 813, 816]},
        { number: 9, color: " #d90c1f, #7c2880", starter:[906, 909, 912]},
    ];

    return (
        <div className="pokemon-about">
            <p className="pokemon-description">{props.description}</p>
            <div className="pokemon-measurements">
                <div className="measurement-row">
                    <p className="label">Height</p>
                    <p className="imperial">{heightFeet}'{remainingInches}"</p>
                    <p className="metric">{heightM} m</p>
                </div>
                <div className="measurement-row">
                    <p className="label">Weight</p>
                    <p className="imperial">{weightLbs} lbs</p>
                    <p className="metric">{weightKg} kg</p>
                </div>
            </div>
            <div className="measurement-row">
                <p className="label">Gender ratio</p>
                {props.genderRate === -1 ? (
                    <p className="imperial">Genderless</p>
                ) : (<>
                    <p className="male-rate"> ♂ {maleRate}% </p>
                    <p className="female-rate"> ♀ {femaleRate}%</p></>
                )}
            </div>
            <div className="measurement-row">
                <p className="label">Capture rate</p>
                <p className="catch-rate">{catchRatePercent}%</p>
            </div>
            <div className="measurement-row" style={{ marginTop:"15px", alignItems:"center" }}>
                <p className="label">Generation</p>
                <div className="generation-link" style={{ "--generation-color" : pokemonGenerations[generation - 1].color }}>
                    <a href={`/pokedex?generation=${generation}`}>
                        Generation {generation}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PokemonAbout;