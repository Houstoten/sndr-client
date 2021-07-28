import React, {ReactNode} from "react";

import {Link} from "@chakra-ui/layout";
import {useColorModeValue} from "@chakra-ui/color-mode";

export const NavLink = ({ children, onClick }: { children: ReactNode , onClick: () => {}}) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        onClick={onClick}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);
