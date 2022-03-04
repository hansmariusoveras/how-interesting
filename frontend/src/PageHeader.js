import { HStack, Button, Center, Text } from '@chakra-ui/react';
import axios from 'axios';
import { LayoutGroupContext } from 'framer-motion';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PageHeader() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const logOut = (e) => {
        Cookies.remove('token');
        navigate('/')
    }
    useEffect(() => {

        const headers = {
            Authorization: 'Token ' + Cookies.get('token')
        }
        axios.get('/get_username', {headers: headers}).then((response) => setUsername(response.data.username)).catch(() => setUsername(null))
    }, [])

    return (
        <Center w='100vw' bgColor='#D7D9D7' h='50px' padding='0 10px 0 10px'>
            <HStack marginLeft='auto' spacing='10px'>
            <Text display='inline'>Logged in as {username}</Text>
            {Cookies.get('username') ? <Button onClick={logOut}>Log out</Button> : <Button>Log in</Button>}
            </HStack>
        </Center>
    )
}

export default PageHeader;