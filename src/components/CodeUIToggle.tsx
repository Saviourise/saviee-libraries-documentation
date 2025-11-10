import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaCode, FaEye } from "react-icons/fa";
import { useCopyToClipboard } from "../utils/useCopyToClipboard";

interface CodeUIToggleProps {
  title: string;
  description?: string;
  code: string;
  language?: string;
  children: React.ReactNode;
}

export default function CodeUIToggle({
  title,
  description,
  code,
  language = "typescript",
  children,
}: CodeUIToggleProps) {
  const [view, setView] = useState<"ui" | "code">("ui");
  const { copied, copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(code);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          {description && <p className="text-gray-400 mt-2">{description}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => setView("ui")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border cursor-pointer ${
            view === "ui"
              ? "bg-purple-500 text-white border-purple-500"
              : "bg-[#1A1A1A] text-gray-300 border-gray-800 hover:bg-[#252525]"
          }`}
          aria-label="View UI"
        >
          <FaEye className="w-4 h-4" />
          <span className="text-sm font-medium">UI</span>
        </button>
        <button
          onClick={() => setView("code")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border cursor-pointer ${
            view === "code"
              ? "bg-purple-500 text-white border-purple-500"
              : "bg-[#1A1A1A] text-gray-300 border-gray-800 hover:bg-[#252525]"
          }`}
          aria-label="View Code"
        >
          <FaCode className="w-4 h-4" />
          <span className="text-sm font-medium">Code</span>
        </button>
      </div>

      {view === "ui" ? (
        <div>{children}</div>
      ) : (
        <div className="relative">
          <div className="custom-scrollbar rounded-lg border border-gray-800 max-h-[600px] overflow-y-auto">
            <SyntaxHighlighter
              language={language}
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
              PreTag="div"
            >
              {code}
            </SyntaxHighlighter>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCopy();
            }}
            className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded transition-colors bg-[#1A1A1A] border border-gray-800 z-10 cursor-pointer text-gray-300 hover:text-white"
            aria-label="Copy code"
            type="button"
          >
            <FaCopy className="w-4 h-4" />
          </button>
          {copied && (
            <p className="text-green-400 text-sm mt-2 absolute top-12 right-4">
              Copied to clipboard!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
