import React, { useContext } from "react";
import {
  Link,
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { AdminAuthContext } from "../../context/AdminAuth";
import { Link as ReactRouterLink } from "react-router-dom";
import Logo from "./Logo";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useContext(AdminAuthContext);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo w="100px" color="teal" />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      {user ? (
        <LoggedInMenuLinks isOpen={isOpen} />
      ) : (
        <MenuLinks isOpen={isOpen} />
      )}
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="teal"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="teal"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link as={ReactRouterLink} to={to} color="teal">
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const LoggedInMenuLinks = ({ isOpen }) => {
  const { logout } = useContext(AdminAuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <IconButton
          aria-label="Dark Mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          variant="ghost"
          onClick={toggleColorMode}
        />

        <MenuItem to="/admin">Home</MenuItem>
        <MenuItem to="/admin/add">New Problem</MenuItem>
        <MenuItem to="/admin/administrator">Administrators</MenuItem>
        <MenuItem to="/admin/administrator/add">Invite new Administrator</MenuItem>
        <MenuItem to="/admin/login" isLast>
          <Button
            size="sm"
            rounded="md"
            color="white"
            bg="teal.500"
            _hover={{
              bg: "teal.600",
            }}
            onClick={logout}
          >
            Sign out
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const MenuLinks = ({ isOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <IconButton
          aria-label="Dark Mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          variant="ghost"
          onClick={toggleColorMode}
        />
        <MenuItem to="/admin/login" isLast>
          <Button
            size="sm"
            rounded="md"
            color="white"
            bg="teal.500"
            _hover={{
              bg: "teal.600",
            }}
          >
            Login
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg="transparent"
      color="teal"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
