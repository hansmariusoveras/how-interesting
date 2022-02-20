import { Box, Button, Center, Input, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Message from 'Message';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function WordPage () {
    let { word } = useParams();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        refreshChat();
        let intervalID = setInterval(refreshChat, 2000);


        return () => { clearInterval(intervalID) }
    }, [])
    const scroller = useRef();

    useEffect(() => {
        if (scroller.current) {
            // @ts-ignore
            scroller.current.scrollTop = 10000;
        }
        
    }, [scroller.current])

    const refreshChat = () => {
        axios.get('/api/wordmessages/' + word).then((res) => JSON.stringify(res.data) == JSON.stringify(messages) ? 0 : setMessages(res.data));
        
    }

    useEffect(() => {
        refreshChat();
    }, [messages])

    const makeChatMessage = (e) => {
        e.preventDefault();
        let message = {
            author: Cookies.get('username'),
            text: e.target.elements.text.value,
            word: word
        }
        
        axios.post('/api/messages/', message);
        setMessages([...messages, message]);
        e.target.reset();
    }


    return (
        <>
        <Box position="absolute" right={0} top={0} padding='20px' marginTop='40px'>
            <Link to="/"><Button size='lg'>Go back</Button></Link>
        </Box>
        <Center h='100%'>
        <SimpleGrid columns={1} margin='5px' w='700px'>
            <Box h='100px'>
                <Text fontSize='3xl'>
                    {word}
                </Text>
            </Box>
            <Box ref={scroller} h='400px' maxHeight='70vh' overflowY='scroll' borderWidth='1px' borderRadius='lg'>
                {messages.map((message) => (
                    <Message author={message.author} date={(new Date(message.time)).toLocaleString('en-UK')} text={message.text}/>
                ))}
            </Box>
            <form onSubmit={makeChatMessage}>
                <Box position='relative'>
                    <Button zIndex={12} position='absolute' right={0} type='submit'>Post</Button>
                    <Input name='text' placeholder='Comment'></Input>
                </Box>
                
            </form>
        </SimpleGrid>
        </Center>
        </>
    )
}


export default WordPage;