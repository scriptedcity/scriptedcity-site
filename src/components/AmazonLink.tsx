"use client";

const AmazonLink = (props: { src: string }) => {
  const { src } = props;
  return (
    <iframe style={{ width: "120px", height: "240px" }} src={src}></iframe>
  );
};
export default AmazonLink;
