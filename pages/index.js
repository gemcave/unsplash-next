import ImagePost from '../components/ImagePost';
import SearchInput from '../components/Search';
import Pagination from '../components/Pagination';
import fetch from 'isomorphic-unfetch';
import { motion } from 'framer-motion';

const postVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] } },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] }
  }
};

const Index = ({images, totalPages, page}) => {
	return (
		<div>
			<div className="container">
				<h1>Unsplah Images</h1>
				<SearchInput />
				<motion.div
							initial="initial"
							animate="enter"
							exit="exit"
							variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
						>
					<div className="images">
						{images.map((image) => (
								<motion.div variants={postVariants} key={image.id}>
									<ImagePost image={image} />
								</motion.div>
						))}
					</div>
				</motion.div>
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