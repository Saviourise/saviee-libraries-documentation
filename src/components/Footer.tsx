import { FaGithub, FaTwitter } from "react-icons/fa";

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface FooterProps {
  socialLinks?: SocialLink[];
}

export default function Footer({ socialLinks }: FooterProps) {
  const defaultLinks: SocialLink[] = [
    {
      href: "https://github.com/saviourise",
      icon: <FaGithub className="w-4 h-4" />,
      label: "GitHub",
    },
    {
      href: "https://twitter.com/saviour_ise",
      icon: <FaTwitter className="w-4 h-4" />,
      label: "Twitter",
    },
  ];

  const links = socialLinks || defaultLinks;

  return (
    <footer className="py-16 px-6 mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h4 className="text-2xl font-bold mb-4 text-white">
          I'd love to hear your feedback{" "}
          <span className="text-pink-500">❤</span>
        </h4>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          👋 Hey! Don't hesitate to reach out on{" "}
          <a
            href="https://twitter.com/saviour_ise"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Twitter
          </a>
          . I'm always open to suggestions.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] rounded-lg px-4 py-2 border border-gray-800 transition-colors"
            >
              {link.icon}
              <span className="text-sm">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
