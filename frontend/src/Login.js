import { Center, Text, Input, VStack, Button, Link, Box} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const login = (e) => {
        e.preventDefault();
        var data = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value
        }
        axios.post('/api-token-auth/', data).then((res) => {
            Cookies.set('token', res.data.token, { sameSite: 'strict'});
            navigate('/start');
        }
            );
    }

    return (
        <Center h='100vh' w='100vw'>
            <form onSubmit={login}>
            <Center width='500px' maxWidth='100vw' padding='50px' border='1px solid lightgrey' borderRadius='5px' position='relative'>
                <VStack spacing='12px'>
                    <Text fontSize='xl'>Log in</Text>
                    <Input name='username' type='text' placeholder='username' />
                    <Input name='password' type='password' placeholder='password' />
                    <Button type='submit'>Log in</Button>
                </VStack>
                <Link position='absolute' bottom='3px'>Not a user?</Link>
            </Center>
            </form>
        </Center>
    )
}

export default Login;