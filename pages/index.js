import ImagePost from '../components/ImagePost';
import SearchInput from '../components/Search';
import Pagination from '../components/Pagination';
import fetch from 'isomorphic-unfetch';


const Index = ({images, totalPages, page}) => {
	return (
		<div>
			<div className="container">
				<h1>Unsplah Images</h1>
				<SearchInput />
				<div className="images">
					{images.map((image) => (
							<ImagePost key={image.id} image={image} />
					))}
				</div>
				<Pagination 
						totalPages={totalPages} 
						currentPage={page} 
						marginTop={26}/>
			</div>

			<style jsx>{`
				.container {
					padding: 40px;
				}

				span.location {
					font-size: 10px;
					color: #767676;
				}
    `}</style>
		</div>
	)
}

export async function getServerSideProps({query: {page = 1}}) {
	try {
		const res = await fetch(`https://api.unsplash.com/photos?page=${page}`, {
			headers: {
				Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
			}
		});
		const data = await res.json();
		const totalPages = res.headers.get('x-total');

		return {
			props: {
				images: data.map(image => image),
				totalPages,
				page: parseInt(page, 10)
			}
		};
	} catch(err) {
		console.log(err)
	}

};

export default Index;