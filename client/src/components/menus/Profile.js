import { useSelector } from 'react-redux'

const stat_container_styles = {display: 'flex', flexDirection: 'column'}

const Profile = () => {
    const user = useSelector(state => state.user)

    return <div>
        <div style={{display: 'flex', width: 500, margin: '10px auto', justifyContent: 'space-around', textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
            <div style={stat_container_styles}>
                <span>Wins</span>
                <span>{user.wins}</span>
            </div>
            <div style={stat_container_styles}>
                <span>Losses</span>
                <span>{user.losses}</span>
            </div>
            <div style={stat_container_styles}>
                <span>Draws</span>
                <span>{user.draws}</span>
            </div>
        </div>
    </div>
}

export default Profile