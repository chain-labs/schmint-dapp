import React, { useEffect } from "react";
import Box from "src/components/Box";
import _ from "lodash";
import Image from "next/image";

const LearnMore = () => {
  const [image, setImage] = React.useState("");

  useEffect(() => {
    const img = `https://ik.imagekit.io/chainlabs/Schmint/gifs/${_.random(
      1,
      4
    )}.gif`;
    setImage(img);
  }, []);

  return (
    <Box center height="100vh" width="100vw">
      <Box
        position="relative"
        width={{ mobS: "90vw", deskM: "90rem" }}
        height="50.67rem"
      >
        {image && (
          <Image src={image} alt="gif" layout="fill" objectFit="contain" />
        )}
      </Box>
    </Box>
  );
};

export default LearnMore;
