import { CheckCircleIcon } from "@chakra-ui/icons";
import { Td, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

const CircleIcon = (props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);

function ProgressBar({ problemID, parts }) {
  return (
    <Td>
      {parts.map((part, index) => (
        <IconButton
          key={part.id}
          aria-label={`Part ${index + 1}`}
          variant="ghost"
          icon={
            part.completed ? (
              <CheckCircleIcon color="green" boxSize={5} />
            ) : (
              <CircleIcon color="red.500" boxSize={6} />
            )
          }
          as={ReactRouterLink}
          to={`/user/problem/${problemID}/${index}`}
        />
      ))}
    </Td>
  );
}

export default ProgressBar;
