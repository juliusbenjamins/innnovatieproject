import './App.css';
import { Question } from './Question';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function refreshPage() {
  window.location.reload(false);
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState("Heeft u s'nachts last van oorsuizen?")
  const [currentAnswer, setCurrentAnswer] = useState();
  const [questionObject, setQuestionObject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yesFlag, setYesFlag] = useState(false);
  const [noFlag, setNoFlag] = useState(false);
  const [startQuestionnaire, setStartQuestionnaire] = useState(false);

  // Sets the next question based on questionId
  const setQuestionById = (id) => {
    for (let i = 0; i < questionObject.length; i++) {
      if (questionObject[i].id == id) {
        setCurrentQuestion(questionObject[i])
        return 0
      }
    }
  }

  const handleNextClick = ({ e }) => {
    var vervolg = currentQuestion.vervolgVraag
    console.log(currentAnswer)

    // Case if questiontype is binary
    if (currentQuestion.antwoordType == "Binary") {
      // Iterate answers of this question and look for next question
      for (let i = 0; i < vervolg.length; i++) {
        if (vervolg[i][0] == currentAnswer) {
          setQuestionById(vervolg[i][1])
        }
      }
    }
    // Case is questiontype is Scale
    else if (currentQuestion.antwoordType == "Scale") {
      for (let i = 0; i < vervolg.length; i++) {
        if (vervolg[i][0][0] == ">") {
          if (currentAnswer > vervolg[i][0][1]) {
            setQuestionById(vervolg[i][1])
          }
        } else if (vervolg[i][0][0] == "<") {
          if (currentAnswer < vervolg[i][0][1]) {
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
      <div className="App flex flex-col justify-between h-screen overflow-auto">

        {/* Header */}
        <header className="App-header p-4">
          <div className=''>
          <a className="text-2xl font-semibold" 
            href='#'>
              <h1 className="text-4xl font-semibold" 
              onClick={refreshPage}>Tinnitus Platform</h1>
            </a>
          <p className="text-lg">Innovatieproject Radboud Universiteit</p>
          </div>
          <div className='Over-ons text-xl'>
            <mark className="Over-ons px-2 font-semibold">Over ons</mark>
          </div>
        </header>

        {/* Body */}
        <div className='flex items-center justify-center m-4'>
          <div className="App-questions border-1 rounded-lg py-6 px-3">
            <div className='Inner-questions mx-5 my-3 p-1'>
              {/* Question */}
              {!startQuestionnaire 
              ? (<div className='text-justify p-5 max-w-xl'>
                {/* First part intro */}
                <h1 className='text-left text-black text-xl font-semibold mb-2'>
                  <mark className='Mark-title px-1'>De Uitdaging</mark>
                </h1>
                <p className='mb-10 text-md'>
                In onze omgeving valt ons op dat veel mensen tinnitus hebben, 
                maar niet weten dat er ook behandelingsmogelijkheden zijn. 
                Ze balen en hebben er last van, maar hebben ook het idee dat 
                ze er maar mee moeten leven. De uitdaging waarmee wij aan de 
                slag gaan is daarom hoe we personen bewuster kunnen maken van 
                de mogelijkheden tot de behandeling van tinnitus.  
                </p>

                {/* Second part intro */}
                <h2 className='text-right text-black text-xl font-semibold mb-2'>
                  <mark className='Mark-title px-1'>Tinnitus in het kort</mark>
                </h2> 
                <p className='mb-10 text-md'>
                Patiënten met tinnitus horen een geluid dat gecreëerd wordt van
                 binnenuit. Er zijn verschillende soorten geluiden, de meest 
                 voorkomende zijn: gebrom, ruis en een piep. Daarnaast verschilt 
                 per persoon en per moment de ernst van deze klachten. 
                Tinnitus wordt veroorzaakt door degeneratie van haarcellen die 
                zich in het slakkenhuis bevinden. Het gevolg hiervan is dat de 
                signaaltransductie van en naar de hersenen verstoord raakt. Het 
                is hierdoor mogelijk dat er verkeerde signalen worden doorgegeven. 
                De hersenen proberen dus de functie van de haarcellen te compenseren, 
                wat zich kan uiten in oorsuizen.
                </p>

                {/* Start questionnaire button */}
                <div className='text-center'>
                  <Button variant='outlined'
                          onClick={() => setStartQuestionnaire(true)}>Start Vragenlijst</Button>
                </div>
              </div>)
              : (<div className='max-w-xl'>
                  <Question 
                    questionText={currentQuestion.vraag} 
                    answerType={currentQuestion.antwoordType}
                    setAnswerFunc={setCurrentAnswer}
                    clickHandler={handleNextClick}
                    yesFlag={yesFlag}
                    noFlag={noFlag}
                    setYesFlag={setYesFlag}
                    setNoFlag={setNoFlag}/>
                <div className="mt-5">
                    {(currentQuestion.antwoordType != null) && 
                    (<div className=''>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={(e) => handleNextClick(e)}>
                        Volgende
                    </Button>
                    </div>)}
                </div>
              </div>)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className='App-footer text-xs px-5 py-3'>
          Innovatieproject Radboud Universiteit 2023 | Door Wojtek, Dante, Savine en Julius
        </footer>
      </div>
    );
  }
}

export default App;
