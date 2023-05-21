import { useState } from "react";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        success: {
            main: '#6db784',
        },
        thumb: {
            main: '#000000',
        }
    },
});

const ScaleAnswer = ({ setAnswerFunc }) => {
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
            onChange={handleChange} />
    )
}

const BinaryAnswer = ({ setAnswerFunc, yesFlag, noFlag, setYesFlag, setNoFlag }) => {
    const handleClick = (e, antwoord) => {
        if (antwoord == "Ja") {
            setYesFlag(true)
            setNoFlag(false)
        } else if (antwoord == "Nee") {
            setYesFlag(false)
            setNoFlag(true)
        }
        setAnswerFunc(antwoord)
    }

    return (
        <Stack spacing={3} direction="row">
            <ThemeProvider theme={theme}>
                <Button variant="contained"
                    size="large"
                    color={yesFlag ? "success" : "primary"}
                    onClick={(e) => handleClick(e, "Ja")}>
                    Ja
                </Button>
                <Button variant="contained"
                    size="large"
                    color={noFlag ? "success" : "primary"}
                    onClick={(e) => handleClick(e, "Nee")}>
                    Nee
                </Button>
            </ThemeProvider>
        </Stack>
    );
};

const Answer = (props) => {
    if (props.answerType == "Binary") {
        return <BinaryAnswer setAnswerFunc={props.setAnswerFunc}
            clickHandler={props.clickHandler}
            yesFlag={props.yesFlag}
            noFlag={props.noFlag}
            setYesFlag={props.setYesFlag}
            setNoFlag={props.setNoFlag} />
    } else if (props.answerType == "Scale") {
        return <ScaleAnswer setAnswerFunc={props.setAnswerFunc} />
    } else {
        return "Geen Antwoord Type"
    }
};

export const Question = (props) => {
    return (
        <div className=''>
            <div className="my-5 drop-shadow text-2xl">
                {props.questionText}
            </div>
            <div className="flex items-center justify-center">
                {props.answerType !== null &&
                    <Answer answerType={props.answerType}
                        setAnswerFunc={props.setAnswerFunc}
                        clickHandler={props.clickHandler}
                        yesFlag={props.yesFlag}
                        noFlag={props.noFlag}
                        setYesFlag={props.setYesFlag}
                        setNoFlag={props.setNoFlag} />
                }
            </div>
        </div>
    );
};
