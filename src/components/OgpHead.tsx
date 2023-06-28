import Head from "next/head";

interface Props {
  type: string;
  title: string;
  description: string;
  url: string;
  siteName: string;
  image: string;
  twitterCard: string;
  twitterSite: string;
}

const OgpHead = (props:Props) => {
  const {
    type,
    title,
    description,
    url,
    siteName,
    image,
    twitterCard,
    twitterSite,
  } = props;
  return (
    <Head>
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:site" content={twitterSite} />
    </Head>
  );
};

export default OgpHead;
