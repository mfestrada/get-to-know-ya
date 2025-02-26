export default function Options({ options, handleAnswer }) {
  return (
    <div className="options-list flex flex-col space-y-3">
      {options?.map((option, index) => (
        <button
          key={index}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
