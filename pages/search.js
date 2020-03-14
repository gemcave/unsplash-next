import ImagePost from "../components/ImagePost";
import Link from 'next/link'
import Pagination from "../components/Pagination";

const search = ({images, term, page, totalPages}) => {
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
			<Pagination totalPages={totalPages} 
									hrefAddress={'/search'}
									currentPage={page}
									term={term}
									marginTop={26}/>
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

export async function getServerSideProps({query: {page = 1, term}}) {
		
		const res = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${term}`, {
			headers: {
				Authorization: `Client-ID ${process.env.ACCESS_KEY}`
			}
		})
		const data = await res.json();
		const totalPages = res.headers.get('x-total');

	return {
		props: {
			images: data.results,
			term,
			totalPages,
			page
		}
	}
}

export default search;