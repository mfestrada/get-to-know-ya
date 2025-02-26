export default function AnimationOverlay({ gif, onContinue, correctAnswer, isCorrect }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 z-50" onClick={onContinue}>
      <img src={gif} className="max-w-full max-h-full" />
      <br />
      {isCorrect ? ('') : (
        <p className="text-white text-xl">The correct answer was <em>{correctAnswer()}</em></p>
      )}
    </div>
  );
}
