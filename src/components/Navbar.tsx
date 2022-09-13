import Image from "next/future/image";
import Link from "next/link";
import { ArrowUpRight } from "phosphor-react";
import React from "react";
import { TWITTER_URL } from "src/constants";
import theme from "src/styleguide/theme";
import Box from "./Box";
import Text from "./Text";

const Navbar = () => {
  return (
    <Box py="mxl" position="fixed" top="0" width="100vw">
      <Box width="128rem" mx="auto" between>
        <Link href="/" passHref>
          <Image
            src={"/brand.svg"}
            alt="schmint"
            width={120}
            height={30}
            style={{ cursor: "pointer" }}
          />
        </Link>
        <Box row alignItems="center">
          <Box
            as="a"
            href={TWITTER_URL}
            row
            alignItems="center"
            color="simply-black"
            cursor="pointer"
            css={`
              &:hover {
                color: ${theme.colors["blue-40"]};
              }
            `}
          >
            <Text as="nav" mr="2px">
              Twitter
            </Text>
            <ArrowUpRight size={16} weight="bold" />
          </Box>
          <Box
            as="button"
            border="none"
            height="4rem"
            bg="blue-40"
            color="gray-10"
            borderRadius="64px"
            px="mxl"
            ml="wxs"
            cursor="pointer"
            css={`
              &:hover {
                background: ${theme.colors["blue-50"]};
              }
            `}
          >
            <Text as="b2">Enter Waitlist</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
