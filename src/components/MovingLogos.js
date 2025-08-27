// react
// next
import { Flex, Image } from "@chakra-ui/react";
import React from "react";

// --------------------------------------------------------
// You can change the speaker names here
// for smooth animation, make sure the number of names 5 Names only
const SPEAKER_NAME = [
  "/images/myskill.png",
  "/images/peoplyee.png",
  "/images/nti.png",
  "/images/hirata.png",
];
const MovingLogos = () => {
  return (
    <div className="slider">
      <div className="slide-track">
        {SPEAKER_NAME.map((name, index) => {
          return (
            <Flex
              flexDirection="row"
              alignItems="center"
              key={index}
              gap={4}
              className="slide"
            >
              <Image src={name} alt={name} />
            </Flex>
          );
        })}

        {/* Duplicate */}
        {SPEAKER_NAME.map((name, index) => {
          return (
            <Flex
              flexDirection="row"
              alignItems="center"
              key={index}
              gap={4}
              className="slide"
            >
              <Image src={name} alt={name} />
            </Flex>
          );
        })}
      </div>
    </div>
  );
};

export default MovingLogos;
