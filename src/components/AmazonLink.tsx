"use client";

const AmazonLink = (props: { src: string }) => {
  const { src } = props;
  return (
    <iframe title="src" style={{ width: "120px", height: "240px" }} src={src} />
  );
};
export default AmazonLink;
