
const SpellCircleImage = ({color, ability, action, style}) => {
	return <div style = {{borderRadius: "50%", height: 100, width: 100, background: color, cursor: "pointer"}}onClick = {action}>
        <img alt="" src={ability.source} style={{...style, height: 55, width: 55, display: "block", margin: "auto", marginTop:"20%"}}/>
	</div>
};

export default  SpellCircleImage;