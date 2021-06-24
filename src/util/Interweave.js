import { Center, Heading, Link, Text } from "@chakra-ui/react";

export function transform(node, children){
    if(node.tagName.toLowerCase() === "h1"){       
        return (
          <Center mb={4}>
            <Heading size="lg">{children}</Heading>
          </Center>
        );
    }
    else if(node.tagName.toLowerCase() === "h2"){
      return (
        <Center mb={4}>
          <Heading size="md">{children}</Heading>
        </Center>
      );
    }
    else if(node.tageName.toLowerCase === "a"){
      return <Link href={node.getAttribute('href')} color="teal">{children}</Link>
    }
    else if(node.tagName.toLowerCase() === "p"){
        return <Text>{children}</Text>
    }
}