
const Logo = ({ style }) => {
    return <h1 
        style={{...style,
            userSelect: 'none', 
            fontFamily:'system-ui', 
            fontSize:33, 
            fontWeight:'bold', 
            textAlign:'center'
        }}>
        Battle
        <span style={{fontFamily:'monospace', fontSize:33, fontWeight: 'normal'}}>
            board
        </span>
    </h1>
}

export default Logo