import { Link } from "react-router-dom";
import { FaCode, FaCopy, FaGithub } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCopyToClipboard } from "../utils/useCopyToClipboard";

const libraries = [
  {
    name: "use-timed-flow",
    description: "A React hook to manage timed sequential flows easily.",
    version: "v1.0.0",
    link: "/libraries/use-timed-flow",
    icon: "⚡",
  },
  // future libraries can be added here
];

export default function HomePage() {
  const { copied, copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard("npm install use-timed-flow");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Header title="Saviee Libraries" />

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <div className="mb-8 flex justify-center">
          <div className="text-purple-400">
            <FaCode className="w-20 h-20 mx-auto" />
          </div>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          Build Faster with Saviee Libraries
        </h2>
        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
          Explore and use lightweight, easy-to-integrate React libraries that
          simplify common tasks.
        </p>

        {/* Installation Command Box */}
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <div className="relative flex items-center bg-[#1A1A1A] rounded-lg px-4 py-3 border border-gray-800">
            <code className="text-gray-200 font-mono text-sm md:text-base pr-8">
              <span className="font-serif">$</span> npm install use-timed-flow
            </code>
            <button
              onClick={handleCopy}
              className="absolute right-2 p-1.5 hover:bg-gray-800 rounded transition-colors"
              aria-label="Copy command"
            >
              <FaCopy className="w-4 h-4" />
            </button>
          </div>
          <a
            href="https://github.com/saviourise"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] rounded-lg px-4 py-3 border border-gray-800 transition-colors"
          >
            <FaGithub className="w-5 h-5" />
            <span className="text-sm font-medium">View on GitHub</span>
          </a>
        </div>
        {copied && (
          <p className="text-green-400 text-sm mt-2">Copied to clipboard!</p>
        )}
      </section>

      {/* Libraries Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-3 text-center text-white">
          Have you ever needed simple, powerful React hooks?
        </h3>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Me too! These libraries make building React applications faster and
          more enjoyable.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {libraries.map((lib) => (
            <Link
              key={lib.name}
              to={lib.link}
              className="p-6 bg-[#1A1A1A] rounded-lg border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg group"
            >
              <div className="text-3xl mb-4">{lib.icon}</div>
              <h4 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                {lib.name}
              </h4>
              <p className="text-gray-400 mb-4">{lib.description}</p>
              <div className="flex items-center justify-between">
                <span className="inline-block px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-300">
                  {lib.version}
                </span>
                <span className="text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
