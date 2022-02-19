import { Box, Button, Center, SimpleGrid, Text } from '@chakra-ui/react';
import Message from 'Message';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

function WordPage (props) {
    let { word } = useParams();
    return (
        <>
        <Box position="absolute" right={0} top={0} padding='20px'>
            <Link to="/"><Button size='lg'>Go back</Button></Link>
        </Box>
        <Center h='100vh'>
        <SimpleGrid columns={1}>
            <Box h='100px'>
                <Text fontSize='3xl'>
                    {word}
                </Text>
            </Box>
            <Box h='600px' borderWidth='1px' borderRadius='lg'>
                <Message author="Jim" text="Lorep Ipsum Dolor Sit Amet Consecutr Yalla Yalla all the way to downtown stream" date="2019-11-03" />
                <Message author="Jim" text="Lorep Ipsum Dolor Sit Amet Consecutr Yalla Yalla all the way to downtown stream" date="2019-11-03" />
            </Box>
        </SimpleGrid>
        </Center>
        </>
    )
}


export default WordPage;