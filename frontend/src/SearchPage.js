import React, { useEffect, useState } from 'react';
import { Button, Center, SlideFade, Input, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import axios from "axios";
import WordCard from './WordCard';
import WordSearcher from './WordSearcher';
import Cookies from 'js-cookie';

function App() {

    const headers = {
        Authorization: 'Token ' + Cookies.get('token')
    }

    axios.defaults.xsrfHeaderName = "X-CSRFToken"; 
    axios.defaults.xsrfCookieName = "csrftoken";
    const [words, setWords] = useState({});

    const remove = (word) => {
        let newWords = {...words};
        delete newWords[word];
        setWords(newWords);
    }

    useEffect(() => {
        axios.get('/user_words', {headers: headers}).then((res) => {
            setWords(res.data)
        })
            
    }, [])

    const submitWord = (e) => {
        e.preventDefault();

        let inputWord = e.target.elements.word.value.toLowerCase();
        if (inputWord == "") {return;}
        let path = '/api/words/' + inputWord + '/';
        axios.get(path).then(
            (res => {
                axios.put(path, {word: inputWord, count: res.data.count + 1});

            })
        ).catch((err) => {
            axios.post(
                '/api/words/', 
                {word: inputWord, count: 1}).then( (res) => {
                    let newWords = {...words}
                    newWords[inputWord] = 1;
                    setWords(newWords);
                })
        })

        axios.post('/add_word', {word: inputWord}, {headers: headers})
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