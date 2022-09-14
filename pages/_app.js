import { useEffect } from "react";
import { debounce } from "lodash";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import Navbar from "../src/components/Navbar";

import theme from "styleguide/theme";

import "styleguide/globalStyles.css";
import { ThemeProvider } from "styled-components";
import Box from "../src/components/Box";
import Text from "../src/components/Text";
import Image from "next/image";
import { SIMPLR_URL } from "../src/constants";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();
NProgress.configure({ showSpinner: false });

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Set a custom CSS Property for Height
    // See https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    if (process.browser) {
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      const handleResize = debounce(() => {
        // We execute the same script as before
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }, 150);

      window.addEventListener("resize", handleResize);
      return () => {
        if (process.browser) {
          window.removeEventListener("resize", handleResize);
        }
      };
    }
  });

  return (
    <>
      <Head>
        <title>Schmint | Never miss a mint!</title>
        <link
          rel="shortcut icon"
          href="https://ik.imagekit.io/chainlabs/Schmint/favicon_ESWMIZPwe.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1663072697489"
        />

        <meta name="robots" content="index, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Don't be a victm of FOMO, take control.Saw a cool NFT project on Twitter but it sold out even before you connected your wallet? Next time just schmint it."
        />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/chainlabs/Schmint/Preview_Cxn93vaqi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663072660516"
        />
        <link rel="canonical" href="https://schmint.simplrhq.com/" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        <script type="application/ld+json">{`{
					"@context": "https://schema.org/",
					"@type": "Organization",
					"name": "Schmint",
					"url": "https://schmint.simplrhq.com/",
      		"logo": "https://ik.imagekit.io/chainlabs/Schmint/brand_ast6C-3H3.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1663072697499",
					"description": "Don't be a victm of FOMO, take control.Saw a cool NFT project on Twitter but it sold out even before you connected your wallet? Next time just schmint it.",
					[
					{
						"@type": "Decentralized",
						"name": "Schmint",
						"description": "Don't be a victm of FOMO, take control.Saw a cool NFT project on Twitter but it sold out even before you connected your wallet? Next time just schmint it.",
					},
					]

}

`}</script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "dn44p6y6mg");`,
          }}
        ></script>
      </Head>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
        <Box center position="fixed" bottom="0" py="mxl" width="100vw">
          {/* <Text as="b2" color="simply-gray">
            A product
          </Text> */}
          <Box
            as="a"
            href={SIMPLR_URL}
            target="_blank"
            position="relative"
            height="3.3rem"
            width="11.1rem"
            // ml="mxxs"
          >
            <Image
              src="https://ik.imagekit.io/chainlabs/Schmint/simplr-brand_AziSwlVYT.svg"
              alt="Simplr"
              layout="fill"
            />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
