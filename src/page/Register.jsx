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
import register from '../api/register.js';

function Register() {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [fullnameValid, setFullnameValid] = useState(true);
    const [usernameValid, setUsernameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

    const [errorMessages, setErrorMessages] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        general: '',
    });

    const handleFullnameChange = (e) => {
        setFullname(e.target.value);

        if (!e.target.value) {
            setFullnameValid(false);
            setErrorMessages({ ...errorMessages, fullname: '' });
        } else if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
            setFullnameValid(false);
            setErrorMessages({
                ...errorMessages,
                fullname: 'Invalid fullname format.',
            });
        } else {
            setFullnameValid(true);
            setErrorMessages({ ...errorMessages, fullname: '' });
        }
    };

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

    const handleEmailChange = (e) => {
        setEmail(e.target.value);

        if (!e.target.value) {
            setEmailValid(false);
            setErrorMessages({ ...errorMessages, email: '' });
        } else if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                e.target.value,
            )
        ) {
            setEmailValid(false);
            setErrorMessages({
                ...errorMessages,
                email: 'Invalid email format.',
            });
        } else {
            setEmailValid(true);
            setErrorMessages({ ...errorMessages, email: '' });
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

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);

        if (!e.target.value) {
            setConfirmPasswordValid(false);
            setErrorMessages({ ...errorMessages, confirmPassword: '' });
        } else if (e.target.value !== password) {
            setConfirmPasswordValid(false);
            setErrorMessages({
                ...errorMessages,
                confirmPassword: "Confirmed password doesn't match.",
            });
        } else {
            setConfirmPasswordValid(true);
            setErrorMessages({ ...errorMessages, confirmPassword: '' });
        }
    };

    const processRegister = async () => {
        if (!fullname) {
            setFullnameValid(false);
        }

        if (!username) {
            setUsernameValid(false);
        }

        if (!email) {
            setEmailValid(false);
        }

        if (!password) {
            setPasswordValid(false);
        }

        if (!confirmPassword) {
            setConfirmPasswordValid(false);
        }

        if (confirmPassword !== password) {
            setConfirmPasswordValid(false);
            setErrorMessages({
                ...errorMessages,
                confirmPassword: "Confirmed password doesn't match.",
            });
        }

        // If any validation fails, stop registration
        if (
            !fullnameValid ||
            !usernameValid ||
            !emailValid ||
            !passwordValid ||
            !confirmPasswordValid
        ) {
            return;
        }

        try {
            // Call the register API function
            const res = await register(username, fullname, email, password);
            console.log(res);

            // Redirect to the login page after successful registration
            navigate('/login');
        } catch (error) {
            // Handle errors
            if (error.response) {
                // Server responded with an error
                const { data } = error.response;

                if (data.message === 'Username already taken!') {
                    setUsernameValid(false);
                    setErrorMessages({
                        ...errorMessages,
                        username: 'Username already taken.',
                    });
                } else if (data.message === 'Email already taken!') {
                    setEmailValid(false);
                    setErrorMessages({
                        ...errorMessages,
                        email: 'Email already taken.',
                    });
                } else {
                    setErrorMessages({
                        ...errorMessages,
                        general: 'Registration failed. Please try again.',
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
                    borderRadius={'20px'}
                >
                    <CardHeader>
                        <Heading
                            size='md'
                            textAlign={'center'}
                            fontSize={'36px'}
                        >
                            Register
                        </Heading>
                    </CardHeader>
                    <Divider />
                    {/* Fullname input and error message */}
                    <Text m='10px 8px 5px 10px'>Name</Text>
                    <Input
                        placeholder='Enter Fullname'
                        size='md'
                        isInvalid={!fullnameValid}
                        onChange={handleFullnameChange}
                    />
                    <Text color='red' textAlign='center' margin='5px 0'>
                        {errorMessages.fullname}
                    </Text>
                    {/* Username input and error message */}
                    <Text m='10px 8px 5px 10px'>Username</Text>
                    <Input
                        placeholder='Enter Username'
                        size='md'
                        isInvalid={!usernameValid}
                        onChange={handleUsernameChange}
                    />
                    <Text color='red' textAlign='center' margin='5px 0'>
                        {errorMessages.username}
                    </Text>
                    {/* Email input and error message */}
                    <Text m='10px 8px 5px 10px'>Email</Text>
                    <Input
                        placeholder='Enter Email'
                        size='md'
                        isInvalid={!emailValid}
                        onChange={handleEmailChange}
                    />
                    <Text color='red' textAlign='center' margin='5px 0'>
                        {errorMessages.email}
                    </Text>
                    {/* Password input and error message */}
                    <Text m='10px 8px 5px 10px'>Password</Text>
                    <InputGroup size='md'>
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
                    <Text color='red' textAlign='center' margin='5px 0'>
                        {errorMessages.password}
                    </Text>
                    {/* Confirm Password input and error message */}
                    <Text m='10px 8px 5px 10px'>Confirm Password</Text>
                    <InputGroup size='md' mb={'10px'}>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            isInvalid={!confirmPasswordValid}
                            onChange={handleConfirmPasswordChange}
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
                        margin='0px 0px 25px 0px'
                    >
                        {errorMessages.confirmPassword}
                    </Text>
                    {/* Register button */}
                    <Button onClick={processRegister}>Register</Button>
                    {/* General error message */}
                    <Text color='red' textAlign='center' margin='10px 0'>
                        {errorMessages.general}
                    </Text>
                    {/* Login link */}
                    <Center m='20px 0px 0px 0px'>
                        Already have an account?&nbsp;
                        <ChakraLink
                            as={ReactLink}
                            to='/login'
                            color='blue'
                            style={{ textDecoration: 'underline' }}
                        >
                            Login
                        </ChakraLink>
                    </Center>
                </Card>
            </Center>
        </>
    );
}

export default Register;
