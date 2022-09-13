import { TwitterFill } from "akar-icons";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, TwitterLogo } from "phosphor-react";
import React from "react";
import { TWITTER_URL, WAITLIST_URL } from "src/constants";
import theme from "src/styleguide/theme";
import Box from "./Box";
import Text from "./Text";

const Navbar = () => {
  return (
    <Box py="mxl" position="fixed" top="0" width="100vw">
      <Box width={{ mobS: "95vw", deskM: "128rem" }} mx="auto" between>
        <Link href="/" passHref>
          <Box
            position="relative"
            height={{ mobS: "2.43rem", tabS: "3rem" }}
            width={{ mobS: "9.7rem", tabS: "12rem" }}
          >
            <Image
              src="/brand.svg"
              alt="schmint"
              style={{ cursor: "pointer" }}
              layout="fill"
            />
          </Box>
        </Link>
        <Box row alignItems="center">
          <Box
            as="a"
            href={TWITTER_URL}
            target="_blank"
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
            <Box display={{ mobS: "block", tabS: "none" }} mr="mxs">
              {/* @ts-expect-error unknown file type */}
              <TwitterFill size={25} color={theme.colors["blue-40"]} />
            </Box>
            <Text
              as="nav"
              mr="2px"
              display={{ mobS: "none", tabS: "block" }}
              row
              alignItems="center"
            >
              Twitter
            </Text>
            <Box height="16px" display={{ mobS: "none", tabS: "block" }}>
              <ArrowUpRight size={16} weight="bold" />
            </Box>
          </Box>
          {/* <Box
            as="a"
            href={WAITLIST_URL}
            target="_blank"
            border="none"
            height="4rem"
            bg="blue-40"
            color="gray-10"
            borderRadius="64px"
            px="mxl"
            ml={{ mobS: "0", deskM: "wxs" }}
            cursor="pointer"
            center
            css={`
              &:hover {
                background: ${theme.colors["blue-50"]};
              }
            `}
          >
            <Text as="b2">Enter Waitlist</Text>
          </Box> */}
          <Box
            as="a"
            href={WAITLIST_URL}
            target="_blank"
            ml={{ mobS: "0", tabS: "wxs" }}
            row
            alignItems="center"
            color="simply-black"
            cursor="pointer"
            bg="gray-10"
            border="1px solid"
            borderColor="gray-40"
            borderRadius="64px"
            height="4rem"
            px="mxl"
            css={`
              &:hover {
                background: ${theme.colors["simply-black"]};
                color: ${theme.colors["gray-10"]};
              }
              &:active {
                color: ${theme.colors["gray-40"]};
              }
            `}
          >
            <Text as="btn2" mr="2px">
              Enter Waitlist
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
