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

const client = generateClient();


const allWords = async () => {
   const apiData = await client.graphql({ query: queries.listLatinDailyModels }); 
   const notesFromAPI = apiData.data.listLatinDailyModels;
   return notesFromAPI
}

const strings = ["apple", "banana", "cherry"];
  
 async function fetchNotes() {
    const apiData = await client.graphql({ query: listLatinDailyModels });
    const notesFromAPI = apiData.data.listLatinDailyModels.items;
    //setNotes(notesFromAPI);
  }

 const notes = await fetchNotes();

function App() {

  return (
    <div className="App">
      <header className="App-header">
	<h1>Daily Latin Quiz</h1>
      	<LeftButton />   <RightButton />

	
    	       
        <p>
          Daily Latin Quiz.
        </p>
        
      </header>

       {notes.map((word, index) => (
        <label key={index}>{word.sentence}</label> 
      ))}

    </div>
    
      
  );
}

 function MoveLeft() {
   
  }



function LeftButton() {
  return (
	   <Button onClick={() => MoveLeft()}>
              Move Left
            </Button>
  );


}

function RightButton() {
  return (
   <Button onClick={() => MoveLeft()}>
              Move Right
            </Button>
  );
}

export default App;
