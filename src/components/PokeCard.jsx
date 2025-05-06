function PokeCard(props){
    return(
        <div>
          <img src={props.sprites.front_default} alt={props.name}/>
          <p>{props.name}</p>
        </div>
    )
}

export default PokeCard;