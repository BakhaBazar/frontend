import Link from "next/link";
import { Instagram, Youtube, Github } from "lucide-react";

type SocialIconProps = {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
};

const SocialIcon = ({ Icon, href }: SocialIconProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center min-w-[44px] min-h-[44px]"
  >
    <Icon
      size={24}
      className="cursor-pointer text-gray-300 hover:text-white transition-colors duration-200"
    />
  </a>
);

type FooterLinkSectionProps = {
  title: string;
  links: { href: string; text: string }[];
};

const FooterLinkSection = ({ title, links }: FooterLinkSectionProps) => (
  <div>
    {/* Centered text on small screens, left-aligned on medium and larger */}
    <h3 className="text-base font-semibold mb-4 text-white text-center md:text-left">
      {title}
    </h3>
    <ul className="space-y-2 text-sm text-gray-300 text-center md:text-left">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className="hover:text-white transition-colors duration-200"
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// --- Data for Links and Social Media ---
const About = [
  { href: "", text: "Podcasters" },
  { href: "", text: "AI Content" },
  { href: "", text: "Terms of Use" },
  { href: "", text: "Community Guidelines" },
  { href: "", text: "Privacy Policy" },
];
const Features = [
  { href: "", text: "Entities" },
  { href: "", text: "Legeneds and Myths" },
  { href: "", text: "Stories" },
  { href: "", text: "AI Generated Content" },
];

const socialIcons = [
  { Icon: Instagram, href: "https://www.instagram.com/" },
  { Icon: Github, href: "https://github.com/" },
  { Icon: Youtube, href: "https://www.youtube.com/" },
];

export default function Footer() {
  return (
    <footer className="relative bg-secondary-background text-primary-text pt-12 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col mx-auto max-w-screen-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Logo and Description */}
            <div className="md:col-span-1 flex flex-col items-center md:items-start">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white text-center md:text-left font-bebas-neue">
                BAKHABAZAR
              </h2>
              <p className="text-sm text-gray-300 mb-6 font-roboto max-w-xs text-center md:text-left">
                Step into the story bazaar: where Olden legends breathe again,
                carrying wisdom, laughter, and timeless culture{" "}
                <strong>Whispers of Heritage</strong>
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                {socialIcons.map(({ Icon, href }, index) => (
                  <SocialIcon key={index} Icon={Icon} href={href} />
                ))}
              </div>
            </div>

            {/* Link Sections */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10 font-roboto md:max-w-sm">
              <FooterLinkSection title="About & Contact" links={About} />
              <FooterLinkSection title="Features" links={Features} />
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="my-8 border-t border-highlight pt-6 text-center text-primary-text text-xs">
          <p>BAKHABAZAR © {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
