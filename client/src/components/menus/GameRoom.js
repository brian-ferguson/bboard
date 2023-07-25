import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import store from '../../store';
import Card from '../Card';
import { setPhase } from '../../actions/userActions';
import { setGameRoom } from '../../actions/roomActions';
import { connect } from 'react-redux';
import ProgressBar from "../styled/ProgressBar";

const title_text_styles = {margin: 0, fontSize: 24, textAlign: 'center', width: '100%', fontFamily: 'sans-serif', paddingTop: 5, color: '#000'}
const status_bar_styles = {width: '85%', background: '#7E7E7E', display: 'flex', height: 70, margin: "0px auto 10px auto"}
const player_stats_container_styles = {width: '75%', background: '#7E7E7E', display: 'flex', flexDirection:"column", margin: "15px auto"}
const damage_result_styles = {color: 'red', fontSize: 28, marginTop: '110px', marginLeft: 30, fontWeight: 'bold'}

const GameRoom = ({setGameRoom, player, opponent}) => {
    const [currentUserSpell, setCurrentUserSpell] = useState(null)
    const [currentSpells, setCurrentSpells] = useState([])
    const [currentDamageResults, setCurrentDamageResults] = useState([])
    const [currentShieldResults, setCurrentShieldResults] = useState([])
    const [calculating, setCalculating] = useState(false)

    const [playerDebuffs, setPlayerDebuffs] = useState([])
    const [opponentDebuffs, setOpponentDebuffs] = useState([])

    const [playerBuffs, setPlayerBuffs] = useState([])
    const [opponentBuffs, setOpponentBuffs] = useState([])

    const dispatch = useDispatch()
    const clients = useSelector(state => state.room.gameRoom);
    const connection = useSelector(state => state.room.connection);
    const clientId = store.getState().room.clientId

    useEffect(() => { 

        if (clients[player]?.health <= 0 || clients[opponent]?.health <= 0 ) dispatch(setPhase("battle-over"))
    // eslint-disable-next-line
    }, [clients, dispatch])

    const initializeCombat = (spell, id) => {
        if (!calculating) {
            setCalculating(true)

            setCurrentUserSpell(spell)

            const payLoad = {
                "method": "evaluate",
                "clientId": clientId,
                "spell": spell,
                "gameId": store.getState().room.gameRoom[0].gameId
            }
            
            connection.send(JSON.stringify(payLoad));
            
            connection.onmessage = message => {
                const response = JSON.parse(message.data);

                if(response.method === 'evaluate'){
                    //display the previous moves and their effects for 3 seconds while locking them out of picking new moves in the meantime
                    setCurrentSpells([response.game.clients[player].previousSpell, response.game.clients[opponent].previousSpell]);
                    setCurrentDamageResults([response.game.clients[player].damageResult, response.game.clients[opponent].damageResult])
                    setCurrentShieldResults([response.game.clients[player].shieldResult, response.game.clients[opponent].shieldResult])
                    setPlayerDebuffs(response.game.clients[player].debuffs)
                    setOpponentDebuffs(response.game.clients[opponent].debuffs)
                    setPlayerBuffs(response.game.clients[player].buffs)
                    setOpponentBuffs(response.game.clients[opponent].buffs)
                    setTimeout(() => {
                        setCurrentSpells([])
                        setCurrentUserSpell(null)
                        setCurrentDamageResults([])
                        setGameRoom(response.game);
                        setCalculating(false)
                    }, 3000)
                }
            }
        }
    }

    const damageType = (debuff) => {
        switch(debuff.type){
            case 'damage':
                return debuff.damage
            case 'heal':
                return debuff.heal
            case 'shield':
                return debuff.shield
            default:
                return null
        }
    }

    const damageIcon = (debuff) => {
        switch(debuff.type){
            case 'damage':
                return <img src="/images/icons/sword.svg" alt="" style={{width: 15, height: 15}} />
            case 'heal':
                return <img src="/images/icons/healing.svg" alt="" style={{width: 15, height: 15}} />
            case 'shield':
                return <img src="/images/icons/shield.svg" alt="" style={{width: 15, height: 15}} />
            default:
                return null
        }
    }

    return <div style = {{display: "flex", height: '100%', flexDirection: 'column', background: "#212121"}}>
        <div style={{paddingBottom: 10}}>
            {/* Opponent Information - Username / Health*/}
            <div style = {player_stats_container_styles}>
                <div style={{display: 'flex', height: 40}}>
                    {clients[opponent] && <h4 style={{...title_text_styles, width: '50%', borderBottom: '3px solid #333'}}>{clients[opponent].username}</h4>}
                    {clients[opponent] && <h4 style={{...title_text_styles, width: '25%', borderLeft: '3px solid #333',  borderBottom: '3px solid #333'}}>Health: {clients[opponent] && clients[opponent].health}</h4>}
                    {clients[opponent] && <h4 style={{...title_text_styles, width: '25%', borderLeft: '3px solid #333',  borderBottom: '3px solid #333'}}>Shield: {clients[opponent] && clients[opponent].shield}</h4>}
                </div>
                {clients[opponent] && <ProgressBar width={(((clients[opponent].shield - 0) * (100 - 0)) / (clients[opponent].maxShield - 0)) + 0} color="white"/>}
                <div style={{borderBottom: '3px solid #333'}}/>
                {clients[opponent] && <ProgressBar width={(((clients[opponent].health - 0) * (100 - 0)) / (clients[opponent].maxHealth - 0)) + 0} color="green"/>}
            </div>
            
            {/* Opponent Buff Status Bar*/}
            <div style={status_bar_styles}>
                {opponentBuffs && opponentBuffs.map((buff, index) => {
                    return <div key={index} style={{width: 70, height: 80}}>
                        <img src={buff.icon} style={{width: 40, height: 40, margin: '5px 15px 0'}} alt="" />
                        <div style={{display: 'flex'}}>
                            <div style={{display: 'flex', height: 30, width: '50%'}}>
                                {damageIcon(buff)}
                                <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 14, width: 10, height: 10}}>{damageType(buff)}</div>
                            </div>
                            <div style={{display: 'flex', height: 30, width: '50%'}}>
                                <img src="/images/icons/timer.svg" alt="" style={{width: 15, height: 15}} />
                                <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 14, width: 10, height: 10}}>{buff.duration}</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            {/* Opponent Debuff Status Bar*/}
            <div style={status_bar_styles}>
                {opponentDebuffs && opponentDebuffs.map((debuff, index) => {
                    return <div key={index} style={{width: 70, height: 80}}>
                        <img src={debuff.icon} style={{width: 40, height: 40, margin: '5px 15px 0'}} alt="" />
                        <div style={{display: 'flex'}}>
                            <div style={{display: 'flex', height: 30, width: '50%'}}>
                                {damageIcon(debuff)}
                                <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 14, width: 10, height: 10}}>{damageType(debuff)}</div>
                            </div>
                            <div style={{display: 'flex', height: 30, width: '50%'}}>
                                <img src="/images/icons/timer.svg" alt="" style={{width: 15, height: 15}} />
                                <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 14, width: 10, height: 10}}>{debuff.duration}</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>

        </div>

        {/** Card Reveal Area */}
        <div style = {{width: '100%', background: '#C4C4C4', display: 'flex', height: 250, margin: "1px auto"}}>
            <div style={{display: 'flex', margin: 0, width: '50%', flexDirection: 'column', overflow: 'auto'}}>
                <div style={{margin: '0px auto', display: 'flex'}}>
                    {currentUserSpell && <Card spell={currentUserSpell} />}
                    {currentSpells.length !== 0 && <div style={{...damage_result_styles, color: currentDamageResults[0] > 0 ? 'red' : currentDamageResults[0] === 0 ? 'black' : 'green'}}>{Math.abs(currentDamageResults[0])}</div>}
                    {currentSpells.length !== 0 && currentShieldResults[0] < 0 && <div style={{...damage_result_styles, color: 'white'}}>{Math.abs(currentShieldResults[0])}</div>}
                </div>
            </div>
            <div style={{borderLeft: '3px solid #333', display: 'flex', margin: 0, width: '50%', flexDirection: 'column', overflow: 'auto'}}>
                <div style={{margin: '0px auto', display: 'flex'}}>
                    {currentSpells.length !== 0 && <Card spell={currentSpells[1]} />}
                    {currentSpells.length !== 0 && <div style={{...damage_result_styles, color: currentDamageResults[1] > 0 ? 'red' : currentDamageResults[1] === 0 ? 'black' : 'green'}}>{Math.abs(currentDamageResults[1])}</div>}
                    {currentSpells.length !== 0 && currentShieldResults[1] < 0 && <div style={{...damage_result_styles, color: 'white'}}>{Math.abs(currentShieldResults[1])}</div>}

                </div>  
            </div>
        </div>

        <div>
            {/**Player 1 Health Bar */}
            <div style = {player_stats_container_styles}>
                <div style={{display: 'flex', height: 40}}>
                    {clients[player] && <h4 style={{...title_text_styles, width: '50%', borderBottom: '3px solid #333'}}>{clients[player].username}</h4>}
                    {clients[player] && <h4 style={{...title_text_styles, width: '25%', borderLeft: '3px solid #333',  borderBottom: '3px solid #333'}}>Health: {clients[player] && clients[player].health}</h4>}
                    {clients[player] && <h4 style={{...title_text_styles, width: '25%', borderLeft: '3px solid #333',  borderBottom: '3px solid #333'}}>Shield: {clients[player] && clients[player].shield}</h4>}
                </div>
                {clients[player] && <ProgressBar width={(((clients[player].shield - 0) * (100 - 0)) / (clients[player].maxShield - 0)) + 0} color="white"/>}
                <div style={{borderBottom: '3px solid #333'}}/>
                {clients[player] && <ProgressBar width={(((clients[player].health - 0) * (100 - 0)) / (clients[player].maxHealth - 0)) + 0} color="green"/>}
            </div>

            {/** Player 1 Buff Status Bar */}
            <div style={status_bar_styles}>
                {playerBuffs && playerBuffs.map((buff, index) => {
                    return <div key={index} style={{width: 70, height: 80}}>
                        <img src={buff.icon} style={{width: 40, height: 40, margin: '5px 15px 0'}} alt="" />
                        <div style={{display: 'flex'}}>
                            <div style={{display: 'flex', height: 30, width: '50%'}}>
                                {damageIcon(buff)}
                                <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 14, width: 10, height: 10}}>{damageType(buff)}</div>
                            </div>
                            <div style={{display: 'flex', height: 30, width: '50%'}}>
                                <img src="/images/icons/timer.svg" alt="" style={{width: 15, height: 15}} />
                                <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 14, width: 10, height: 10}}>{buff.duration}</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            {/** Player 1 Debuff Status Bar */}
            <div style={status_bar_styles}>
                {playerDebuffs && playerDebuffs.map((debuff, index) => {
                    return <div key={index} style={{width: 70, height: 80}}>
                        <img src={debuff.icon} style={{width: 40, height: 40, margin: '5px 15px 0'}} alt="" />
                        <div style={{display: 'flex'}}>
                            <div style={{display: 'flex', height: 30, width: '50%'}}>
                                {damageIcon(debuff)}
                                <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 14, width: 10, height: 10}}>{damageType(debuff)}</div>
                            </div>
                            <div style={{display: 'flex', height: 30, width: '50%'}}>
                                <img src="/images/icons/timer.svg" alt="" style={{width: 15, height: 15}} />
                                <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 14, width: 10, height: 10}}>{debuff.duration}</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            {/**Spell Display */}
            <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', height: 300, margin: '10px auto', justifyContent: 'center', overflow: "auto"}}>
                {clients[player] && clients[player].spells.map((spell, index) => {
                    return <div key={index}>
                        <Card  spell={spell} action={() => initializeCombat(spell, store.getState().room.gameRoom[player].clientId)}/>
                    </div>
                })}
            </div>
        </div>
    </div>
    
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {setGameRoom})(GameRoom);