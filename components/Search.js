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
			<form className="search-form" onSubmit={onFormSubmit}>
				<input type="text" 
								name="term" 
								placeholder="nature,beauty,product..." 
								onChange={(e) => setTerm(e.target.value) }
								value={term}
								style={{fontSize: '16px'}}/>
				<button type="submit" style={{fontSize: '16px', cursor: 'pointer'}}><FaSearch /></button>
			</form>
	<style jsx>{`
		.search-form {
			display: inline-flex;
		}
		.search-form input {
			border: 1px solid #767676;
		}
		.search-form button {
			display: flex;
			align-items: center;
			margin-left: 5px;
			border: 1px solid #767676;
			color: #333;
			outline: none;
			background: transparent;
		}
	`}</style>
		</>
	);
};

export default SearchInput;