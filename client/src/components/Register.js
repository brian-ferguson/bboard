import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions'
import { Link } from "react-router-dom";
import history from '../history';
import Button from './styled/Button'
import Logo from './styled/Logo'

const input_styles = {
	height: 30,
	padding: 8,
	margin: 10
}

const Register = ({ isAuthenticated, error, register, clearErrors}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onNameChange = (e) => setName(e.target.value);
    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);
    const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const [msg, setMsg] = useState(null);

    const handleOnSubmit = (e) => {
        e.preventDefault();
    
        // Create user object
        const user = {
          name,
          email,
          password,
          confirmPassword
        };
    
        // Attempt to login
        register(user);
      };

      useEffect(() => {
        clearErrors();
        //eslint-disable-next-line 
      },[])

      useEffect(() => {

        if(isAuthenticated){
          history.push("/");
        }

        if(error.id === 'REGISTER_FAIL'){
          setMsg(error.msg);
        }else{
          setMsg(null);
        }

      },[error, isAuthenticated], [])

    return <div>
      <Link to="/">
        <img src="/images/icons/home.svg" alt="" style={{width: 50, height: 50, padding: 15}} />
      </Link>
		<div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)', width: 300, paddingBottom:'100px'}}>
			{/* Battleboard Logo */}
			<Link style={{textDecoration: 'none', color: '#000'}} to="/">
				<Logo style={{cursor: 'pointer'}} />
			</Link>

			{/* Registration Fields and Button */}
			<form onSubmit={handleOnSubmit}>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<input style={input_styles} type="text" name="name" value={name} placeholder="name" onChange={onNameChange}/>
					<input style={input_styles} type="text" name="email" value={email} placeholder="email" onChange={onEmailChange}/>
					<input style={input_styles} type="password" name="password" value={password} placeholder="password" onChange={onPasswordChange}/>
					<input style={input_styles} type="password" name="confirmPassword" value={confirmPassword} placeholder="confirm password" onChange={onConfirmPasswordChange}/>
				</div>
				<div style={{display: 'flex', justifyContent: 'space-evenly'}}>
					<Button style={{width: '50%', marginTop: 10, background: '#000', color: '#DBE4EE'}}>Register</Button>
				</div>
			</form>

			{/* Error Messages */}
			{msg && <div>
				{msg.map((data, index) => {
					return <div style={{width: "200px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem"}} key={index}> 
						{data.msg} 
					</div>
				})}
			</div>}
			<p style={{fontFamily: 'sans-serif', textAlign: 'center', paddingTop: 5}}>Already have an account? <Link to="/login">Log in</Link></p>
		</div>
    </div>
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, {register, clearErrors})(Register);