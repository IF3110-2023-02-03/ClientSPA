import React, { useState } from 'react';
import {
    Button,
    Card,
    CardHeader,
    Center,
    Divider,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    Link as ChakraLink,
} from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import login from '../api/login.js';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if userID is set in localStorage
        const userID = localStorage.getItem('userID');
        if (userID) {
            navigate('/'); // Redirect to home page
        }
    }, [navigate]);

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const [errorMessages, setErrorMessages] = useState({
        username: '',
        password: '',
        general: '',
    });

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);

        if (!e.target.value) {
            setUsernameValid(false);
            setErrorMessages({ ...errorMessages, username: '' });
        } else if (!/^\w+$/.test(e.target.value)) {
            setUsernameValid(false);
            setErrorMessages({
                ...errorMessages,
                username: 'Invalid username format.',
            });
        } else {
            setUsernameValid(true);
            setErrorMessages({ ...errorMessages, username: '' });
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

        if (!e.target.value) {
            setPasswordValid(false);
            setErrorMessages({ ...errorMessages, password: '' });
        } else if (!/^\w+$/.test(e.target.value)) {
            setPasswordValid(false);
            setErrorMessages({
                ...errorMessages,
                password: 'Invalid password format.',
            });
        } else {
            setPasswordValid(true);
            setErrorMessages({ ...errorMessages, password: '' });
        }
    };

    const processLogin = async () => {
        if (!username) {
            setUsernameValid(false);
        }

        if (!password) {
            setPasswordValid(false);
        }

        // If any validation fails, stop login
        if (!usernameValid || !passwordValid) {
            return;
        }

        try {
            // Call the login API function
            const res = await login(username, password);
            console.log(res);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userID', res.data.userID);

            // Redirect to the content page after successful login
            navigate('/content');
        } catch (error) {
            // Handle errors
            if (error.response) {
                // Server responded with an error
                const { data } = error.response;

                if (data.message === 'Invalid credentials') {
                    setErrorMessages({
                        ...errorMessages,
                        general: 'Invalid username or password.',
                    });
                } else {
                    setErrorMessages({
                        ...errorMessages,
                        general: 'Login failed. Please try again.',
                    });
                }
            } else {
                // Network error or other unexpected error
                setErrorMessages({
                    ...errorMessages,
                    general: 'An error occurred. Please try again later.',
                });
            }
        }
    };

    return (
        <>
            <Center
                height={'100vh'}
                backgroundImage={'../../assets/home-page.png'}
                backgroundPosition={'center'}
                backgroundRepeat={'no-repeat'}
                backgroundSize={'cover'}
            >
                <Card
                    width={{ base:'90vw', sm: '60vw',  xl:'24vw' }}
                    shadow={'2xl'}
                    padding={{ base:'5%',  lg:'2%' }}
                    borderRadius={'50px'}
                >
                    <CardHeader>
                        <Heading
                            size='md'
                            textAlign={'center'}
                            fontSize={'36px'}
                        >
                            Login
                        </Heading>
                    </CardHeader>
                    <Divider />
                    {/* Username input and error message */}
                    <Text m='20px 8px 10px 10px'>Username</Text>
                    <Input
                        placeholder='Enter Username'
                        size='md'
                        isInvalid={!usernameValid}
                        onChange={handleUsernameChange}
                    />
                    <Text color='red' textAlign='center' margin='5px 0'>
                        {errorMessages.username}
                    </Text>
                    {/* Password input and error message */}
                    <Text m='20px 8px 10px 10px'>Password</Text>
                    <InputGroup size='md' mb={'20px'}>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            isInvalid={!passwordValid}
                            onChange={handlePasswordChange}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Text
                        color='red'
                        textAlign='center'
                        margin='-10px 0px 25px 0px'
                    >
                        {errorMessages.password}
                    </Text>
                    {/* Login button */}
                    <Button onClick={processLogin}>Login</Button>
                    {/* General error message */}
                    <Text color='red' textAlign='center' margin='10px 0'>
                        {errorMessages.general}
                    </Text>
                    {/* Register link */}
                    <Center m='20px 0px 0px 0px'>
                        Do not have an account?&nbsp;
                        <ChakraLink
                            as={ReactLink}
                            to='/register'
                            color='blue'
                            style={{ textDecoration: 'underline' }}
                        >
                            Register
                        </ChakraLink>
                    </Center>
                </Card>
            </Center>
        </>
    );
}

export default Login;
