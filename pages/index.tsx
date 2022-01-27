import ImagePost from "../components/ImagePost";
import SearchInput from "../components/Search";
import Pagination from "../components/Pagination";
import fetch from "isomorphic-unfetch";
import { motion } from "framer-motion";
import { postVariants } from "../utils";

const Index = ({ images, totalPages, page }) => {
  return (
    <div>
      <div className="container">
        <h1>Unsplash Images</h1>
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
        <Pagination totalPages={totalPages} currentPage={page} marginTop={26} />
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
  );
};

export async function getServerSideProps({ query: { page = "1" } }) {
  try {
    const res = await fetch(`https://api.unsplash.com/photos?page=${page}`, {
      headers: {
        Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
      },
    });
    const data = await res.json();
    const totalPages = res.headers.get("x-total");

    return {
      props: {
        images: data.map((image) => image),
        page: parseInt(page, 10),
        totalPages,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export default Index;
