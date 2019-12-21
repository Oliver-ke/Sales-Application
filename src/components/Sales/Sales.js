import React, { useState } from 'react';
import { auth, createNewSales } from '../../firebase/firebase';
import { Form, Button } from 'semantic-ui-react';
import './sales.css';

const Sales = () => {
	const [ formLoading, setFormLoading ] = useState(false);
	const [ inputs, setInputs ] = useState({
		name: '',
		category: '',
		cost: '',
		quantity: '',
		departureDate: '',
		driversName: '',
		destinationAddress: '',
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		return setInputs({ ...inputs, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormLoading(true);
		try {
			console.log(inputs);
			await createNewSales(inputs);
			setFormLoading(false);
			setInputs({
				name: '',
				category: '',
				cost: '',
				quantity: '',
				departureDate: '',
				driversName: '',
				destinationAddress: '',
			});
			await alert('Item Added Successfuly');
		} catch (error) {
			alert('Error Creating Sales');
		}
		return setFormLoading(false);
	};
	return (
		<div className="sale-form">
			<div className="header">
				<button onClick={() => auth.signOut()}>Sign Out</button>
			</div>
			<h2>Sales Record Form</h2>
			<div className="form-container">
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Input
							name="name"
							required
							value={inputs.name}
							onChange={handleChange}
							label="Item Name"
							placeholder="item name"
							width={12}
						/>
						<Form.Input
							name="category"
							required
							value={inputs.category}
							onChange={handleChange}
							label="Category"
							placeholder="Category"
							width={12}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Input
							name="cost"
							required
							value={inputs.cost}
							onChange={handleChange}
							type="number"
							label="Cost (#)"
							placeholder="Cost"
							width={6}
						/>
						<Form.Input
							name="quantity"
							required
							value={inputs.quantity}
							onChange={handleChange}
							label="Quantity (ltr)"
							placeholder="Quantity"
							width={8}
						/>
						<Form.Input
							name="driversName"
							required
							value={inputs.driversName}
							onChange={handleChange}
							label="Drivers Name"
							placeholder="Drivers Name"
							width={10}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Input
							name="departureDate"
							required
							value={inputs.departureDate}
							onChange={handleChange}
							placeholder="Departure date"
							label="Departure date"
							type="date"
							width={12}
						/>
						<Form.Input
							name="destinationAddress"
							required
							value={inputs.destinationAddress}
							onChange={handleChange}
							placeholder="Destination Address"
							label="Destination Address"
							width={12}
						/>
					</Form.Group>
					<Button loading={formLoading} primary type="submit">
						Save Entry
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default Sales;
