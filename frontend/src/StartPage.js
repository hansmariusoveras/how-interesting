import { Box, Button, Center, SlideFade, Text, useDisclosure, VStack } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function StartPage() {

    const navigate = useNavigate();

    const { isOpen, onClose, onOpen } = useDisclosure()

    const fadeOut = () => {
        onClose();
        setTimeout(next, 250)
    }

    const next = () => {
        navigate('/start')
    }

    useEffect(() => {
        onOpen();
        if (Cookies.get('token') != undefined) {
        setTimeout(fadeOut, 1000)
        }
    }, [])

    return (
        <>
        <Center h='100%'>
            <VStack spacing={10}>
                <SlideFade  in={isOpen}>
                    <Text fontSize='5xl'>something interesting</Text>
                </SlideFade>
                {Cookies.get('token') == undefined ? <Link to='/login'><Button>Log in</Button></Link> : ''}
                
            </VStack>

        </Center>
        </>
    )
}

export default StartPage;