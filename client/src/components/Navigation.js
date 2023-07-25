import Button from './styled/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setPhase } from '../actions/userActions'
import { logout } from '../actions/authActions'
import {deleteRoom} from '../actions/roomActions';

const button_styles = { border: '1px solid #FFF', color: '#FFF', margin: 8 }

const Navigation = () => {
    const phase = useSelector(state => state.user.phase)
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)

    return <div style={{width: '100%', height: 80, background: '#000', margin: 0, display: 'flex'}}>
        {/* Title */}
        <h1 style={{margin: 0, padding: '10px 0 0 10px', fontSize: 48, fontFamily: 'sans-serif', color: '#F3F3F3', userSelect: 'none', cursor: 'pointer'}} onClick={() => {dispatch(setPhase('gameroom'))}}>Battleboard</h1>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%'}}>
            {auth.isAuthenticated && <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button style={button_styles} onClick={() => dispatch(logout())}>Logout</Button>

                {phase !== 'menu' && phase !== "gameroom" && phase !== 'battle' && <Button style={button_styles} onClick={() => {dispatch(setPhase('gameroom'))}}>Lobby</Button>}
                {phase === 'battle' && <Button style={{ border: '1px solid #FFF', color: '#FFF', margin: 8 }} onClick={() => {
                    dispatch(deleteRoom())
                    dispatch(setPhase('gameroom'))
                }}>Leave Room</Button>}
            </div>}

            {auth.isAuthenticated && user && <div style={{textAlign: 'center', fontSize: 24, display: 'flex', margin: 'auto 10px', justifyContent: 'center'}}>
                <div style={{color: '#FFD949', marginRight: 5, marginTop: 1, userSelect: 'none'}}>{user.gold}</div>
                <img src="/images/spells/dubloontoss.svg" alt="" style={{height: 30, width: 30, userSelect: 'none'}} />
            </div>}
        </div>
    </div>
}

export default Navigation