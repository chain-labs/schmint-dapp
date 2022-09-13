import React, { useEffect } from "react";
import Box from "src/components/Box";
import _ from "lodash";
import Image from "next/image";

const LearnMore = () => {
  const [image, setImage] = React.useState("");
  const [placeholder, setPlaceholder] = React.useState("");

  useEffect(() => {
    const randomNumber = (_.random(0, 499) % 3) + 1;
    const img = `https://ik.imagekit.io/chainlabs/Schmint/gifs/${randomNumber}.gif`;
    const placeholder = `https://ik.imagekit.io/chainlabs/Schmint/placeholders/${randomNumber}.jpeg`;
    setImage(img);
    setPlaceholder(placeholder);
  }, []);

  return (
    <Box center height="100vh" width="100vw">
      <Box
        position="relative"
        width={{ mobS: "90vw", deskM: "90rem" }}
        height="50.67rem"
      >
        {image && (
          <Image
            src={image}
            alt="gif"
            layout="fill"
            objectFit="contain"
            placeholder="blur"
            blurDataURL={placeholder}
          />
        )}
      </Box>
    </Box>
  );
};

export default LearnMore;
