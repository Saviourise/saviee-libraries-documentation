import CodeUIToggle from "../../../../components/CodeUIToggle";
import { PomodoroTimer } from "./PomodoroTimer";

const pomodoroTimerCode = `import { useState, useEffect } from "react";
import { useTimedFlow } from "use-timed-flow";

export const PomodoroTimer = () => {
  const pomodoroSteps = [
    { label: "Work", duration: 25 * 60 * 1000, color: "red" },
    { label: "Short Break", duration: 5 * 60 * 1000, color: "green" },
    { label: "Work", duration: 25 * 60 * 1000, color: "red" },
    { label: "Long Break", duration: 15 * 60 * 1000, color: "blue" },
  ];

  // Use a fixed delay for the hook (will be updated via onStepChange)
  const [currentDelay, setCurrentDelay] = useState(pomodoroSteps[0].duration);

  const { current, next, prev, pause, resume, reset, running, goTo } =
    useTimedFlow({
      steps: pomodoroSteps.length,
      delay: currentDelay,
      loop: true,
      autoStart: false,
      onStepChange: (step) => {
        setCurrentDelay(pomodoroSteps[step].duration);
      },
    });

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return \`\${minutes.toString().padStart(2, "0")}:\${seconds
      .toString()
      .padStart(2, "0")}\`;
  };

  const currentStep = pomodoroSteps[current];
  const [timeRemaining, setTimeRemaining] = useState(currentStep.duration);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1000) {
          return currentStep.duration;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, currentStep.duration]);

  useEffect(() => {
    setTimeRemaining(currentStep.duration);
  }, [current]);

  return (
    <div className="bg-[#1A1A1A] p-8 rounded-xl border border-gray-800 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3
          className={\`text-2xl font-bold mb-4 \${
            currentStep.color === "red"
              ? "text-red-400"
              : currentStep.color === "green"
              ? "text-green-400"
              : "text-blue-400"
          }\`}
        >
          {currentStep.label}
        </h3>
        <div
          className={\`text-6xl font-mono font-bold mb-2 \${
            currentStep.color === "red"
              ? "text-red-400"
              : currentStep.color === "green"
              ? "text-green-400"
              : "text-blue-400"
          }\`}
        >
          {formatTime(timeRemaining)}
        </div>
        <p className="text-gray-400 text-sm">
          Duration: {Math.floor(currentStep.duration / 60000)} minutes
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 mb-6">
        {pomodoroSteps.map((step, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={\`px-2 py-1 rounded text-xs transition-colors \${
              current === index
                ? step.color === "red"
                  ? "bg-red-500 text-white"
                  : step.color === "green"
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }\`}
            title={step.label}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3 items-center flex-wrap justify-center mb-4">
        <button
          onClick={prev}
          className="bg-[#252525] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-lg transition-colors border border-gray-800"
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
          onClick={pause}
          disabled={!running}
          className="bg-yellow-900/30 hover:bg-yellow-900/50 disabled:opacity-50 disabled:cursor-not-allowed text-yellow-400 px-4 py-2 rounded-lg transition-colors border border-yellow-800/50"
        >
          Pause
        </button>
        <button
          onClick={resume}
          disabled={running}
          className="bg-green-900/30 hover:bg-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed text-green-400 px-4 py-2 rounded-lg transition-colors border border-green-800/50"
        >
          Resume
        </button>
        <button
          onClick={() => reset(0)}
          className="bg-red-900/30 hover:bg-red-900/50 text-red-400 px-4 py-2 rounded-lg transition-colors border border-red-800/50"
        >
          Reset
        </button>
      </div>

      {/* Status */}
      <div className="text-center">
        <span className="text-gray-300">
          {running ? (
            <span className="text-green-400 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Running ⏳
            </span>
          ) : (
            <span className="text-yellow-400">Paused ⏸️</span>
          )}
        </span>
      </div>
    </div>
  );
};`;

export default function PomodoroTimerWrapper() {
  return (
    <CodeUIToggle
      title="Live Example: Pomodoro Timer"
      description="A productivity timer using different durations for each step. Perfect for demonstrating dynamic delays and step-based workflows."
      code={pomodoroTimerCode}
      language="typescript"
    >
      <PomodoroTimer />
    </CodeUIToggle>
  );
}

