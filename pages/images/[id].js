import fetch from 'isomorphic-unfetch';
import {FaInstagram, FaTwitterSquare} from 'react-icons/fa'
import Link from 'next/link'

const ImagePost = ({image}) => {
	const {twitter_username, instagram_username} = image.user

	return (
		<>
			<Link href='/'>
				<a>&larr;</a>
			</Link>
			<h2>{image.user.name} <span className="location">{image.user.location && image.user.location}</span></h2>
			<div className="social">
				{instagram_username && <a href={`https://www.instagram.com/${image.user.instagram_username}`}><FaInstagram/></a>}
				{twitter_username && <a href={`https://twitter.com/${image.user.twitter_username}`}><FaTwitterSquare/></a>}
			</div>
			<img src={image.urls.regular} alt=""/>
			<style jsx>{`
					h2 {
						font-family: Roboto;
					}
					.social a {
						color: #333;
					}
					.social a + a {
						margin-left: 10px;
					}
			`}</style>
		</>
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