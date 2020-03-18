import { AnimatePresence } from 'framer-motion';
import '../styles.css'


export default function MyApp({ Component, pageProps, router  }) {
  return (
		<AnimatePresence exitBeforeEnter>
			<Component {...pageProps} key={router.route} />
		</AnimatePresence>
	)
}
