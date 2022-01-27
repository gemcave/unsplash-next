import { FaInstagram, FaTwitterSquare } from "react-icons/fa";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { motion } from "framer-motion";
import Head from "next/head";

let easing = [0.175, 0.85, 0.42, 0.96];

const imageVariants = {
  exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
};

const textVariants = {
  exit: { y: 100, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5, ease: easing },
  },
};

const backVariants = {
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: easing,
    },
  },
};

const ImagePost = ({ image }) => {
  const {
    twitter_username,
    instagram_username,
    name: authorName,
    location,
  } = image.user;

  return (
    <>
      <Head>
        <title>Next Unsplash - {`${authorName}'s photo`}</title>
      </Head>
      <div className="container-image">
        <motion.div initial="exit" animate="enter" exit="exit">
          <motion.div variants={backVariants}>
            <Link href="/">
              <a>&larr;</a>
            </Link>
          </motion.div>
          <motion.div variants={textVariants}>
            <h2>
              {image.user.name} <span className="location">{location}</span>
            </h2>
          </motion.div>
          <div className="social">
            {instagram_username && (
              <a
                href={`https://www.instagram.com/${image.user.instagram_username}`}
              >
                <FaInstagram />
              </a>
            )}
            {twitter_username && (
              <a href={`https://twitter.com/${image.user.twitter_username}`}>
                <FaTwitterSquare />
              </a>
            )}
          </div>
          <div className="container-image__image">
            <motion.img
              style={{ maxWidth: 400, height: "auto" }}
              variants={imageVariants}
              src={image.urls.regular}
              alt={image.alt_description}
            />
          </div>
        </motion.div>
      </div>
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
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { id } = query;
  const apiUrl = "https://api.unsplash.com/photos/";

  const res = await fetch(`${apiUrl}${id}`, {
    headers: {
      Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
    },
  });
  const data = await res.json();
  return {
    props: {
      image: data,
    },
  };
}

export default ImagePost;
