import { Avatar } from "@nextui-org/react";
import { ReactNode } from "react";

const Icon = (props: {
  icon: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
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
      size={props.size ?? "sm"}
      color={props.color ?? "default"}
      icon={props.icon}
    />
  );
};
export default Icon;
