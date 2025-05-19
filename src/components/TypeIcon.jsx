import { ReactComponent as NormalIcon } from '../assets/type-icons/normal.svg';
import { ReactComponent as FireIcon } from '../assets/type-icons/fire.svg';
import { ReactComponent as WaterIcon } from '../assets/type-icons/water.svg';
import { ReactComponent as GrassIcon } from '../assets/type-icons/grass.svg';
import { ReactComponent as ElectricIcon } from '../assets/type-icons/electric.svg';
import { ReactComponent as IceIcon } from '../assets/type-icons/ice.svg';
import { ReactComponent as FightingIcon } from '../assets/type-icons/fighting.svg';
import { ReactComponent as PoisonIcon } from '../assets/type-icons/poison.svg';
import { ReactComponent as GroundIcon } from '../assets/type-icons/ground.svg';
import { ReactComponent as FlyingIcon } from '../assets/type-icons/flying.svg';
import { ReactComponent as PsychicIcon } from '../assets/type-icons/psychic.svg';
import { ReactComponent as BugIcon } from '../assets/type-icons/bug.svg';
import { ReactComponent as RockIcon } from '../assets/type-icons/rock.svg';
import { ReactComponent as GhostIcon } from '../assets/type-icons/ghost.svg';
import { ReactComponent as DragonIcon } from '../assets/type-icons/dragon.svg';
import { ReactComponent as DarkIcon } from '../assets/type-icons/dark.svg';
import { ReactComponent as SteelIcon } from '../assets/type-icons/steel.svg';
import { ReactComponent as FairyIcon } from '../assets/type-icons/fairy.svg';

const iconMap = {
  normal: NormalIcon,
  fire: FireIcon,
  water: WaterIcon,
  grass: GrassIcon,
  electric: ElectricIcon,
  ice: IceIcon,
  fighting: FightingIcon,
  poison: PoisonIcon,
  ground: GroundIcon,
  flying: FlyingIcon,
  psychic: PsychicIcon,
  bug: BugIcon,
  rock: RockIcon,
  ghost: GhostIcon,
  dragon: DragonIcon,
  dark: DarkIcon,
  steel: SteelIcon,
  fairy: FairyIcon,
};

function TypeIcon({ type, color = "#000" }) {
    
    const IconComponent = iconMap[type];

    if (!IconComponent) return null;
    
    return (
        <IconComponent
            style={{
                color: color
            }}
        />
    );
}

export default TypeIcon;