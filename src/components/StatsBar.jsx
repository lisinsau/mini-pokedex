import "./StatsBar.css";

function StatsBar(props){

    const statMaxValues = {
        hp: 255,
        atk: 190,
        def: 230,
        satk: 194,
        sdef: 230,
        spd: 180
    };

    const max = statMaxValues[props.name] || 100;
    const normalizedStat = (props.number / max) * 100;

    return (
        <div className="stat">
            <p className="stat-name">{props.name}</p>
            <div className="stat-container">
                <div className="stat-fill" style={{"--stat-color" : props.color, "--stat-number" : normalizedStat, "--stat-delay" : `${props.delay}s`}}></div>
                <p className="stat-number">{props.number}</p>
            </div>
        </div>
    );
}

export default StatsBar;