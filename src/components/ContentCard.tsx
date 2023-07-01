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
    <Card className="py-4 max-w-xs">
      <CardHeader className="pb-0 pt-2 px-4 flex-col !items-start">
        <h4 className="text-md text-left">{title}</h4>
        <p className="text-xs text-left">{date?.slice(0, 10)}</p>
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
