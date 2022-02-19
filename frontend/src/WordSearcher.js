import { Button, Input, SlideFade, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';

function WordSearcher(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleChange = (e) => {
        (e.target.value === "") ? onClose() : onOpen();
    }

    return (
    <>
    <Input name='word' onChange={handleChange} w='230px' placeholder="Hello" autoComplete='off' />
    <SlideFade offsetY={-5} in={isOpen}>
        <Button onClick={onClose} type='submit' visibility={isOpen ? 'visible' : 'hidden'} transitionDuration='500ms' w='230px'>
            Search
        </Button>
    </SlideFade>
    </>
    )
}

export default WordSearcher;