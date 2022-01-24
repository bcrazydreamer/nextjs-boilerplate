import { ThemeProvider } from "../theme/mui";
import "../styles/globals.scss";

function MyApp({ Component, pageProps, router = {} }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} data={router.query} />
    </ThemeProvider>
  );
}

export default MyApp;
