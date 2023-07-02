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
      <NavbarBrand as={Link} prefetch={false} href="/" className="flex">
        <BiSolidBuilding size={50} />
        <div className="hidden md:block">
          <p className="font-bold text-inherit">{SITE_NAME}</p>
          <p className="text-sm text-inherit">{SITE_DESCRIPTION}</p>
        </div>
      </NavbarBrand>
      <NavbarContent className="flex">
        {categories.map((category) => {
          return (
            <NavbarItem
              key={category}
              as={Link}
              href={`/posts/${category}`}
              prefetch={false}
              className="text-sm font-bold md:text-base"
            >
              {capitalize(category)}
            </NavbarItem>
          );
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <div className="hidden sm:flex h-full items-center justify-end gap-2">
          {links.map((link) => {
            return (
              <Tooltip key={link.name} showArrow={true} content={link.name}>
                <NavbarItem as={Link} href={link.uri} prefetch={false}>
                  <Icon icon={link.icon} />
                </NavbarItem>
              </Tooltip>
            );
          })}
          <ThemeSwitch />
        </div>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
