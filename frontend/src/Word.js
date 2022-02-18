import React from 'react';
import Draggable from 'react-draggable';
import { Text, Center, SimpleGrid, Box, IconButton, Icon } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';

function Word(props) {
    const { word, count, number, remove } = props;
    return (
    <Draggable key={word}>
        <Center 
            borderWidth='1px' 
            borderRadius='lg' 
            padding='2px' 
            w='150px' 
            h='150px' 
            textAlign='center' 
            position='fixed' 
            top={window.innerHeight / 2 + (window.innerHeight*0.35)*Math.sin(number) - 150}
            left={window.innerWidth / 2 + (window.innerWidth*0.35)*Math.cos(number) - 75}
            bgColor='lightblue'
        >
        <IconButton onClick={() => remove(word)} aria-label='Remove' position='absolute' right='0' top='0'><CloseIcon /></IconButton>
        <SimpleGrid columns={1} spacing={1}>
            <Text w='100px' fontSize='15'>
                {word}
            </Text>
            <Text>
                <ChatIcon /> {count}
            </Text>
        </SimpleGrid>
        </Center>
    </Draggable>
    )
}

export default Word;