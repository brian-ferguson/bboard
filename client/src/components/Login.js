import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions'
import { Link } from "react-router-dom";
import history from '../history';
import Logo from './styled/Logo'
import Button from './styled/Button'

const input_styles = {
	height: 30,
	padding: 8,
	margin: 10
}

//clear fields when 

const Login = ({ isAuthenticated, error, login, clearErrors }) =>  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const [msg, setMsg] = useState(null);

    const handleOnSubmit = (e) => {
        e.preventDefault();
    
        // Create user object
        const user = {
          email,
          password
        };
    
        // Attempt to login
        login(user);
      };

      useEffect(() => {
        clearErrors();
      //eslint-disable-next-line 
      },[])

      useEffect(() => {

        if(isAuthenticated){
          history.push("/");
        }

        if(error.id === 'LOGIN_FAIL'){
          setMsg(error.msg);
        }else{
          setMsg(null);
        }

      },[error, isAuthenticated])

    return <div>
        <Link to="/">
          <img src="/images/icons/home.svg" alt="" style={{width: 50, height: 50, padding: 15}} />
        </Link>
		<div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)', width: 300, paddingBottom:'100px'}}>
			{/* Battleboard Logo */}
			<Link style={{textDecoration: 'none', color: '#000'}} to="/">
				<Logo style={{cursor: 'pointer'}} />
			</Link>  	

			<form onSubmit={handleOnSubmit}>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<input style={input_styles} type="text" name="email" value={email} placeholder="email" onChange={onEmailChange}/>
					<input style={input_styles} type="password" name="password" value={password} placeholder="password" onChange={onPasswordChange}/>
				</div>

				<div style={{display: 'flex', justifyContent: 'space-evenly'}}>
					<Button style={{width: '50%', marginTop: 10, background: '#000', color: '#DBE4EE'}}>Login</Button>
				</div>
			</form>
			
			<div>
				{msg && <div>
					{msg.map((data, index) => {
						return <div key={index}>
							{data.msg}
						</div>
					})}
				</div>}

				<p style={{fontFamily: 'sans-serif', textAlign: 'center', paddingTop: 5}}>Don't have an account? <Link to="/register">Register</Link></p>
			</div>
		</div>
	</div>
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);