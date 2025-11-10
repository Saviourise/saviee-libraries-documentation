import CodeUIToggle from "../../../../components/CodeUIToggle";
import { CarSlideshow } from "./CarSlideshow";

const carSlideshowCode = `import { useState } from "react";
import { useTimedFlow } from "use-timed-flow";

const images = [
  "https://placehold.co/600x300?text=Car+1",
  "https://placehold.co/600x300?text=Car+2",
  "https://placehold.co/600x300?text=Car+3",
  "https://placehold.co/600x300?text=Car+4",
  "https://placehold.co/600x300?text=Car+5",
];

export const CarSlideshow = () => {
  const [delay, setDelay] = useState(2000);
  const [autoStart, setAutoStart] = useState(true);
  const [loop, setLoop] = useState(true);

  const { current, pause, resume, next, prev, reset, running, goTo } =
    useTimedFlow({
      steps: images.length,
      delay: delay,
      loop: loop,
      autoStart: autoStart,
    });

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gray-800 max-w-2xl mx-auto">
      {/* Image Display */}
      <div
        onMouseEnter={pause}
        onMouseLeave={resume}
        className="overflow-hidden rounded-lg mb-4 relative"
      >
        <img
          src={images[current]}
          alt={\`car-\${current}\`}
          className="w-full transition-all duration-500"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-sm text-white">
          Slide {current + 1} of {images.length}
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 mb-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={\`w-3 h-3 rounded-full transition-all \${
              current === index
                ? "bg-purple-400 w-8"
                : "bg-gray-700 hover:bg-gray-600"
            }\`}
            aria-label={\`Go to slide \${index + 1}\`}
          />
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3 items-center flex-wrap mb-4">
        <button
          onClick={prev}
          disabled={!running && current === 0}
          className="bg-[#252525] hover:bg-[#2A2A2A] disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors border border-gray-800"
        >
          ← Prev
        </button>
        <button
          onClick={next}
          className="bg-[#252525] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-lg transition-colors border border-gray-800"
        >
          Next →
        </button>
        <button
          onClick={() => pause()}
          disabled={!running}
          className="bg-yellow-900/30 hover:bg-yellow-900/50 disabled:opacity-50 disabled:cursor-not-allowed text-yellow-400 px-4 py-2 rounded-lg transition-colors border border-yellow-800/50"
        >
          Pause
        </button>
        <button
          onClick={() => resume()}
          disabled={running}
          className="bg-green-900/30 hover:bg-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed text-green-400 px-4 py-2 rounded-lg transition-colors border border-green-800/50"
        >
          Resume
        </button>
        <button
          onClick={() => reset()}
          className="bg-red-900/30 hover:bg-red-900/50 text-red-400 px-4 py-2 rounded-lg transition-colors border border-red-800/50"
        >
          Reset
        </button>
        <button
          onClick={() => reset(0)}
          className="bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 px-3 py-2 rounded-lg transition-colors border border-blue-800/50 text-sm"
          title="Reset to first slide"
        >
          Reset to Start
        </button>
        <span className="ml-auto font-medium text-gray-300">
          {running ? (
            <span className="text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Running
            </span>
          ) : (
            <span className="text-yellow-400">Paused</span>
          )}
        </span>
      </div>

      {/* Advanced Controls */}
      <div className="mt-6 pt-6 border-t border-gray-800 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Delay: {delay}ms
          </label>
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>500ms</span>
            <span>5000ms</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">
            Auto Start:
          </label>
          <button
            onClick={() => {
              setAutoStart(!autoStart);
              if (!autoStart) {
                resume();
              } else {
                pause();
              }
            }}
            className={\`relative inline-flex h-6 w-11 items-center rounded-full transition-colors \${
              autoStart ? "bg-purple-500" : "bg-gray-700"
            }\`}
          >
            <span
              className={\`inline-block h-4 w-4 transform rounded-full bg-white transition-transform \${
                autoStart ? "translate-x-6" : "translate-x-1"
              }\`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">Loop:</label>
          <button
            onClick={() => setLoop(!loop)}
            className={\`relative inline-flex h-6 w-11 items-center rounded-full transition-colors \${
              loop ? "bg-purple-500" : "bg-gray-700"
            }\`}
          >
            <span
              className={\`inline-block h-4 w-4 transform rounded-full bg-white transition-transform \${
                loop ? "translate-x-6" : "translate-x-1"
              }\`}
            />
          </button>
        </div>

        {/* Quick Jump Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quick Jump:
          </label>
          <div className="flex gap-2 flex-wrap">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={\`px-3 py-1 rounded text-sm transition-colors \${
                  current === index
                    ? "bg-purple-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }\`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};`;

export default function CarSlideshowWrapper() {
  return (
    <CodeUIToggle
      title="Live Example: Car Slideshow"
      description="Hover over the image to pause the slideshow. Use the buttons and controls to explore all the library features."
      code={carSlideshowCode}
      language="typescript"
    >
      <CarSlideshow />
    </CodeUIToggle>
  );
}
