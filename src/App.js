import React, { useEffect, useState } from 'react';
import SignIn from './components/signin/SignIn';
import Sales from './components/Sales/Sales';
import Detail from './components/Detail/Detail';
import withHeader from './components/Header/withHeader';
import { auth, createUserProfileDocument } from './firebase/firebase';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

const SalesWithHeader = withHeader(Sales);
const DetailWithHeader = withHeader(Detail);
function App() {
	const [ currentUser, setCurrentUser ] = useState({});
	const handleStateChange = async () => {
		const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);
				userRef.onSnapshot((snapshot) => {
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data(),
					});
				});
			} else {
				setCurrentUser(userAuth);
			}
		});
		return unsubscribeFromAuth;
	};
	useEffect(() => {
		const unSubscribe = handleStateChange();
		return () => unSubscribe();
	}, []);
	return (
		<Router>
			<Switch>
				<Route exact path="/" render={() => (currentUser ? <Redirect to="/sales" /> : <SignIn />)} />
				<Route exact path="/sales" render={() => (!currentUser ? <Redirect to="/" /> : <SalesWithHeader />)} />
				<Route exact path="/sales/:salesId" component={DetailWithHeader} />
			</Switch>
		</Router>
	);
}

export default App;
