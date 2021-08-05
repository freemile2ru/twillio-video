import React from 'react';
import {
  Link,
  Stack,
  useBreakpoint,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '../context/auth';

export function Nav() {
  const { isProvider, user } = useAuth();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'base';

  return isMobile ? (
    <Menu>
      <MenuButton as={Button} variant="outline" colorScheme="lightPurple" ml="auto">
        =
      </MenuButton>

      <MenuList width="full">
        <MenuItem>
          <NextLink href="/">Home</NextLink>
        </MenuItem>
        {!isProvider && user && (
          <MenuItem>
            <NextLink href="/patient">Patient</NextLink>
          </MenuItem>
        )}

        {isProvider && user && (
          <MenuItem>
            <Link href="/provider">Provider</Link>
          </MenuItem>
        )}

        <MenuItem>
          <Link href="/">Video</Link>
        </MenuItem>

        <MenuItem>
          <Link href="https://github.com/echobind" isExternal>
            External
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Stack as="nav" direction="row" ml="auto" alignItems="center" fontSize="md" spacing={8}>
      <NextLink href="/">
        <Link href="">Home</Link>
      </NextLink>

      {!isProvider && user && <Link href="/patient">Patient</Link>}
      {isProvider && user && <Link href="/provider">Provider</Link>}
      <Link href="/video">Video</Link>
      <Link href="https://github.com/echobind/" isExternal>
        External
      </Link>
    </Stack>
  );
}
