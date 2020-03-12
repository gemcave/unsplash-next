import fetch from 'isomorphic-unfetch';
import ImagePost from '../components/ImagePost'
import { useState } from 'react';
import Router from 'next/router'

const Index = ({images}) => {
	const [term, setTerm] = useState('')

	const	onFormSubmit = (event) => {
		event.preventDefault();
		Router.push(`/search?term=${term}`)
	}
	return (
		<div>
			<div className="container">
				<h1>Unsplah Images</h1>
				<form onSubmit={onFormSubmit}>
					<input type="text" name="term" onChange={(e) => setTerm(e.target.value) } />
				</form>
				<div className="images">
					{images.map((image) => (
							<ImagePost key={image.id} image={image} />
					))}
				</div>
			</div>
			<style jsx global>{`
				* {
					box-sizing: border-box;
				}
        body {
					margin: 0;
					padding: 0;
          font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: #333;
				}
				a {
					text-decoration: none;
					color: #333;
				}
				a:hover {
					text-decoration: underline;
				}
				span.location {
					font-size: 10px;
					color: #767676;
				}
      `}</style>

			<style jsx>{`
				.container {
					margin: 40px;
				}
				.images {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
					grid-auto-rows: minmax(150px, auto);
					grid-gap: 40px;
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