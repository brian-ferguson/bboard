import store from '../store';
import Card from './Card';

const SpellList = () => {
	return  <div>
				<h4>Spell List: </h4>
                {store.getState().user.spells && store.getState().user.spells.map((spell, index) => {
				    return <Card key={index} spell={spell}/>
				})}
            </div>
};

export default SpellList;