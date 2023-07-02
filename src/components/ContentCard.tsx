import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@components/nextui";
import TagCloud from "@components/TagCloud";

interface ContentCardProps {
  title: string;
  src: string;
  date: string;
  tags: string[];
}

const ContentCard = (props: ContentCardProps) => {
  const { title, src, date, tags } = props;
  return (
    <Card className="max-w-xs">
      <CardHeader className="flex-col !items-start px-4 py-0">
        <h4 className="text-left text-base">{title}</h4>
        <p className="text-left text-xs">{date?.slice(0, 10)}</p>
      </CardHeader>
      <CardBody>
        <Image isZoomed alt={title} src={src} height={400} />
      </CardBody>
      <CardFooter>
        <TagCloud tags={tags} />
      </CardFooter>
    </Card>
  );
};
export default ContentCard;
