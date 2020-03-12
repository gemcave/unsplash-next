import ImagePost from "../components/ImagePost";
import Link from 'next/link'

const Search = ({images}) => {
	console.log(images)
	return (
		<div>
			<Link href='/'>
				<a>&larr;</a>
			</Link>
			Search page
			<div className="images">
			{images.map((image) => (
							<ImagePost key={image.id} image={image} />
			))}
			</div>
		</div>
	);
};

Search.getInitialProps = async function({query}) {
		const { term } = query
		
		const res = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${term}`, {
			headers: {
				Authorization: `Client-ID ${process.env.ACCESS_KEY}`
			}
		})
		const data = await res.json();

	return {images: data.results}
}

export default Search;