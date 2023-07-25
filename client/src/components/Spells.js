import {spells} from "../json/spells";
import Card from "./Card";
import { useState } from 'react'
import {setSpells} from '../actions/userActions';
import {connect, useSelector} from 'react-redux';
import BuySpellModal from './BuySpellModal';

const Spells = ({auth, setSpells}) => {
    const [modal, setModal] = useState(false)
    const [modalSpell, setModalSpell] = useState({})

    const toggleModal = (spell) => {
        setModalSpell(spell)
        setModal(!modal)
    }

    const user = useSelector(state => state.user)
    const unlockedSpells = useSelector(state => state.user.unlockedSpells)

	return <div style={{display: 'flex', flexWrap: 'wrap', flexGrow: 2, overflow: 'auto', maxHeight: '80vh' }}>
        {spells.map((spell, index) => {
            if(auth.role === 'admin'){
                return <Card key={index} spell={spell} action={() => !user.spells.includes(spell) ? setSpells(spell) : null}/>
            }else if(unlockedSpells.includes(index) && auth.role === 'player'){
                return <Card key={index} spell={spell} action={() => !user.spells.includes(spell) ? setSpells(spell) : null}/>
            }
            return <Card key={index} style={{opacity: '50%', cursor: 'default'}} spell={spell} action={() => toggleModal(spell)}/>
        })}

        <BuySpellModal show={modal} spell={modalSpell} toggleShow={setModal}/>
    </div>
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {setSpells})(Spells)