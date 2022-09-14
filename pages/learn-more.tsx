import React, { useEffect } from "react";
import Box from "src/components/Box";
import _ from "lodash";
import Image from "next/image";
import { motion } from "framer-motion";

const LearnMore = () => {
  const [image, setImage] = React.useState("");
  const [placeholder, setPlaceholder] = React.useState("");

  useEffect(() => {
    const randomize = () => {
      let randomNumber = _.random(0, 499);
      randomNumber = randomNumber % 4;
      randomNumber += 1;
      const img = `https://ik.imagekit.io/chainlabs/Schmint/gifs/${randomNumber}.gif`;
      const placeholder = `https://ik.imagekit.io/chainlabs/Schmint/placeholders/${randomNumber}.jpeg`;
      setImage(img);
      setPlaceholder(placeholder);
    };

    randomize();

    return () => {
      randomize();
    };
  }, []);

  return (
    <Box center height="100vh" width="100vw" bg="sky-blue-10">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            duration: 0.4,
            delay: 0.4,
            ease: "easeInOut",
          },
        }}
      >
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
      </motion.div>
    </Box>
  );
};

export default LearnMore;
