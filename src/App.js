import './App.css';
import { Question } from './Question';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState("Heeft u s'nachts last van oorsuizen?")
  const [currentAnswer, setCurrentAnswer] = useState();
  const [questionObject, setQuestionObject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yesFlag, setYesFlag] = useState(false);
  const [noFlag, setNoFlag] = useState(false);

  // Sets the next question based on questionId
  const setQuestionById = (id) => {
    for (let i = 0; i < questionObject.length; i++) {
      if (questionObject[i].id == id) {
        setCurrentQuestion(questionObject[i])
        return 0
      }
    }
  }

  const handleNextClick = ({e}) => {
    var vervolg = currentQuestion.vervolgVraag
    console.log(currentAnswer)

    // Case if questiontype is binary
    if (currentQuestion.antwoordType == "Binary"){
      // Iterate answers of this question and look for next question
      for (let i = 0; i < vervolg.length; i++) {
        if (vervolg[i][0] == currentAnswer) {
          setQuestionById(vervolg[i][1])
        }
      }
    }
    // Case is questiontype is Scale
    else if (currentQuestion.antwoordType == "Scale"){
      for (let i = 0; i < vervolg.length; i++) {
        if (vervolg[i][0][0] == ">") {
          if (currentAnswer > vervolg[i][0][1]){
            setQuestionById(vervolg[i][1])
          }
        } else if (vervolg[i][0][0] == "<") {
          if (currentAnswer < vervolg[i][0][1]){
            setQuestionById(vervolg[i][1])
          }
        }
      }
    }
    setYesFlag(false)
    setNoFlag(false)
  }

  useEffect(() => {
    async function fetchData() {
      var data = require('./VraagAdvies.json');
      setQuestionObject(data.vragen)
      setCurrentQuestion(data.vragen[0])
      setLoading(false)
		}
		fetchData()
	}, []);

  if (loading) {
		return (
			<div class="flex items-center flex-col shadow text-xs bg-white rounded-md">
				<div class="px-6 py-8 items-center">
					Laden....
				</div>
			</div>
		)
	} else {
    return (
      <div className="App flex flex-col justify-between h-screen">

        {/* Header */}
        <header className="App-header border -mb-12">
          <h1 className="">Tinnitus platform innovatieproject</h1>
        </header>

        {/* Body */}
        <div className='flex items-center justify-center h-4/6'>
          <div className="border-1 font-semibold rounded-md shadow-md p-12 bg-white">
            {/* Question */}
            <Question 
                questionText={currentQuestion.vraag} 
                answerType={currentQuestion.antwoordType}
                setAnswerFunc={setCurrentAnswer}
                clickHandler={handleNextClick}
                yesFlag={yesFlag}
                noFlag={noFlag}
                setYesFlag={setYesFlag}
                setNoFlag={setNoFlag}/>
            {/* 'Volgende' button if Scale answer */}
            <div className="mt-5">
                {(currentQuestion.antwoordType != null) && 
                <div className=''>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => handleNextClick(e)}>
                    Volgende
                </Button>
                </div>
                }
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className='text-xs'>
          Innovatieproject RadboudUMC 2023 | Door Wojtek, Dante, Savine en Julius
        </footer> 
      </div>
    );
  }
}

export default App;
