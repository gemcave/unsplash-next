import Link from 'next/link'

const ImagePost = ({image}) => {
	return (
		<Link  href='/images/[id]' as={`/images/${image.id}`}>
			<a>
				<img src={image.urls.small} alt={image.alt_description}/>
				<p className="name">{image.user.name} <span className="location">{image.user.location && image.user.location}</span></p>
				<p>{image.description ? image.alt_description : image.description }</p>
				<style jsx>{`
					a {
						text-decoration: none;
						color: #333;
					}
					.name {
						color: #111111;
					}
			`}</style>
			</a>
		</Link>
	)
}

export default ImagePost;