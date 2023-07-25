
import {infoImage} from "./CardInfoToImage";

const Card = ({ spell, action, style, owned, attribute }) => {

	const returnBorderColor = () => {
		switch(attribute){
			case "strength":
				return "#bd0404"
			case "agility":
				return "#0fb019"
			case 'magic':
				return "#0974da"
			case 'holy':
				return '#e6ec1c'
			default:
				return 'purple'
		}
	}

	const container_styles = {
		border: `2px solid ${returnBorderColor()}`,
		borderRadius: 4,
		width: 200,
		height: 230,
		margin: '10px 0 0 10px',
		cursor: 'pointer',
		userSelect: 'none',
		background: '#FFF',
		color: '#333',
		position: 'relative'
	}

	return <div style={{...container_styles, ...style}} onClick={action}>
		<div style={{margin: 10, display: 'flex',flexDirection: "column"}}>
			<h4 style={{margin: 0, padding: '20 0 0 20', flexGrow: 2}}>{spell.name}</h4>
			<img alt="" src={spell.source} style={{height: 50, width: 50, margin: "auto"}}/>
		</div>

		<div style={{display: 'flex'}}>
			<div style={{ display:"flex",flexGrow: 2, flexWrap: "wrap"}}>
				{Object.keys(spell).filter(e => e !== 'name' && e !== "source" && e !== 'debuffs' && e !== 'spellList' && e !== 'index').map((key, index) => {
					if(spell[key] !== 0 && spell[key] !== ''){
						return <div key={index} style={{ width: "49%", flexWrap: "wrap",display: 'flex', justifyContent:"center" }}>
							<div style = {{display: "flex"}}>
								<div style={{margin: 0, padding: 5, fontSize: 20,}}>{infoImage(key)}</div>
								<div style={{margin: 0, padding: 5, fontSize: 20, textAlign: 'right'}}>{spell[key]}</div>
							</div>
						</div>
					} else {
						return null
					}
				})}
			</div>
		</div>

		{/* Show Gold Refund */}
		{owned && <div style={{textAlign: 'center', width: '100%', zIndex: 200, fontSize: 24, height: 60, paddingTop: 25, top: 70, position: 'absolute', display: 'flex', margin: '0px auto', justifyContent: 'center', flexDirection: 'column'}}>
			<div style={{ color: '#FFD949', fontSize: 16, marginBottom: 4}}>Card already owned</div>
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<div style={{ color: '#FFD949', marginRight: 5, marginTop: 1}}>300</div>
				<img src="/images/spells/dubloontoss.svg" alt="" style={{ height: 30, width: 30}} />
			</div>
			<div style={{ color: '#FFD949', fontSize: 16, marginTop: 4 }}>returned to your account</div>
		</div>}

		{owned && <div style={{textAlign: 'center', width: '100%', fontSize: 24, height: 60, opacity: '75%', background: '#333', paddingTop: 25, top: 80, position: 'absolute', display: 'flex', margin: '0px auto', justifyContent: 'center'}}>

		</div>}
	</div>
};

export default Card;