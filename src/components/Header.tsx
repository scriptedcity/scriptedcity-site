"use client";

import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from "@components/nextui";
import Link from "next/link";
import type { ReactNode } from "react";

import { BiSolidBuilding } from "react-icons/bi";
import { RxDropdownMenu } from "react-icons/rx";

import Icon from "@components/Icon";
import ThemeSwitch from "@components/ThemeSwitch";
import { SITE_DESCRIPTION, SITE_NAME } from "@const";
import { capitalize } from "@utils";

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
          <p className="logo font-bold text-inherit">{SITE_NAME}</p>
          <p className="logo text-inherit text-sm">{SITE_DESCRIPTION}</p>
        </div>
      </NavbarBrand>
      <NavbarContent className="px-4" justify="center">
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
                className="font-bold text-sm"
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
                <RxDropdownMenu size="20" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="none"
              aria-label="Single selection actions"
            >
              {["top", ...categories].map((category) => {
                return (
                  <DropdownItem key={category} textValue={category}>
                    <Button
                      fullWidth
                      size="sm"
                      as={Link}
                      href={category === "top" ? "/" : `/posts/${category}`}
                      prefetch={false}
                    >
                      {capitalize(category)}
                    </Button>
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
