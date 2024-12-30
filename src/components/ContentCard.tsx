import TagCloud from "@components/TagCloud";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@components/nextui";

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
      <CardHeader className="flex-col">
        <p className="pb-2 text-left text-slate-600 text-xs dark:text-slate-400">
          {date?.slice(0, 10)}
        </p>
        <Image isZoomed alt={title} src={src} height={400} />
      </CardHeader>
      <CardBody>
        <h4 className="text-left text-base">{title}</h4>
      </CardBody>
      <CardFooter>
        <TagCloud tags={tags} />
      </CardFooter>
    </Card>
  );
};
export default ContentCard;
