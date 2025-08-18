import { useEffect, useState } from "react";

const useTypewriterPlaceholder = (words, speed = 150, delay = 2000) => {
  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer;

    if (!isDeleting && charIndex <= currentWord.length) {
      timer = setTimeout(() => {
        setPlaceholder(currentWord.substring(0, charIndex));
        setCharIndex(charIndex + 1);
      }, speed);
    } else if (isDeleting && charIndex >= 0) {
      timer = setTimeout(() => {
        setPlaceholder(currentWord.substring(0, charIndex));
        setCharIndex(charIndex - 1);
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
          setCharIndex(charIndex - 1);
        } else {
          setWordIndex((wordIndex + 1) % words.length);
          setCharIndex(0);
        }
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, words, wordIndex, speed, delay]);

  return placeholder;
};


export default useTypewriterPlaceholder;
