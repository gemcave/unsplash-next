import { useState } from "react";
import Router from 'next/router'

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
								 value={term}/>
			</form>
		</>
	);
};

export default SearchInput;