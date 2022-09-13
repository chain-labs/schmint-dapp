import Box from "src/components/Box";
import Text from "src/components/Text";
import theme from "src/styleguide/theme";

const Home = () => {
  return (
    <Box
      bg="sky-blue-10"
      height="100vh"
      width="100vw"
      color="simply-black"
      column
      center
    >
      <Box
        mx="auto"
        width="58rem"
        alignSelf={{ mobS: "flex-start", deskM: "center" }}
        column
        center
      >
        <Text as="h1" mb="mxl" textAlign="center">
          {"Don't be a victm of FOMO, take control."}
        </Text>
        <Text as="b1" textAlign="center" width="51.67rem">
          Saw a cool NFT project on Twitter but it sold out even before you
          connected your wallet? Next time just{" "}
          <span style={{ color: theme.colors["blue-40"] }}>schmint </span>
          it.
        </Text>
        <Box mt="wxs" row alignItems="center">
          <Box
            as="button"
            bg="blue-40"
            height="5.6rem"
            px="wxs"
            border="none"
            outline="none"
            borderRadius="64px"
            mr="mxxxl"
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
          <Text as="b1" color="blue-40">
            Learn More
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
