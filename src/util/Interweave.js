import { Center, Heading, Image, Link, Text } from "@chakra-ui/react";

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
    else if(node.tagName.toLowerCase() === "a"){
      const regex = RegExp("(jpg|gif|png)$");

      if(regex.test(node.getAttribute("href"))){
        return (
          <Center m={4} maxW="sm">
            <Image src={node.getAttribute("href")} />
          </Center>
        );
      }
      
      return <Link href={node.getAttribute('href')} color="teal">{children}</Link>
    }
    else if(node.tagName.toLowerCase() === "p"){
        return <Text>{children}</Text>
    }
}