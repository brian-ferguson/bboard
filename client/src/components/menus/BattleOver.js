import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteRoom, clearRooms } from '../../actions/roomActions'
import { setUserInfo, resetGame, setGold } from '../../actions/userActions'
import Button from '../styled/Button'

const BattleOver = ({ player, opponent }) => {
    const dispatch = useDispatch()
    const clients = useSelector(state => state.room.gameRoom);
    const auth = useSelector(state => state.auth)

    const declareWinner = () => {
        switch(true){
            case clients[player].health >= 0 && clients[opponent].health >= 0:
                return 'draws'
            case clients[player].health >= 0 && clients[player].health > clients[opponent].health:
                dispatch(setGold(auth.id, 100))
                return 'wins'
            case clients[opponent].health >= 0 && clients[opponent].health > clients[player].health:
                dispatch(setGold(auth.id, 25))
                return 'losses'
            default:
                return 'draws'
        }
    }

    const displayResults = () => {
        switch(true){
            case (clients[0]?.health < 0 && clients[1]?.health < 0):
                return <p style= {{ fontSize: 70}}>draw</p>
            case clients[0]?.health > 0 && clients[0]?.health > clients[1]?.health:
                return <p style= {{ fontSize: 70}}>{clients[0].username} wins</p>
            case clients[1]?.health > 0 && clients[1]?.health > clients[0]?.health:
                return <p style= {{ fontSize: 70}}>{clients[1].username} wins</p>
            default:
                return 'bugged'
        }
    }

    useEffect(() => {
        if (auth.id){
            dispatch(deleteRoom(clients[0].gameId))
		    dispatch(setUserInfo(auth.id, declareWinner()))
        }
    // eslint-disable-next-line
    }, [auth])

    return <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', margin: "auto",}}>
        {clients[0] && <p style= {{ fontSize: 40}}>{`${clients[0].username} Health: ${clients[0].health}`}</p>}
        {clients[1] && <p style= {{ fontSize: 40}}>{`${clients[1].username} Health: ${clients[1].health}`}</p>}
        {displayResults()}
        <Button style={{margin: '0 auto',fontSize: 40, width: "auto", padding: 25, borderWidth: 10, borderRadius: 8}} onClick={() => {
            dispatch(resetGame())
            dispatch(clearRooms())
        }}>Back to Gameroom</Button>
    </div>
}

export default BattleOver