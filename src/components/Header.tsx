import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from "@components/nextui";
import Link from "next/link";
import { ReactNode } from "react";

import { BiSolidBuilding } from "react-icons/bi";

import Icon from "@components/Icon";
import ThemeSwitch from "@components/ThemeSwitch";
import { capitalize } from "@utils";
import { SITE_NAME, SITE_DESCRIPTION } from "@const";

interface Props {
  categories: string[];
  links: { name: string; uri: string; icon: ReactNode }[];
}

const Header = (props: Props) => {
  const { categories, links } = props;

  return (
    <Navbar position="sticky" maxWidth="lg">
      <NavbarBrand as={Link} href="/">
        <BiSolidBuilding size={50} />
        <div className="grid">
          <p className="font-bold sm:block text-inherit">{SITE_NAME}</p>
          <p className="sm:block font-xs text-inherit">{SITE_DESCRIPTION}</p>
        </div>
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
            <Tooltip key={link.name} showArrow={true} content={link.name}>
              <NavbarItem as={Link} href={link.uri}>
                <Icon icon={link.icon} />
              </NavbarItem>
            </Tooltip>
          );
        })}
        <ThemeSwitch />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
