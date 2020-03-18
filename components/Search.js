import { useState } from "react";
import Router from 'next/router';
import {FaSearch} from 'react-icons/fa';

const SearchInput = () => {
	const [term, setTerm] = useState('')

	const	onFormSubmit = (e) => {
		e.preventDefault();
		Router.push(`/search?term=${term}`)
	}
	
	return (
		<>
			<form onSubmit={onFormSubmit}>
				<input type="text" 
								name="term" 
								placeholder="nature,beauty,product..." 
								onChange={(e) => setTerm(e.target.value) }
								value={term}
								style={{fontSize: '16px'}}/>
			</form>
			<button onClick={onSubmit}><FaSearch /></button>
		</>
	);
};

export default SearchInput;