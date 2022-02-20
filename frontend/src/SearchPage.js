import React, { useEffect, useState } from 'react';
import { Button, Center, SlideFade, Input, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import axios from "axios";
import WordCard from './WordCard';
import WordSearcher from './WordSearcher';
import Cookies from 'js-cookie';

function App() {
    axios.defaults.xsrfHeaderName = "X-CSRFToken"; 
    axios.defaults.xsrfCookieName = "csrftoken";
    const [words, setWords] = useState({});

    const remove = (word) => {
        let newWords = {...words};
        delete newWords[word];
        setWords(newWords);
    }

    async function getWordsFromCookie(wrds) {
        let newWords = {};
        for (let i=0; i < wrds.length; i++) {
            let path = '/api/words/' + wrds[i] + '/';
            await axios.get(path).then(
                (res => {
                    newWords[wrds[i]] = res.data.count;
            }));
        }
        return newWords;
    }

    useEffect(() => {
        if (Cookies.get('words') == null) {return;}
        let wrds = JSON.parse(Cookies.get('words'));
        if (wrds != null && wrds.length > 0) {
            getWordsFromCookie(wrds).then((newWords) => { setWords(newWords)});
            }
            
    }, [])

    useEffect(() => {
        if (Object.keys(words).length > 0) {
        Cookies.set('words', JSON.stringify(Object.keys(words)), { expires: 30, sameSite: 'strict'});
        }
    }, [words])

    const submitWord = (e) => {
        e.preventDefault();

        let inputWord = e.target.elements.word.value.toLowerCase();
        if (inputWord == "") {return;}
        let path = '/api/words/' + inputWord + '/';
        axios.get(path).then(
            (res => {
                axios.put(path, {word: inputWord, count: res.data.count + 1});
                let newWords = { ...words}
                newWords[inputWord] = res.data.count + 1;
                setWords(newWords)

            })
        ).catch((err) => {
            axios.post(
                '/api/words/', 
                {word: inputWord, count: 1}).then( (res) => {
                    let newWords = { ...words}
                    newWords[inputWord] = 1;
                    setWords(newWords);
                })
        })
        e.target.elements.word.blur();
        e.target.reset();
    }

    return (
        <>
        <Center h='100%'>
            <SimpleGrid columns={1} spacing={2}>
                <form onSubmit={submitWord}>
                    <WordSearcher />
                </form>
            </SimpleGrid>
        </Center>
        {Object.entries(words).map(([word, count], index) =>
            <WordCard key={word} word={word} count={count} number={index} remove={remove}/>
        )}
        </>
    )
}

export default App;