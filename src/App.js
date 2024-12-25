import React, { createContext, useContext,useRef } from 'react';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import * as queries from './graphql/queries.ts';
import './App.css';
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listLatinDailyModels } from "./graphql/queries.ts";
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import useSound from 'use-sound';
import goodSound from './good.mp3';
import failSound from './fail.mp3';
import {difference,getElideVowels,getLongVowels,getShortVowels,scanVowels } from './utility.js'; 

Amplify.configure(awsconfig);

const client = generateClient();


const allWords = async () => {
   const apiData = await client.graphql({ query: queries.listLatinDailyModels }); 
   const notesFromAPI = apiData.data.listLatinDailyModels;
   return notesFromAPI
}

const playSound = async (good) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let response = null;
    // Fetch the audio file
	if(good)
    	response = await fetch("./good.mp3");
    	else
    	response = await fetch("./fail.mp3")
    const audioData = await response.arrayBuffer();

    // Decode the audio data
    const audioBuffer = await audioCtx.decodeAudioData(audioData);

    // Create a buffer source
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;

    // Connect to the destination and play
    source.connect(audioCtx.destination);
    source.start();
  };

  
 async function fetchNotes() {
    const apiData = await client.graphql({ query: listLatinDailyModels });
    const notesFromAPI = apiData.data.listLatinDailyModels.items;
    return notesFromAPI;
    //setNotes(notesFromAPI);
  }

function daysIntoYear(){
    const days = (Date.now() - new Date(new Date().getFullYear(), 0, 0)) ;
    return Math.floor(days/86400000);
}

const vowels =['a','e','i','o','u'];

const longByNature = ['ā', 'ē', 'ī', 'ō', 'ū'];

function checkVowel(myChar){
   let lowChar = myChar.toLowerCase(); 
   if (vowels.includes(lowChar)) {
	
  
   }   
}

const IndexContext = createContext(null);

let item = daysIntoYear()%6;

const notes = await fetchNotes();

const word = notes[item];

var sentence1 = word.sentence;

function App() {

  const [index, setIndex] = useState(firstVowel());

  const [longVIndex, setLongVIndex] = useState([]);

  const [shortVIndex, setShortVIndex] = useState([]);

  const [elideVIndex, setElideVIndex] = useState([]);

  const [wrongVIndex, setWrongVIndex] = useState(null);

  const [checkResultFlag, setCheckResultFlag] = useState(false);

  function increment() {
    	const value = rightVowel(index);
    	setIndex(index => value);

  }

 function decrement() {
  	const value = leftVowel(index);
    	setIndex(index => value);
  }

function firstVowel()
{
	const char = sentence1[0];
	if(vowels.includes(char) || longByNature.includes(char))
		return 0;
	else 
		return rightVowel(0);		
}

function rightVowel(index)
{
	let retValue = index;
	if(index === sentence1.length -1)
		return retValue;
	for(let i= index+1; i<sentence1.length; i++)
	{	
		const char = sentence1[i];
		if(vowels.includes(char) || longByNature.includes(char))
		{
			retValue =i;
			break;		
		}
	}
	return retValue;
}

function leftVowel(index)
{
	let retValue = index;
	if(index === 0)
		return retValue;
	for(let i= index-1; i>=0; i--)
	{	
		const char = sentence1[i];
		if(vowels.includes(char) || longByNature.includes(char))
		{
			retValue =i;
			break;		
		}
	}
	return retValue;
}


const removeItem = (arr, item) => {
  const index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
};

 function markLong(index) {
  	if(longVIndex.includes(index)){
		 removeItem(longVIndex,index);
	}
	else{
		if(shortVIndex.includes(index))
		{
			removeItem(shortVIndex,index);
		}
		if(elideVIndex.includes(index))
		{
			removeItem(elideVIndex,index);
		}
		setLongVIndex([...longVIndex, index]);
	}
  }

function markShort(index) {
	if(shortVIndex.includes(index)){
		 removeItem(shortVIndex,index);
	}
	else{
		if(longVIndex.includes(index))
		{
			removeItem(longVIndex,index);
		}
		if(elideVIndex.includes(index))
		{
			removeItem(elideVIndex,index);
		}
  		setShortVIndex([...shortVIndex, index]);
	}

  }

function markElide(index) {
	if(elideVIndex.includes(index)){
		 removeItem(elideVIndex,index);
	}
	else{
		if(longVIndex.includes(index))
		{
			removeItem(longVIndex,index);
		}
		if(shortVIndex.includes(index))
		{
			removeItem(shortVIndex,index);
		}
  		setElideVIndex([...elideVIndex, index]);
	}

  }



function markWrong(indexArray) { 
  	setWrongVIndex(indexArray);
}

function reset() {
	setCheckResultFlag(false);
	setIndex(firstVowel());
	setShortVIndex([]);
	setLongVIndex([]);
	setElideVIndex([])
  }



  return (
    <div className="App">
      <header className="App-header">
	<h2 style={{ color: '#00FF00' }}>Daily Latin Quiz</h2>

<div class="button-container">
<IndexContext.Provider
      value={{index,longVIndex,shortVIndex,wrongVIndex,elideVIndex,checkResultFlag,increment,decrement,markElide,markLong,markShort,markWrong,setCheckResultFlag,reset}}
    >
  <LeftButton />
  <RightButton />
 

<h1 as="strong" fontWeight={700}>
	       <SetCursor text={word.sentence}  />
            </h1>  
<div className="container">
  <LongButton1 />
  <ShortButton />
  <ElideButton />
</div>

<div style={{ display: 'flex',justifyContent: 'flex-end',marginBottom: '20px' }}>
  <CheckButton /> 
</div>

 <div style={{ display: 'flex',justifyContent: 'flex-end' }}>
  <ResetButton /> 
</div>
                
</IndexContext.Provider>
</div>     
      </header>
    </div>
  );
}

function GetTheWord(str, position) {
  // Ensure the position is within the string bounds
  if (position < 0 || position > str.length || str.charAt(position) === ' ') {
    return "";
  }

  let start = 0;
  // Iterate backwards from the given position
  for (let i = position - 1; i >= 0; i--) {
    if (str.charAt(i) === ' ') 
	{
      	start = i;
	break;
	}
   }

  let end = 0;
  // Iterate forwards from the given position
  for (let i = position + 1; i <= str.length; i++) {
    if (str.charAt(i) === ' ') 
	{
      	end = i;
	break;
	}
   }

    return str.substring(start,end);
  }


function checkResult(sentence,longVIndex,shortVIndex,wrongVIndex,elideVIndex,markWrong)
{
  let wrongIndex =[];
 const vowels = ['a', 'e', 'i', 'o', 'u'];

  const allVowels = scanVowels(sentence);     //findLongVowels(sentence);

  const longVowels = getLongVowels(allVowels);

  const shortVowels = getShortVowels(allVowels);

  const elideVowels = getElideVowels(allVowels);

  let isEqual = true;	
  //const isEqual = JSON.stringify(longvowels) === JSON.stringify(longVIndex);

  const wrongLongVowels = difference(longVowels, longVIndex);
  wrongLongVowels.forEach((index) => {
		wrongIndex = setWrongWord(sentence,index, wrongIndex);
		isEqual = false;
  });

 const wrongShortVowels = difference(shortVowels, shortVIndex);

 wrongShortVowels.forEach((index) => {
		wrongIndex = setWrongWord(sentence,index, wrongIndex);
		isEqual = false;
 });

const wrongElideVowels = difference(elideVowels, elideVIndex);

 wrongElideVowels.forEach((index) => {
		wrongIndex = setWrongWord(sentence,index, wrongIndex);
		isEqual = false;
  });

  markWrong(wrongIndex);
  return isEqual;
}

function setWrongWord(str,position, wrongWords)
{
    // Ensure the position is within the string bounds
  if (position < 0 || position > str.length || str.charAt(position) === ' ') {
    return "";
  }

  let start = 0;
  // Iterate backwards from the given position
  for (let i = position - 1; i >= 0; i--) {
    if (str.charAt(i) === ' ') 
	{
      	start = i;
	break;
	}
   }

  let end = 0;
  // Iterate forwards from the given position
  for (let i = position + 1; i <= str.length; i++) {
    if (str.charAt(i) === ' ' || i ===str.length) 
	{
      	end = i;
	break;
	}
   }
   

   for(let j = start; j< end; j++)
	{
	   if(!wrongWords.includes(j))
    	   	wrongWords.push(j);
	}
   return wrongWords;
}



function findLongVowels(sentence) {
  // Define short and long vowels
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  // Split the sentence into words
  const words = sentence.toLowerCase().split(/\s+/);

  // Placeholder for results
  const longVowelWords = [];

  let currentIndex =0;

  // Process each word
 words.forEach((word) => 
 {
    let hasLongVowel = false;

    // Rule: Check vowels before double consonants (a hint of a closed syllable)
    for (let i = 0; i < word.length-2; i++) {
      const char = word[i];
      if (
        vowels.includes(char) &&
        i + 1 < word.length &&
        isConsonant(word[i + 1]) &&
        i + 2 < word.length &&
        isConsonant(word[i + 2])
      ) {
        hasLongVowel = true;
	longVowelWords.push(currentIndex+i);
        break;
      }
    }

    // Rule: Check vowels before a single consonant at the end of a word
    if (
      vowels.includes(word[word.length - 2]) &&
      isConsonant(word[word.length - 1])
    ) {
      longVowelWords.push(currentIndex+word.length-2);
      hasLongVowel = true;
    }

    currentIndex = currentIndex+word.length+1;
  });
 return longVowelWords;
}



function findPotentialLongVowels(sentence,index) {
  // Define short and long vowels
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  // Split the sentence into words
  const words = sentence.toLowerCase().split(/\s+/);
 let word = GetTheWord(sentence, index);

if(word ==="")
 return false;

  // Process each word

    let hasLongVowel = false;

    // Rule: Check vowels before double consonants (a hint of a closed syllable)
    
      const char = word[index];
      if ( (index < (word.length - 2) ) &&
        vowels.includes(char) &&
        index + 1 < word.length &&
        isConsonant(word[index + 1]) &&
        index + 2 < word.length &&
        isConsonant(word[index + 2])
      ) {
        hasLongVowel = true;
      }
    

    // Rule: Check vowels before a single consonant at the end of a word
    if ( (index === (word.length - 2) ) &&
      vowels.includes(word[word.length - 2]) &&
      isConsonant(word[word.length - 1])
    ) {
      hasLongVowel = true;
    }

    if (hasLongVowel) {
       return true;
    }
else 
	return false;
 
}

// Helper function: Check if a character is a consonant
function isConsonant(char) {
  return !['a', 'e', 'i', 'o', 'u'].includes(char) && /[a-z]/.test(char);
}



function SetCursor(props)
{
   const text = props.text;

 
  //const currentIndex = useContext(IndexContext);
   const { index,longVIndex,shortVIndex,wrongVIndex,elideVIndex,checkResultFlag,markLong,markShort,markWrong } = useContext(
    IndexContext
  );

const [blinking, setBlinking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinking((prevBlinking) => !prevBlinking);
    }, 500); // Adjust the interval to control the blinking speed

    return () => clearInterval(interval);
  }, []);


// Helper function: Check if the character should blinking
function isBlinking(index1) {
   if (index === index1) 
	{
           return blinking;
	}
   else
	{
	   return true;
	}
}

// Helper function: Check if the character should blinking
function getDecoration(index1) {

let temp ="";
let ret ="";
if (index === index1) 
{
   //temp ="underline ";	
}
else
{
   temp ="";
}

   if(longVIndex.includes(index1))
{
	ret= temp + "overline";
}
   else if (shortVIndex.includes(index1))
{
	ret = "overline wavy"
}
   else
{
	if (index === index1) 
	{
   		//ret = "underline";	
	}
	else
	{
   		ret = "none";
	}

}
return ret;

}


// Helper function: Check if the character should blinking
function getColor(index1) {

   if(!checkResultFlag)
{
	return 'white';
}
   else 
{
	if (wrongVIndex.includes(index1))
	return 'red';
   	else
	{
	return '#00FF00';
	}
}

}


function getMark(char,index1) {
	if(longVIndex.includes(index1))
{
		return "-";
}
	else if(shortVIndex.includes(index1))
{
		return "u";
}
else if(elideVIndex.includes(index1))
{
		return "x";
}

	else 
{
	 	return " ";
}
}
	
  return (
    <div id="mySentence" style={{textAlign: 'left',lineHeight: 0.3,marginBottom: '100px',fontFamily: 'monospace'  }}>
      <pre>{text.split("").map((char, index1) => (
        	<span key={index1} style={{ color: getColor(index1),}}>

          {getMark(char,index1)}
        </span>
      ))} </pre>
      {text.split("").map((char, index1) => (
        <span key={index1} style={{visibility: isBlinking(index1) ? 'visible' : 'hidden', color: getColor(index1), }}>

          {char}
        </span>
      ))}
    </div>
  );

}


function LeftButton() {
 const { index,longVIndex, increment,decrement,markLong } = useContext(
    IndexContext
  );
  return (
	
	   <Button style={{width:'120px', backgroundColor: '#00FF00', marginRight: '10px'}} onClick={decrement}> &lt;== Left 
            </Button>


  );


}

function RightButton() {
const { index,longVIndex, increment,decrement,markLong } = useContext(
    IndexContext
  );

  return (
   <Button style={{width:'120px',backgroundColor: '#00FF00', marginRight: '10px'}} onClick={increment}>
              Right ==>
            </Button>
  );
}

function LongButton() {

 const [play] = useSound(goodSound);

 const { index,longVIndex, increment,decrement,markLong } = useContext(
    IndexContext
  );

 const handleClick = () => {

    
    findPotentialLongVowels(word.sentence,index);
    play();
 
  };
  return (

	   <Button style={{width:'120px',backgroundColor: '#00FF00', marginRight: '10px'}} onClick={handleClick}>Long (-)
            </Button>
	  

  );
}

function LongButton1() {

 const { index,longVIndex, increment,decrement,markLong } = useContext(
    IndexContext
  );

 const handleClick = () => {
	markLong(index);
 	
  };
  return (

	   <Button style={{width:'120px',backgroundColor: '#00FF00', marginRight: '10px'}} onClick={handleClick}>Long (-)
            </Button>  
  );

}


function ShortButton() {
const { index,longVIndex,shortVIndex, increment,decrement,markLong,markShort } = useContext(
    IndexContext
  );

const handleClick = () => {
	markShort(index);
 	
  };

  return (
   <Button style={{width:'120px',backgroundColor: '#00FF00', marginRight: '10px'}} onClick={(handleClick)}>
              Short (u)
            </Button>
  );
}

function ElideButton() {
const { index,markElide} = useContext(
    IndexContext
  );

const handleClick = () => {
	markElide(index);
 	
  };

  return (
   <Button style={{width:'120px',backgroundColor: '#00FF00', marginRight: '100px'}} onClick={(handleClick)}>
              Elide (x)
            </Button>
  );
}


function CheckButton() {

 const [playGood] = useSound(goodSound);
 const [playFail] = useSound(failSound);
 const { index,longVIndex,shortVIndex,wrongVIndex,elideVIndex,increment,decrement,markLong,markWrong,setCheckResultFlag} = useContext(
    IndexContext
  );

 const handleClick = () => {
	 
    setCheckResultFlag(true);
    if(checkResult(word.sentence,longVIndex,shortVIndex,wrongVIndex,elideVIndex,markWrong)){
    	playGood();
    }
    else{
	playFail();
    }
  };

  return (

	   <Button style={{width:'150px',backgroundColor: 'orange', marginRight: '10px'}} onClick={handleClick}>Check Result
            </Button>  
  );

}


function ResetButton() {
const { reset } = useContext(
    IndexContext
  );

const handleClick = () => {
	reset();
 	
  };

  return (
   <Button style={{width:'150px',backgroundColor: 'orange', marginRight: '10px'}} onClick={(handleClick)}>
              Start Over
            </Button>
  );
}



export default App;
