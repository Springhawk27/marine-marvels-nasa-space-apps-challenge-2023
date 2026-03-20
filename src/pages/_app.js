import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps, router }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <AnimatePresence mode="wait" initial={false}>
      <Component {...pageProps} key={router.pathname} />
    </AnimatePresence>
  );
}
