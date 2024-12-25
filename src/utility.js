
/**
 * Preprocess text to combine "qu" and "gu" as single consonants.
 * @param {string} text - The input Latin text.
 * @returns {string} - Processed text.
 */
function preprocessText(text) {
  return text.replace(/qu/g, 'Q').replace(/gu/g, 'G'); // Replace qu/gu with Q/G
}

// Helper function: Check if a character is a consonant
function isConsonant(char) {
  return !['a', 'e', 'i', 'o', 'u'].includes(char) && /[a-z]/.test(char);
}


/**
 * Analyze the vowels in a Latin text for scansion.
 * @param {string} text - The Latin text to analyze.
 * @returns {Array} - Array of scanned vowels with their status.
 */
export function scanVowels(text) {


// Define rules and constants
const longByNature = ['ā', 'ē', 'ī', 'ō', 'ū'];
const diphthongs = ['ae', 'au', 'ei', 'eu', 'oe', 'ui'];
const vowels = 'aeiou';
const consonants = 'bcdfghjklmnpqrstvwxyz';
const muteConsonants = ['b', 'c', 'd', 'g', 'k', 'p', 'q', 't'];
const liquids = ['l', 'r'];

  // Preprocessing
  const processedText = preprocessText(text);
  const words = processedText.toLowerCase().split(/\s+/); // Split into words
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

      // Step 1: Elision check
      if (
        ( i === (word.length - 1) && (','!== word[word.length-1]) &&
        (vowels.includes(nextWord[0]) || nextWord[0] === 'h') )// Next word starts with a vowel or 'h'
	||
	(
		i === (word.length - 2) && (','=== word[word.length-1]) &&
        	(vowels.includes(nextWord[0]) || nextWord[0] === 'h')
	)
      ) {
        status = 'elided';
        scannedVowels.push({ vowel: char, wordIndex: w, charIndex: i, sentenceIndex: currentIndex+i, status });
        continue; // Skip further checks for elided vowels
      }

      // Step 2: Long by Nature (macrons or diphthongs)
      if (  longByNature.includes(char) || (i < (word.length - 1) && diphthongs.includes(char + word[i + 1])) 
	)

      {
        status = 'long';
	scannedVowels.push({ vowel: char, wordIndex: w, charIndex: i,sentenceIndex: currentIndex+i, status });
        continue; // Skip further checks for elided vowels
      } 

	//  Step 3. Rule: Check vowels before double consonants (a hint of a closed syllable)
 
      if (
 	(i + 2) < word.length &&
        vowels.includes(char) &&
        isConsonant(word[i + 1]) &&
        isConsonant(word[i + 2])
      ) {
        status = 'long';
	scannedVowels.push({ vowel: char, wordIndex: w, charIndex: i,sentenceIndex: currentIndex+i, status });
        continue; // Skip further checks for elided vowels
      }
    
 	// Step 4: Check vowels before a single consonant at the end of a word
    if (
	( i === (word.length - 2) && (','!== word[word.length-1]) &&vowels.includes(word[i]) &&
         isConsonant(word[word.length - 1]) 
	) ||
	( i === (word.length - 3) && (','=== word[word.length-1]) &&vowels.includes(word[i]) &&
         isConsonant(word[word.length - 2]) 
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
