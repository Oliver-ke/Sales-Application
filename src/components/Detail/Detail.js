import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import QrCode from 'qrcode.react';
import './detail.css';

const Detail = ({ match, ...rest }) => {
	const [ payload, setPayload ] = useState(null);
	const id = match.params.salesId;
	const encode = match.url;
	useEffect(
		() => {
			const getSale = async () => {
				const ref = await firestore.doc(`sales/${id}`);
				const snap = await ref.get();
				setPayload(snap.data());
			};
			getSale();
		},
		// eslint-disable-next-line
		[ id ],
	);
	return (
		<div className="detail-container">
			{payload ? (
				<div className="detail">
					<h3>
						<span>Category:</span> {payload.category}
					</h3>
					<h3>
						<span>Cost:</span> #{payload.cost}
					</h3>
					<h3>
						<span>Departure Date:</span> {payload.departureDate}
					</h3>
					<h3>
						<span>Destination Address:</span> {payload.destinationAddress}
					</h3>
					<h3>
						<span>Quantity:</span> {payload.quantity}
					</h3>
					<h3>
						<span>Drivers Name:</span> {payload.driversName}
					</h3>
					<QrCode value={`https://saleform.herokuapp.com${encode}`} size={200} />
					<br />
					<Link to="/sales">Add New Item</Link>
				</div>
			) : (
				<p>Loading ...</p>
			)}
		</div>
	);
};

export default Detail;
