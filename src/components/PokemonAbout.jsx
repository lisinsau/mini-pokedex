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
        </div>
    )
}

export default PokemonAbout;