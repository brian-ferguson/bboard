import Button from './styled/Button'
import { buySpell } from '../actions/userActions'
import { useDispatch} from 'react-redux'
import store from '../store';

const BuySpellModal = ({show, spell, toggleShow}) => {

    const dispatch = useDispatch()

	return  <div style={{position:'fixed', top:'33%', left:'33%', background:'rgb(51, 51, 51)', display:'block', height:'50%', margin:'auto'}}>
        {show && <div>

            <Button onClick={() => toggleShow(!show)}>X</Button>
            
            <h4>Spell: {spell.name}</h4>
            <img alt="" src={spell.source} style={{height: 100, width: 100}}/>
            
            {
                store.getState().user.gold >= 500 && <Button onClick={function(){
                    dispatch(buySpell(spell))
                    toggleShow(!show);
                }}>Buy Spell <p style={{color:'gold'}}>500 Gold</p></Button>
            }


        
        </div>}

        

    </div>
};

export default BuySpellModal;