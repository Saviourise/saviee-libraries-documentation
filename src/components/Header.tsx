import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  titleLink?: string;
}

export default function Header({ title, titleLink }: HeaderProps) {
  return (
    <header className="py-6">
      <div className="px-6 flex justify-between items-center max-w-7xl mx-auto">
        {titleLink ? (
          <Link
            to={titleLink}
            className="text-2xl font-bold text-white hover:text-purple-400 transition-colors"
          >
            {title}
          </Link>
        ) : (
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        )}
        <nav>
          <a
            href="https://github.com/saviourise"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white font-medium transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
