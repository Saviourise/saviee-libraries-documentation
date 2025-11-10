import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaGithub, FaNpm, FaTwitter } from "react-icons/fa";
import CarSlideshowWrapper from "./examples/CarSlideshowWrapper";
import PomodoroTimerWrapper from "./examples/PomodoroTimerWrapper";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { useCopyToClipboard } from "../../../utils/useCopyToClipboard";

export default function UseTimedFlowDocs() {
  const { copied, copyToClipboard } = useCopyToClipboard();

  const handleCopy = (text: string) => {
    copyToClipboard(text);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Header title="My Libraries" titleLink="/" />

      {/* Hero Section */}
      <section className="text-center py-12 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          useTimedFlow
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          A React hook to manage timed sequential flows easily. Perfect for
          slideshows, step-by-step tutorials, or any sequential UI flow.
        </p>

        {/* Installation Command Box */}
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <div className="relative flex items-center bg-[#1A1A1A] rounded-lg px-4 py-3 border border-gray-800">
            <code className="text-gray-200 font-mono text-sm md:text-base pr-8">
              <span className="font-serif">$</span> npm install use-timed-flow
            </code>
            <button
              onClick={() => handleCopy("npm install use-timed-flow")}
              className="absolute right-2 p-1.5 hover:bg-gray-800 rounded transition-colors"
              aria-label="Copy command"
            >
              <FaCopy className="w-4 h-4" />
            </button>
          </div>
          <a
            href="https://github.com/Saviourise/use-timed-flow"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] rounded-lg px-4 py-3 border border-gray-800 transition-colors"
          >
            <FaGithub className="w-5 h-5" />
            <span className="text-sm font-medium">View on GitHub</span>
          </a>
          <a
            href="https://www.npmjs.com/package/use-timed-flow"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] rounded-lg px-4 py-3 border border-gray-800 transition-colors"
          >
            <FaNpm className="w-5 h-5" />
            <span className="text-sm font-medium">View on npm</span>
          </a>
        </div>
        {copied && (
          <p className="text-green-400 text-sm mt-2">Copied to clipboard!</p>
        )}
      </section>

      {/* About */}
      <section className="mb-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-white">About</h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          <code className="text-purple-400">useTimedFlow</code> is a custom
          React hook to handle timed sequences with controls like next,
          previous, pause, resume, and reset. Perfect for slideshows,
          step-by-step tutorials, or any sequential UI flow.
        </p>
      </section>

      {/* Live Example */}
      <section className="mb-16 px-6 max-w-4xl mx-auto">
        <CarSlideshowWrapper />
      </section>

      {/* Pomodoro Timer Example */}
      <section className="mb-16 px-6 max-w-4xl mx-auto">
        <PomodoroTimerWrapper />
      </section>

      {/* How to Use */}
      <section className="mb-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-white">How to Use</h2>
        <div className="relative">
          <div className="rounded-lg overflow-hidden border border-gray-800">
            <SyntaxHighlighter
              language="typescript"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                backgroundColor: "#1A1A1A",
                borderRadius: "0.5rem",
              }}
              codeTagProps={{
                style: {
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                },
              }}
            >
              {`import { useTimedFlow } from 'use-timed-flow';

const { current, pause, resume, next, prev, reset, running } = useTimedFlow({
  steps: 3,
  delay: 2000,
  loop: true,
});`}
            </SyntaxHighlighter>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCopy(`import { useTimedFlow } from 'use-timed-flow';

const { current, pause, resume, next, prev, reset, running } = useTimedFlow({
  steps: 3,
  delay: 2000,
  loop: true,
});`);
            }}
            className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded transition-colors bg-[#1A1A1A] border border-gray-800 z-10 cursor-pointer text-gray-300 hover:text-white"
            aria-label="Copy code"
            type="button"
          >
            <FaCopy className="w-4 h-4" />
          </button>
        </div>
        {copied && (
          <p className="text-green-400 text-sm mt-2">Copied to clipboard!</p>
        )}
        <p className="text-gray-400 mt-4">
          Then use the returned values to control your flow and render content
          based on the <code className="text-purple-400">current</code> step.
        </p>
      </section>

      <Footer
        socialLinks={[
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
          {
            href: "https://www.npmjs.com/package/use-timed-flow",
            icon: <FaNpm className="w-4 h-4" />,
            label: "npm",
          },
        ]}
      />
    </div>
  );
}
