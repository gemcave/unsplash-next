import fetch from 'isomorphic-unfetch';
import ImagePost from '../components/ImagePost'
import SearchInput from '../components/Search';

const Index = ({images}) => {
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

Index.getInitialProps = async function() {
  const res = await fetch('https://api.unsplash.com/photos', {
		headers: {
			Authorization: `Client-ID ${process.env.ACCESS_KEY}`
		}
});
	const data = await res.json();

  return {
    images: data.map(image => image)
  };
};

export default Index;