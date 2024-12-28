
/**
 * Preprocess text to combine "qu" and "gu" as single consonants.
 * @param {string} text - The input Latin text.
 * @returns {string} - Processed text.
 */
function preprocessText(text) {
  text = text.replace(/qu/g, 'q$').replace(/gu/g, 'g$').replace(/ch/g, 'c*').replace(/ph/g, 'p*').replace(/th/g, 't*'); // Replace qu/gu with Q/G

  let index = 0; 
  const  word ='su';
  while(true){
		index = text.indexOf(word,index);

  		if (index !== -1 && index + word.length < text.length) {
			
     			const nextChar = text.charAt(index + word.length);
			if( isVowel(nextChar) )
				 text = text.replace(word,'s$');
			else
			{
				index = index + word.length;
			}			
		} 
		else
		{
		   break;
		}	
  }
  return text;
}

// Helper function: Check if a character is a consonant
function isConsonant(char) {
  return !['a', 'e', 'i', 'o', 'u'].includes(char) && /[a-z]/.test(char);
}

// Helper function: Check if a character is a vowel
function isVowel(char) {
  return (vowels.includes(char) || longByNature.includes(char));
}


// Helper function: Check if a character is a es or est
function isEst(word) {
   if(symbols.includes(word[word.length-1]) )  //last digit is a symbol
	{
		word = word.slice(0, -1); 
	}
    if("es" ===word || "est" ===word)
	return true;
     else
	return false;
}



function findCharAfterWord(str, word) {
  const index = str.indexOf(word);

  if (index !== -1 && index + word.length < str.length) {
    return str.charAt(index + word.length);
  } 
  else {
    return null; // Word not found or at the end of the string
  }
}


// Define rules and constants
const longByNature = ['ā', 'ē', 'ī', 'ō', 'ū'];
const diphthongs = ['ae', 'au', 'ei', 'eu', 'oe', 'ui'];
const vowels = 'aeiou';
const consonants = 'bcdfghjklmnpqrstvwxyz';
const singleConsonant = ['x','z'];
const muteConsonants = ['b', 'c', 'd', 'g', 'k', 'p', 'q', 't'];
const liquids = ['l', 'r'];
const symbols =[',',':','.','$',";","-"];

/**
 * Analyze the vowels in a Latin text for scansion.
 * @param {string} text - The Latin text to analyze.
 * @returns {Array} - Array of scanned vowels with their status.
 */
export function scanVowels(text) {

  // Preprocessing
  const processedText = preprocessText(text.toLowerCase());
  const words = processedText.split(/\s+/); // Split into words
  const scannedVowels = [];

  let currentIndex =0;


  // Process each word and character
  for (let w = 0; w < words.length; w++) {
    const word = words[w];
    const nextWord = words[w + 1] || ''; // Next word for elision

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      // Skip non-vowel characters
      if (!vowels.includes(char) && !longByNature.includes(char)) continue;

      let status = 'short'; // Default to short


      if( i === 0 && (word[i] ==='i') && (i < word.length-1) && isVowel(word[i+1]))  //"i" follow by a vowel
	{
		continue;
	}

      // Step 1: Elision check

	
	 if (
		 ( i === (word.length - 1) && isEst (nextWord) ) || (i === (word.length - 2) && symbols.includes(word[word.length-1]) && isEst (nextWord) )
	   )
	{
		scannedVowels.push({ vowel: char, wordIndex: w, charIndex: i, sentenceIndex: currentIndex+i, status });
		status = 'elided';
        	scannedVowels.push({ vowel: 'e', wordIndex: w+1, charIndex: '0', sentenceIndex: currentIndex+ word.length+1, status });
		w++;
        	continue; // Skip further checks for elided vowels
	}


      if (
        ( i === (word.length - 1) && !symbols.includes(word[word.length-1]) &&
        (vowels.includes(nextWord[0]) || nextWord[0] === 'h' || longByNature.includes(nextWord[0]) ))// Next word starts with a vowel or 'h'
	||
	(
		i === (word.length - 2) && symbols.includes(word[word.length-1]) &&     //comma
        	(vowels.includes(nextWord[0]) || nextWord[0] === 'h'|| longByNature.includes(nextWord[0]))
	)
      ) {
        status = 'elided';
        scannedVowels.push({ vowel: char, wordIndex: w, charIndex: i, sentenceIndex: currentIndex+i, status });
        continue; // Skip further checks for elided vowels
      }

      if (
        ( i === (word.length - 2) && ('m'=== word[word.length-1]) &&
        (vowels.includes(nextWord[0]) || nextWord[0] === 'h' || longByNature.includes(nextWord[0]) ))// Next word starts with a vowel or 'h'
	||
	(
		i === (word.length - 3) && ('m'=== word[word.length-2]) && symbols.includes(word[word.length-1]) &&
        	(vowels.includes(nextWord[0]) || nextWord[0] === 'h' || longByNature.includes(nextWord[0]))
	)
      ) {
        status = 'elided';
        scannedVowels.push({ vowel: char, wordIndex: w, charIndex: i, sentenceIndex: currentIndex+i, status });
        continue; // Skip further checks for elided vowels
      }


      // Step 2: Long by Nature (macrons)
      if (  longByNature.includes(char) ) 
      {
        status = 'long';
	scannedVowels.push({ vowel: char, wordIndex: w, charIndex: i,sentenceIndex: currentIndex+i, status });
        continue; // Skip further checks for elided vowels
      } 

      //diphthongs

      if ( i < (word.length - 1) && diphthongs.includes(char + word[i + 1])) 
      {
	  status = 'long';
	  scannedVowels.push({ vowel: char, wordIndex: w, charIndex: i,sentenceIndex: currentIndex+i, status });
	  scannedVowels.push({ vowel: char, wordIndex: w, charIndex: i+1,sentenceIndex: currentIndex+i+1, status });
	  i++;
          continue; // Skip further checks for vowels

      }

	//  Step 3. Rule: Check vowels before double consonants (a hint of a closed syllable)
 
      if (checkTwoConsonants(currentIndex+i,processedText)) {
        status = 'long';
	scannedVowels.push({ vowel: char, wordIndex: w, charIndex: i,sentenceIndex: currentIndex+i, status });
        continue; 
      }

    
 	// Step 4: Check vowels before a single consonant at the end of a word
    if (
	( i === (word.length - 2) && !symbols.includes(word[word.length-1]) &&vowels.includes(word[i]) &&
         singleConsonant.includes(word[word.length - 1]) 
	) ||
	( i === (word.length - 3) && symbols.includes(word[word.length-1]) &&vowels.includes(word[i]) &&
         singleConsonant.includes(word[word.length - 2]) 
	)

       ) 
   {
      	status = 'long';
	scannedVowels.push({ vowel: char, wordIndex: w, charIndex: i,sentenceIndex: currentIndex+i, status });
        continue; // Skip further checks for elided vowels

    }


      // Step 5: Record the result
      scannedVowels.push({ vowel: char, wordIndex: w, charIndex: i,sentenceIndex: currentIndex+i, status });
    }
    currentIndex = currentIndex+ word.length+1;
  }

  return scannedVowels;
}


function checkTwoConsonants(currentIndex,sentence)
{
	let retValue = false;
	let count =0;
	for(let i =currentIndex+1; i< sentence.length; i++)
	{
		if(symbols.includes(sentence[i]) || sentence[i] ===" "  || sentence[i] ==="*" ) 
			continue
		else if(isConsonant(sentence[i]))
		{
			count++;
		}
		else{
			break;	
		}
		if(count ===2)
		{
		   retValue =true;
		   break;
		}
	}
	return retValue;
}

export function getLongVowels(allVowels)
{
	let longVowels = [];
	allVowels.forEach((item) => 
 {
	if(item.status==="long")
	   longVowels.push(item.sentenceIndex);
 });
 return longVowels;
}

export function getShortVowels(allVowels)
{
	let shortVowels = [];
	allVowels.forEach((item) => 
 {
	if(item.status==="short")
	   shortVowels.push(item.sentenceIndex);
 });
 return shortVowels;
}

export function getElideVowels(allVowels)
{
	let elideVowels = [];
	allVowels.forEach((item) => 
 {
	if(item.status==="elided")
	   elideVowels.push(item.sentenceIndex);
 });
 return elideVowels;
}



export function difference(arr1, arr2) {
  const diff = [];

if(arr1.length ===0 && arr2.length!==0)
{
	return arr2;
}
else if (arr1.length !==0 && arr2.length===0)
{
	return arr1;
}
 else if(arr1.length !==0 && arr2.length!==0)
{
  // Find elements in arr1 that are not in arr2
  arr1.forEach(element => {
    if (!arr2.includes(element)) {
      diff.push(element);
    }
  });

  // Find elements in arr2 that are not in arr1
  arr2.forEach(element => {
    if (!arr1.includes(element)) {
      diff.push(element);
    }
  });
}
  return diff;
}
