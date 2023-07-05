import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@components/nextui";
import Link from "next/link";
import { ReactNode } from "react";

import { BiSolidBuilding } from "react-icons/bi";
import { BsFillMenuAppFill } from "react-icons/bs";

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
      <NavbarBrand
        as={Link}
        prefetch={false}
        href="/"
        className="hidden sm:flex"
      >
        <BiSolidBuilding size={30} />
        <div>
          <p className="font-bold text-inherit">{SITE_NAME}</p>
          <p className="text-sm text-inherit">{SITE_DESCRIPTION}</p>
        </div>
      </NavbarBrand>
      <NavbarContent className="px-4" justify="start">
        <ButtonGroup className="hidden lg:block">
          {categories.map((category) => {
            return (
              <Button
                key={category}
                as={Link}
                href={`/posts/${category}`}
                prefetch={false}
                size="sm"
                color="primary"
                className="text-sm font-bold"
              >
                {capitalize(category)}
              </Button>
            );
          })}
        </ButtonGroup>
        <div className="block lg:hidden">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <Button size="sm" color="primary" isIconOnly>
                <BsFillMenuAppFill />
              </Button>
            </DropdownTrigger>
            <DropdownMenu selectionMode="none">
              {categories.map((category) => {
                return (
                  <DropdownItem
                    key={category}
                    color="primary"
                    className="text-sm font-bold"
                  >
                    <Link href={`/posts/${category}`} prefetch={false}>
                      {capitalize(category)}
                    </Link>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <div className="flex h-full items-center justify-end gap-1">
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
