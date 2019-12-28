import React from 'react';
import { auth } from '../../firebase/firebase';
import './Header.css';

const Header = () => {
	return (
		<div className="header">
			<button onClick={() => auth.signOut()}>Sign Out</button>
		</div>
	);
};

export default Header;
