"use strict";
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();

    console.log("this.chains:", this.chains);

    // TODO: potentially remove this -- ask
    this.text = this.getText();
    console.log('Markov String:', this.text);
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    // TODO: implement this!

    // From the text, we have a list of individual words.
    // From the list of individual words, we need to make a chain representation
    // To do this, we need to iterate through the list of the words,
    // -For the first word, we look through the list and find all the words that follow that word
    // ... if the word is the last word in the list, we have reached an undefined choice,
    // ... we'll set this to null.

    const words = this.words;
    console.log("these are the words", words);

    let textChain = {};

    // see if each element at the index is a key in the object, if not, add it as a key
    // ...with a value of []

    // ["The","cat","is","in","the",'hat.',"The","cat","is"]

    for (let i = 0; i < words.length; i++) {

      console.log("word:", words[i]);
      console.log("textChain:", textChain);

      if (!(words[i] in textChain)) {
        console.log("not in chain:", words[i])
        if (words[i + 1] === undefined) {
          textChain[words[i]].push(null);
        } else {
          textChain[words[i]] = [words[i + 1]];
        }
      } else {
        if (words[i + 1] === undefined) {
          textChain[words[i]].push(null);
        } else {
          textChain[words[i]].push(words[i + 1]);
        }
      }
    }

    return textChain;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    if (this.words.length === 0) {
      return "";
    }

    let currentWord = this.words[0];
    let markovString = currentWord;

    let nextWord; // start as undefined

    while (currentWord !== null) {

      const nextWordPool = this.chains[currentWord];

      const poolMin = 0;
      const poolMax = nextWordPool.length - 1;

      // grab a random word from pool
      const nextWordIdx = Math.floor(
        Math.random() * (poolMax - poolMin + 1) + poolMin
        );

      const nextWord = nextWordPool[nextWordIdx];

      if (nextWord === null) {

        return markovString;
      }

      markovString += ` ${nextWord}`;
      currentWord = nextWord;

    }

    return markovString;
  }
}
