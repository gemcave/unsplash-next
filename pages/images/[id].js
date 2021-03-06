import {FaInstagram, FaTwitterSquare} from 'react-icons/fa';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import {motion} from 'framer-motion';

let easing = [0.175, 0.85, 0.42, 0.96];

const imageVariants = {
  exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing
    }
  }
};

const textVariants = {
  exit: { y: 100, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5, ease: easing }
  }
};

const backVariants = {
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: easing
    }
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: easing
    }
  }
};

const ImagePost = ({image}) => {
	const {twitter_username, instagram_username} = image.user;

	return (
		<div className="container-image">
			<motion.div initial="exit" animate="enter" exit="exit">
				<motion.div variants={backVariants}>
					<Link href='/'>
						<a>&larr;</a>
					</Link>
				</motion.div>
				<motion.div variants={textVariants}>
					<h2>{image.user.name} <span className="location">{image.user.location && image.user.location}</span></h2>
				</motion.div>
				<div className="social">
					{instagram_username && <a href={`https://www.instagram.com/${image.user.instagram_username}`}><FaInstagram/></a>}
					{twitter_username && <a href={`https://twitter.com/${image.user.twitter_username}`}><FaTwitterSquare/></a>}
				</div>
				<div>
					<motion.img variants={imageVariants}  style={{maxWidth: '400px', height: 'auto'}} src={image.urls.regular} alt={image.alt_description}/>
				</div>
			</motion.div>
			<style jsx>{`
				.social a {
					color: #333;
					font-size: 1rem;
				}
				.social a + a {
					margin-left: 10px;
				}
				.container-image {
					margin: 60px;
					margin-top: 20px;	
				}
			`}</style>
		</div>
	)
}

export async function getServerSideProps({query}) {
		const { id } = query
		
		const res = await fetch(`https://api.unsplash.com/photos/${id}`, {
			headers: {
				Authorization: `Client-ID ${process.env.ACCESS_KEY}`
			}
		});
		const data = await res.json();
		return {
			props:  {
				image: data
			}
		};
	};
	
export default ImagePost;