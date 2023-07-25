import { useSelector, useDispatch } from 'react-redux';
import { removeSpell } from '../actions/userActions';
import Card from './Card';

const SelectedSpells = () => {
    const dispatch = useDispatch()
    const spells = useSelector(state => state.user.spells)

    return <div style={{width: '100%', display: 'flex', flexGrow: 1, background: '#333', justifyContent: 'center'}}>
        {spells.map((spell, index) => {
            return <Card key={index} spell={spell} action={() => dispatch(removeSpell(spell))}/>
        })}
    </div>
}

export default SelectedSpells