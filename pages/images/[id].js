import fetch from 'isomorphic-unfetch';
import {FaInstagram, FaTwitterSquare} from 'react-icons/fa'
import Link from 'next/link'

const ImagePost = ({image}) => {
	const {twitter_username, instagram_username} = image.user

	return (
		<div className="container-image">
			<Link href='/'>
				<a>&larr;</a>
			</Link>
			<h2>{image.user.name} <span className="location">{image.user.location && image.user.location}</span></h2>
			<div className="social">
				{instagram_username && <a href={`https://www.instagram.com/${image.user.instagram_username}`}><FaInstagram/></a>}
				{twitter_username && <a href={`https://twitter.com/${image.user.twitter_username}`}><FaTwitterSquare/></a>}
			</div>
			<img className="image__regular" src={image.urls.regular} alt=""/>
			<style jsx>{`

					.social a {
						color: #333;
					}
					.social a + a {
						margin-left: 10px;
					}

					.container-image {
						margin: 60px;
						margin-top: 20px;	
					}
					.image__regular {
						max-width: 400px;
					}
			`}</style>
		</div>
	)
}

ImagePost.getInitialProps = async function({query}) {
		const { id } = query
		
		const res = await fetch(`https://api.unsplash.com/photos/${id}`, {
			headers: {
				Authorization: `Client-ID ${process.env.ACCESS_KEY}`
			}
		});
		const data = await res.json();
		return {
			image: data
		};
	};
	
export default ImagePost;