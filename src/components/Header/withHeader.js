import React, { Fragment } from 'react';
import Header from './Header';

const withHeader = (WrapedComponent) => {
	const WithHeader = (props) => (
		<Fragment>
			<Header />
			<WrapedComponent {...props} />
		</Fragment>
	);

	return WithHeader;
};

export default withHeader;
