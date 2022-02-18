import React, { useState } from 'react';
import { Button, Center, SlideFade, Input, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import axios from "axios";
import Word from './Word';

function App() {
    axios.defaults.xsrfHeaderName = "X-CSRFToken"; 
    axios.defaults.xsrfCookieName = "csrftoken";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [words, setWords] = useState({});

    const handleChange = (e) => {
        (e.target.value === "") ? onClose() : onOpen();
    }

    const remove = (word) => {
        let newWords = {...words};
        delete newWords[word];
        setWords(newWords);
    }

    const submitWord = (e) => {
        e.preventDefault();

        let inputWord = e.target.elements.word.value.toLowerCase();
        let path = '/api/words/' + inputWord + '/';
        axios.get(path).then(
            (res => {
                axios.put(path, {word: inputWord, count: res.data.count + 1});
                let newWords = { ...words}
                newWords[inputWord] = res.data.count + 1;
                setWords(newWords);
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
        
        e.target.reset();
        onClose();
    }

    return (
        <>
        <Center h='100vh'>
            <SimpleGrid columns={1} spacing={2}>
                <form onSubmit={submitWord}>
                    <Input name='word' onChange={handleChange} w='230px' placeholder="Hello" autoComplete='off'></Input>
                    <SlideFade offsetY={-5} in={isOpen}>
                        <Button type='submit' visibility={isOpen ? 'visible' : 'hidden'} transitionDuration='500ms' w='230px'>Search</Button>
                    </SlideFade>
                </form>
                
            </SimpleGrid>
        </Center>
        {Object.keys(words).map((word) =>
            <Word key="word" word={word} count={words[word]} number={Object.keys(words).findIndex((s) => s == word)} remove={remove}/>
        )}
        </>
    )
}

export default App;