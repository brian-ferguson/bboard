const container_styles = {
    height: 40,
    width: '100%',
    background: '#888',
    margin: "0 auto"
}

const progress_styles = {
    height: '100%'
    
}

const ProgressBar = ({ children, width, color, styles }) => {
    return <div style={container_styles}>
        <div style={{...progress_styles, ...styles, width: `${width}%`, background: color}}>{children}</div>
    </div>
}

export default ProgressBar