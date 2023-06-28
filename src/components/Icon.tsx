import { Avatar } from "@nextui-org/react";
import { ReactNode } from "react";

const Icon = (props: {
  icon: ReactNode;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  isBordered?: boolean;
}) => {
  return (
    <Avatar
      size="sm"
      icon={props.icon}
    />
  );
};
export default Icon;