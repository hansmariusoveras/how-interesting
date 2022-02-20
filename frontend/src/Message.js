import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';

function Message (props) {
    const { author, date, text} = props;

    return (
        <Box borderWidth='1px' maxW='700px' w='100%' margin='5px 0 2px 0' padding='5px'>
        <SimpleGrid columns={2} margin='1px'>
            <Text fontWeight='bold'>{author}</Text> 
            <Text align='right'>{date}</Text>
        </SimpleGrid> 
        <Text>{text}</Text>
        
        </Box>
    )
}

export default Message;