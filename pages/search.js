import ImagePost from "../components/ImagePost";
import Link from 'next/link'

const search = ({images, term}) => {
	return (
		<div className="search-results">
			<Link href='/'>
				<a>&larr;</a>
			</Link>

			<h1>Search results for <strong>{term}</strong>:</h1>
			<div className="images">
				{images.map((image) => (
								<ImagePost key={image.id} image={image} />
				))}
			</div>
			<style jsx>{`
				.search-results {
					margin: 40px;
				}
				h1 {
					font-weight: 400;
				}
    `}</style>
		</div>
	);
};

search.getInitialProps = async function({query}) {
		const { term } = query
		
		const res = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${term}`, {
			headers: {
				Authorization: `Client-ID ${process.env.ACCESS_KEY}`
			}
		})
		const data = await res.json();

	return {
		images: data.results,
		term: term
	}
}

export default search;