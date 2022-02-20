import { HStack, Button, Center, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React from 'react';

function PageHeader() {
    return (
        <Center w='100vw' bgColor='#D7D9D7' h='50px' padding='0 10px 0 10px'>
            <HStack marginLeft='auto' spacing='10px'>
            <Text display='inline'>Logged in as {Cookies.get('username')}</Text>
            {Cookies.get('username') ? <Button>Log out</Button> : <Button>Log in</Button>}
            </HStack>
        </Center>
    )
}

export default PageHeader;