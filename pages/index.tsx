import Link from "next/link";
import Box from "src/components/Box";
import Text from "src/components/Text";
import { DISCORD_INVITE } from "src/constants";
import theme from "src/styleguide/theme";

const Home = () => {
  return (
    <Box
      bg="sky-blue-10"
      height="100vh"
      width="100vw"
      color="simply-black"
      column
      justifyContent="center"
    >
      <Box
        mx="auto"
        width={{ mobS: "30.72rem", tabS: "50rem", deskM: "58rem" }}
        alignSelf={{ mobS: "flex-start", deskM: "center" }}
        column
        center
      >
        <Text as="h1" mb={{ mobS: "mm", deskM: "mxl" }} textAlign="center">
          {"Don't be a victm of FOMO, take control."}
        </Text>
        <Text
          as="b1"
          textAlign="center"
          width={{ mobS: "30.72rem", tabS: "51rem", deskM: "51.67rem" }}
        >
          Saw a cool NFT project on Twitter but it sold out even before you
          connected your wallet? Next time just{" "}
          <span style={{ color: theme.colors["blue-40"] }}>schmint </span>
          it.
        </Text>
        <Box mt="wxs" row alignItems="center">
          <Box
            as="a"
            href={DISCORD_INVITE}
            target="_blank"
            center
            bg="blue-40"
            height={{ mobS: "4.8rem", deskM: "5.6rem" }}
            px={{ mobS: "mxxxl", deskM: "wxs" }}
            border="none"
            outline="none"
            borderRadius="64px"
            mr="mxl"
            cursor="pointer"
            css={`
              &:hover {
                background: ${theme.colors["blue-50"]};
              }
            `}
          >
            <Text as="b1" color="simply-white">
              Join Discord
            </Text>
          </Box>
          <Link href="/learn-more" passHref>
            <Box
              css={`
              color: :${theme.colors["blue-40"]};
                &:hover {
                  text-decoration: underline;
                }
              `}
            >
              <Text as="b1" color="blue-40" cursor="pointer">
                Learn More
              </Text>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
