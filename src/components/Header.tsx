import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@components/nextui";
import Link from "next/link";
import { ReactNode } from "react";

import { BiSolidBuilding } from "react-icons/bi";

import Icon from "@components/Icon";
import ThemeSwitch from "@components/ThemeSwitch";
import { capitalize } from "@utils";

interface Props {
  categories: string[];
  links: { name: string; uri: string; icon: ReactNode }[];
}

const Header = (props: Props) => {
  const { categories, links } = props;

  return (
    <Navbar position="sticky" maxWidth="lg">
      <NavbarBrand as={Link} href="/">
        <BiSolidBuilding />
        <p className="font-bold sm:block text-inherit">LOGO</p>
      </NavbarBrand>
      <NavbarContent className="md:flex">
        {categories.map((category) => {
          return (
            <NavbarItem key={category} as={Link} href={`/posts/${category}`}>
              {capitalize(category)}
            </NavbarItem>
          );
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        {links.map((link) => {
          return (
            <NavbarItem key={link.name} as={Link} href={link.uri}>
              <Icon icon={link.icon} />
            </NavbarItem>
          );
        })}
        <ThemeSwitch />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
