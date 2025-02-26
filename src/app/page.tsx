"use client";

import { useState } from "react";

import AnimationOverlay from '@/app/components/AnimationOverlay';
import IntroScreen from "@/app/components/IntroScreen";
import Options from "@/app/components/Options";

export default function Home() {
  // game states
  const [gameOver, setGameOver] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  
  // question states
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [score, setScore] = useState(0);

  // animation states
  const [currentGif, setCurrentGif] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  const [celebrationGifs, sadGifs] = [
    [
      'assets/animations/claire-dancing.gif',
      'assets/animations/happy-dance.gif',
      'assets/animations/party-time.gif',
      'assets/animations/peach-cat-goma.gif',
      'assets/animations/confetti-cute.gif',
      'assets/animations/puppy.gif'
    ],
    [
      'assets/animations/alexis-jandard-diving.gif',
      'assets/animations/mimochai-cute.gif',
      'assets/animations/rabbit-animal.gif',
      'assets/animations/bart-simpson-the-simpsons.gif',
      'assets/animations/chihuahua-cane.gif',
      'assets/animations/cat-fail.gif',
      'assets/animations/sad-chihuahua.gif'
    ]
  ];

  const questions = [
    {
      id: 1,
      question: "How often do they go to Monterey?",
      options: ['All the time!', 'Never'],
      correct: 'All the time!'
    },
    {
      id: 2,
      question: 'Who has a bigger record collection?',
      options: ['Michael', 'Tania', 'Ixchel'],
      correct: 'Ixchel'
    },
    {
      id: 3,
      question: 'Who knows how to bust a move?',
      options: ['Michael', 'Tania', 'They both do!'],
      correct: 'They both do!'
    },
    {
      id: 4,
      question: "Who is Tania's favorite musician?",
      options: ['Joe Bataan', 'Michael'],
      correct: 'Joe Bataan'
    },
    {
      id: 5,
      question: "Why is Michael's birthday significant to Tania?",
      options: [
        "It's the same day as Santanas birthday",
        "It's the same day as Bruce Lee birthday",
        "It's the same days as Bruce Lee and Jimmi Hendrix birthday"
      ],
      correct: "It's the same days as Bruce Lee and Jimmi Hendrix birthday"
    },
    {
      id: 6,
      question: "Who made the first move?",
      options: ["Michael", "Tania", "They booth did, shoot"],
      correct: "They booth did, shoot"
    },
    {
      id: 7,
      question: "What is Tania and Michael's love language?",
      options: ["Showing affection", "Being total weirdos together", "Spending time outdoors"],
      correct: 'Being total weirdos together',
    },
    {
      id: 8,
      question: "What do Michael and Tania bond over?",
      options: ['Food', 'Reading', 'Music'],
      correct: 'Music',
    },
    {
      id: 9,
      question: "How many kids does Tania have?",
      options: ["Seven", "Three", "Four"],
      correct: "Four"
    },
    {
      id: 10,
      question: "Heres another question?",
      options: ["yes", "no"],
      correct: "no"
    },
  ];

  const handleAnswer = (option: string) => {
    const _answers = [...answers];
    _answers.push(JSON.stringify({ question: currentQuestion, option }));
    setAnswers(_answers);

    // check answer for current question
    if (!(option in _answers)) {
      const correctAnswer = questions[currentQuestion].correct;
      if (option === correctAnswer) {
        setCorrectAnswer(true);
        setCurrentGif(celebrationGifs[Math.floor(Math.random() * celebrationGifs.length)]);
        setScore(score + 1);
        setShowAnimation(true);
      } else {
        setCorrectAnswer(false);
        setCurrentGif(sadGifs[Math.floor(Math.random() * sadGifs.length)]);
        setShowAnimation(true);
      }
    }

    // check if any questions are remaining
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // increment currentQuestion one last time for the last correctAnswer
      setCurrentQuestion(currentQuestion + 1);
      setGameOver(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center">
        {showIntro ? (
          <IntroScreen onStart={() => setShowIntro(false)} />
        ) : showAnimation ? (
          <AnimationOverlay
            correctAnswer={() => {
              return currentQuestion < questions.length
                ? questions[currentQuestion - 1].correct : questions.slice(-1)[0].correct              
            }}
            gif={currentGif}
            isCorrect={correctAnswer}
            onContinue={() => {
              setShowAnimation(false);
            }}
          />
        ) : gameOver ? (
          <div className="result-section text-center">
            <h1 className="text-2xl font-bold mb-4">Quiz Complete!</h1>
            <p className="text-xl mb-4">Score: {score} / {questions.length}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setAnswers([]);
                setCorrectAnswer(false);
                setCurrentQuestion(0);
                setGameOver(false);
                setScore(0);
                setShowIntro(false);
              }}>Play Again</button>
          </div>
        ) : (
          currentQuestion < questions.length && (
            <div className="question-section w-full max-w-md">
              <div className="bg-purple-900 rounded-lg p-4 mb-4 text-center">
                <p className="text-lg font-semibold text-white"><span>{questions[currentQuestion].id}.</span> {questions[currentQuestion].question}</p>
              </div>
              <Options options={questions[currentQuestion].options} handleAnswer={handleAnswer} />
            </div>
          )
        )}
      </div>
    </div>
  )
}
