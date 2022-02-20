import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { Text, Center, SimpleGrid, Box, IconButton, Icon, Button } from '@chakra-ui/react';
import { ChatIcon, CloseIcon, DragHandleIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

function WordCard(props) {
    const { word, count, number, remove } = props;

    const [screenSize, setScreenSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        window.addEventListener('resize', () => setScreenSize([window.innerWidth, window.innerHeight]));
    }, [])

    return (
        <Draggable key={word}>
            <SimpleGrid 
                borderWidth='1px' 
                w='150px' 
                h='150px' 
                textAlign='center' 
                position='fixed'
                top={screenSize.at(1) / 2 + (screenSize.at(1)*0.35)*Math.sin(number) - 150}
                left={screenSize.at(0) / 2 + (screenSize.at(0)*0.35)*Math.cos(number) - 75}
                bgColor='white'
                columns={1}
            >
            <SimpleGrid cursor='grab' alignItems='center' columns={2} borderLeft='2px' borderLeftColor='purple'>
                <Text color='purple' textAlign='left' padding='4px'><DragHandleIcon marginRight='auto'/></Text>
                <IconButton color='purple' onClick={() => remove(word)} aria-label='Remove' w='40px' margin='2px' marginLeft='auto'><CloseIcon /></IconButton>
            </SimpleGrid>
            <Link to={'/word/' + word}>
            <SimpleGrid w='148px' h='110px' columns={1} spacing={1} bgColor="#D7D9D7" paddingTop='10px'>
                
                    <Text>{word}</Text>
                    <Text><ChatIcon /> {count}</Text> 
                
            </SimpleGrid>
            </Link>
            </SimpleGrid>
        </Draggable>
    
    )
}

export default WordCard;