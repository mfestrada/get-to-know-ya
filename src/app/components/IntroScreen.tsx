import Image from "next/image";
import heart from "../../../public/assets/animations/heart.gif"

export default function IntroScreen({ onStart }) {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={heart.src}
        alt="Quiz background"
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover'
        }}
        quality={100}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center flex-wrap">Michael and Tania's{' '}
            <span className="inline-block overflow-hidden whitespace-nowrap w-24 mx-2">
              <span className="animate-marquee inline-block text-pink-500 font-comic-sans">Luvvv</span>
            </span> Quiz</h1>
          <p className="mb-4">Test your knowledge or get to know the bride and groom better!</p>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onStart}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}