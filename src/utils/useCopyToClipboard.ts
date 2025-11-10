import { useState } from "react";

interface UseCopyToClipboardOptions {
  timeout?: number;
}

export function useCopyToClipboard(options: UseCopyToClipboardOptions = {}) {
  const { timeout = 2000 } = options;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
      return true;
    } catch (err) {
      // Fallback for older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (success) {
          setCopied(true);
          setTimeout(() => setCopied(false), timeout);
          return true;
        }
        return false;
      } catch (fallbackErr) {
        console.error("Failed to copy text:", fallbackErr);
        return false;
      }
    }
  };

  return { copied, copyToClipboard };
}
