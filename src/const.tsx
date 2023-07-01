// metadata
export const SITE_NAME = "Scripted City Revised.";
export const SITE_DESCRIPTION = "millstones web site";
export const TITLE_SEPARATOR = "|";
export const SITE_URL = "https://scriptedcity.aroundhalf.info";

/**
    process.env.NODE_ENV === "development" ? "http://localhost:3000" :
     */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s ${TITLE_SEPARATOR} ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: "@millstones",
    creator: "@millstones",
  },
  verification: {
    google: "xBmY1GsnUe-RXaqgUAkSF9bTpqEx-r0bs0A8dtQDOho",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// theme
import { MdOutlineModeNight, MdOutlineLightMode } from "react-icons/md";
import { TbSunMoon } from "react-icons/tb";

export const themes = [
  {
    name: "system",
    icon: <TbSunMoon size="1.5em" />,
    label: "System",
  },
  {
    name: "dark",
    icon: <MdOutlineModeNight size="1.5em" />,
    label: "Dark",
  },
  {
    name: "light",
    icon: <MdOutlineLightMode size="1.5em" />,
    label: "Light",
  },
];

// links
import { FaGithub, FaYoutube, FaTwitter, FaRegEnvelope } from "react-icons/fa";
import { SiNiconico } from "react-icons/si";

export const LINKS = [
  {
    name: "GitHub",
    icon: <FaGithub size="1.5em" />,
    uri: "https://github.com/scriptedcity",
  },
  {
    name: "Twitter",
    icon: <FaTwitter size="1.5em" />,
    uri: "https://twitter.com/millstones",
  },
  {
    name: "YouTube",
    icon: <FaYoutube size="1.5em" />,
    uri: "https://www.youtube.com/@millstones",
  },
  {
    name: "Niconico",
    icon: <SiNiconico size="1.5em" />,
    uri: "https://www.nicovideo.jp/user/669463/mylist/1925013",
  },
  {
    name: "Contact",
    icon: <FaRegEnvelope size="1.5em" />,
    uri: "https://docs.google.com/forms/d/e/1FAIpQLScuByL4_KEgxbubaXRQsPrIWrQ9a6iTdv_uuesI698vACp1cg/viewform",
  },
];
