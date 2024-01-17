"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const { status } = useSession();
  const path = usePathname();
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    className={classnames({
                      "text-zinc-900": href === path,
                      "text-zinc-500": href !== path,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            <Box>
              {status === "authenticated" && (
                <Link href="/api/auth/signout">Logout</Link>
              )}
              {status === "unauthenticated" && (
                <Link href="/api/auth/signin">Login</Link>
              )}
            </Box>
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
