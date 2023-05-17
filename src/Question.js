import { useState } from "react";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ScaleAnswer = ({setAnswerFunc}) => {
    const handleChange = (event, newValue) => {
        setAnswerFunc(newValue);
      };

    return (
      <Slider 
        valueLabelDisplay="auto" 
        defaultValue={3} 
        step={1} 
        marks 
        min={0} 
        max={10}
        onChange={handleChange}/>
    )
  }

const BinaryAnswer = ({setAnswerFunc, clickHandler}) => {
    const miniHandler = (e, antwoord) => {
        setAnswerFunc(antwoord)
        clickHandler(e)
    }

    return (
        <Stack spacing={3} direction="row">
            <Button variant="contained"
                    className="border-3"
                    onClick={(e) => miniHandler(e, "Ja")}>
                Ja
            </Button>
            <Button variant="contained"
                    onClick={(e) => miniHandler(e, "Nee")}>
                Nee
            </Button>
        </Stack>
    );  
};

const Answer = ({ answerType, setAnswerFunc, clickHandler}) => {
    if (answerType == "Binary") {
        return <BinaryAnswer setAnswerFunc={setAnswerFunc} 
                             clickHandler={clickHandler}/> 
    } else if (answerType == "Scale") {
        return <ScaleAnswer setAnswerFunc={setAnswerFunc}/>
    } else {
        return "Geen Antwoord Type"
    }
};

export const Question = ({questionText, answerType, setAnswerFunc, clickHandler}) => {
    return (
        <div>
            <div className="mb-5">
                {questionText}
            </div>
            <div className="flex items-center justify-center">
                <Answer answerType={answerType}
                setAnswerFunc={setAnswerFunc}
                clickHandler={clickHandler}/>
            </div>
        </div>  
    );
};
