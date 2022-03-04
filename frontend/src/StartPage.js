import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function StartPage() {

    const boxRef = useRef(null);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const orbit = () => {
        setLeft(window.innerWidth/4*Math.cos(Date.now() / 2000.0));
        setTop(window.innerHeight/4*Math.sin(Date.now() / 2000.0));
    }

    useEffect(() => {
        let intervalID = setInterval(orbit, 10)

        return () => { clearInterval(intervalID) }

    }, [])

    return (
        <>
        <Center h='100%'>
            <VStack spacing={10}>
                <Text fontSize='5xl'>something interesting</Text>
                {Cookies.get('token') == undefined ? <Link to='/login'><Button>Log in</Button></Link> : ''}
            </VStack>

        </Center>
        {/*<Box borderRadius='100%' position='absolute' left={left+window.innerWidth/2} top={top+window.innerHeight/2} ref={boxRef} w='60px' h='60px' bgColor='green'/>*/}
        </>
    )
}

export default StartPage;