import { Chip } from "@components/nextui";

interface Props {
  tags: string[];
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  colorForFirstTag?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

const TagCloud = (props: Props) => {
  const [firstTag, ...tags] = props.tags;
  const { color, colorForFirstTag } = props;
  return (
    <div className="flex flex-wrap gap-2">
      {firstTag && (
        <Chip
          color={colorForFirstTag ?? "primary"}
          radius="sm"
          size="xs"
          classNames={{
            base: "whitespace-nowrap",
          }}
        >
          {firstTag}
        </Chip>
      )}
      {tags.map((tag) => (
        <Chip
          key={tag}
          color={color ?? "primary"}
          radius="sm"
          size="xs"
          classNames={{
            base: "whitespace-nowrap",
          }}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
};

export default TagCloud;
