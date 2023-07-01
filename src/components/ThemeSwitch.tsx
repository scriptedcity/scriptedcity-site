import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@components/nextui";

import { themes } from "@const";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" radius="full">
          {themes.find((t) => t.name === theme)?.icon}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection actions"
        variant="solid"
        disallowEmptySelection
        selectionMode="single"
        onSelectionChange={(keys) => {
          setTheme(Array.from(keys)[0] as string);
        }}
      >
        {themes.map((theme) => (
          <DropdownItem key={theme.name} startContent={theme.icon}>
            {theme.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeSwitch;
