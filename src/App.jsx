

import React, { useEffect, useState } from "react";
import questions from "./question.json";
import Refresh from "./components/Refresh";
import Result from "./components/Result";


function App() {

  const [loadQuestions, setLoadQuestions] = useState(questions);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [showResult, setShowResult] = useState(false)
  const [changeButtonText, setChangeButtonText] = useState("show result");
  const [correctAns, setCorrectAns] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);
  const [percentage, setPercentage] = useState("");
  const [total, setTotal] = useState(10)
  const [score, setScore] = useState(parseInt(localStorage.getItem("attempt")));
  const [greeting, setGreeting] = useState("")


  const handleLoad = (e) => {
    console.log("on load", e);

    //get the user's name from local storage, if it exists
    let userName = localStorage.getItem("name");


    //check if the number of attempt has reached 3 

    const numberOfAttempts = 3
    const getNumber = parseInt(localStorage.getItem("attempt"));

    while (getNumber >= numberOfAttempts) {
      alert("You have reached the attempt limit for today,try again tommorrow.");
      return;
    }





    if (userName) {
      setGreeting(
        <h1 className="text-white text-2xl font-bold text-center">
          {`welcome back ${userName}`} </h1>
      )

    } else {

      userName = prompt("Please enter your name");
      localStorage.setItem("name", userName);
      localStorage.setItem("attempt", 0);
      setGreeting(
        <h1 className="text-white text-2xl font-bold text-center">
          {`welcome ${userName}`} </h1>
      )
    }

    if (userName === "") {
      alert("Please enter your name")
      userName = prompt("Please enter your name");
      localStorage.setItem("name", userName);
      setGreeting(
        <h1 className="text-white text-2xl font-bold text-center">
          {`welcome ${userName}`} </h1>
      )
    } else if (userName === null) {
      alert("Please enter your name")
      userName = prompt("Please enter your name");
      localStorage.setItem("name", userName);
      setGreeting(
        <h1 className="text-white text-2xl font-bold text-center">
          {`welcome ${userName}`} </h1>
      )
    } else {
      userName = ""
    }
  };


  useEffect(() => {
    setLoadQuestions(questions);
    window.addEventListener("load", handleLoad)
  }, []);



  const getSelectedButton = (e, quest, userAnswer) => {
    const correctAnswer = quest.answer;
    const sibling = e.target.nextElementSibling;


    if (userAnswer === correctAnswer) {
      sibling.classList.add('fa-solid', 'fa-circle-check', 'pl-3');
      setCorrectAns(ans => ans + 1)
    } else {
      sibling.classList.add('fa-solid', 'fa-circle-xmark', 'pl-3', 'text-red-500');
      setWrongAns(ans => ans + 1)
    }

    e.target.parentNode.setAttribute("disabled", "");


    const numberOfQuestions = questions.length;
    if (answeredCount === 9 && numberOfQuestions) {
      setScore(prevScore => prevScore + 1);

      //get current attempt count from local storage
      const currentAttempt = localStorage.getItem("attempt");
      localStorage.setItem("attempt", parseInt(currentAttempt) + 1);
    }





    setAnsweredCount(prevCount => prevCount + 1);
    setAnsweredQuestions(prevState => ({
      ...prevState,
      [quest.question]: true
    }));

  };

  const generateRandomString = () => Math.random().toString(36).substr(2, 5);

  const computeResult = () => {
    setShowResult(true);

    setChangeButtonText(prevText => prevText === "show result" ?
      "hide result" : "show result");

    changeButtonText === "hide result" && setShowResult(false);

    const answeredPercentage = Math.floor(correctAns / total * 100);
    // console.log("percent", answeredPercentage);


    if (answeredPercentage < 50) {
      setPercentage(`${answeredPercentage}%, You failed, try again 😂😁🤭`);
    } else if (answeredPercentage < 70) {
      setPercentage(`${answeredPercentage}%, Good, but you can do better 🙏🏻🙏🏻🙏🏻`)
    } else if (answeredPercentage >= 70) {
      setPercentage(`${answeredPercentage}%, Bravo!!! keep it up, much love 🥰💖😍`)
    }

  }


  return (
    <>

      <div className="w-80 mx-10 md:w-1/2  md:mx-auto mt-5" id="top-page">
        <h1 className="text-3xl text-center text-green-600 font-bold">Simple Question
          And Answer</h1>
        <p className="text-xl text-center text-green-500 mt-2">
          Click the detail arrow to view the answer.
        </p>
        <p className="text-md text-center text-green-500 ms-3">
          No Cheating 😂😁🤭, Try it yourself before unveiling the answer.
        </p>
      </div>

      <div className="bg-indigo-300 block mx-auto mt-3
       text-center text-white font-bold w-10 rounded-md">{score}</div>

      <div className="bg-orange-400 block mx-auto w-64 mt-3 rounded-md">{greeting}</div>

      <div className="ms-5 w-80 md:w-1/2 md:mx-auto mt-5">
        <p className="text-orange-400 text-xl font-semibold text-center">
          You have answered <span className="text-green-700">
            {answeredCount}</span> out of
          <span className="text-green-700"> {questions.length}</span> questions.
        </p>
        {answeredCount == questions.length && <a>
          <button onClick={computeResult} className="bg-green-700 text-white text-md 
            px-3 py-1 rounded-md font-semibold my-4">
            {changeButtonText}
          </button>
        </a>}
      </div>

      {showResult && <Result
        correctAnswer={correctAns}
        wrongAnswer={wrongAns}
        percentage={percentage}
      />}

      <div className=" w-80 md:w-1/2 mx-auto mt-3">
        <Refresh />
      </div>

      <div className="w-96 md:w-1/2 my-5 ms-0 md:mx-auto mt-5">
        {loadQuestions.map((quest, index) => (
          <section
            className={`w-96  md:w-full  p-10 shadow mb-4 ${answeredQuestions[quest.question] ?
              'bg-gray-300' : 'bg-white'}`}
            key={index}
          >
            <details>
              <summary className="pb-4 text-green-500 font-bold text-lg border-b-2">
                {index + 1}: {quest.question}
                <fieldset>
                  <br />
                  <input type="radio" name={`option${index}`} id={`${index + 1}-a-${generateRandomString()}`} onClick={(e) => getSelectedButton(e, quest, "A")} /> A: {quest.answerOptions.A} <i></i><br />
                  <input type="radio" name={`option${index}`} id={`${index + 1}-b-${generateRandomString()}`} onClick={(e) => getSelectedButton(e, quest, "B")} /> B: {quest.answerOptions.B} <i></i><br />
                  <input type="radio" name={`option${index}`} id={`${index + 1}-c-${generateRandomString()}`} onClick={(e) => getSelectedButton(e, quest, "C")} /> C: {quest.answerOptions.C} <i></i><br />
                  <input type="radio" name={`option${index}`} id={`${index + 1}-d-${generateRandomString()}`} onClick={(e) => getSelectedButton(e, quest, "D")} /> D: {quest.answerOptions.D} <i></i><br />
                </fieldset>
              </summary>
              <p className="text-green-600 text-3xl pt-3">{quest.answer}</p>
            </details>
          </section>
        ))}
      </div>

      <button className="text-green-500 border-2 border-green-500
      text-xl font-bold block mx-auto my-5 px-2 py-2 mb-10">
        <a href="#top-page">▲ go to top</a>
      </button>
    </>
  );
}


export default App;

