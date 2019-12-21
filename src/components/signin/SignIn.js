import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import './signIn.css';

const SignIn = () => {
	const [ inputs, setInputs ] = useState({
		email: '',
		password: '',
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		return setInputs({ ...inputs, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = inputs;
		try {
			await auth.signInWithEmailAndPassword(email, password);
			setInputs({
				email: '',
				password: '',
			});
		} catch (error) {
			alert('Incorrect Email or Password');
			//console.log('sign in error', error.message);
		}
	};
	return (
		<div className="parent">
			<div className="login-container">
				<div className="login-form-container sign-in-container">
					<form onSubmit={handleSubmit}>
						<i className="fa fa-sign-in-alt" />
						<h1>Sign In</h1>
						<input
							name="email"
							required
							value={inputs.email}
							onChange={handleChange}
							type="email"
							placeholder="Email"
						/>
						<input
							name="password"
							required
							value={inputs.password}
							onChange={handleChange}
							type="password"
							placeholder="Password"
						/>
						<button>Sign In</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
