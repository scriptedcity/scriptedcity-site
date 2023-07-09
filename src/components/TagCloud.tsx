import { Chip } from "@components/nextui";
import Link from "next/link";

type Color =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

interface Props {
  tags: string[];
  className?: string;
  color?: Color;
  colorForFirstTag?: Color;
}

interface TagChipProps {
  tagName: string;
  renderAsLink?: boolean;
  color?: Color;
}

const TagChip = (props: TagChipProps) => {
  const { tagName, color, renderAsLink } = props;
  const chip = (
    <Chip
      color={color ?? "primary"}
      radius="sm"
      size="xs"
      classNames={{
        base: "whitespace-nowrap",
      }}
    >
      {tagName}
    </Chip>
  );
  if (!renderAsLink) {
    return chip;
  }
  return <Link href={`/tags/${tagName}`}>{chip}</Link>;
};

const TagCloud = (props: Props) => {
  const [firstTag, ...tags] = props.tags;
  const { color, colorForFirstTag } = props;
  return (
    <div className={`flex flex-wrap gap-2 ${props.className}`}>
      {firstTag && <TagChip tagName={firstTag} color={colorForFirstTag} />}
      {tags.map((tag) => (
        <TagChip key={tag} tagName={tag} color={color} />
      ))}
    </div>
  );
};

export default TagCloud;
