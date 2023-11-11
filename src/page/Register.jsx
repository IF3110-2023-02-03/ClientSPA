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
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import register from '../api/register.js';

function Register() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [username, setUsername]  = useState('');
    const [name, setName]  = useState('');
    const [mail, setMail]  = useState('');
    const [pass, setPass]  = useState('');
    const [cpass, setCpass]  = useState('');

    const processRegister = async () => {
        try {
            const res = await register(username, name, mail, pass);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

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
                    width={'24vw'}
                    shadow={'2xl'}
                    padding={'2%'}
                    borderRadius={'50px'}
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
                    <Text m='20px 8px 10px 10px'>Name</Text>
                    <Input placeholder='Enter Username' size='md' onChange = {(e) => setName(e.target.value)}/>
                    <Text m='20px 8px 10px 10px'>Username</Text>
                    <Input placeholder='Enter Username' size='md' onChange = {(e) => setUsername(e.target.value)}/>
                    <Text m='20px 8px 10px 10px'>Email</Text>
                    <Input placeholder='Enter Email' size='md' onChange = {(e) => setMail(e.target.value)}/>
                    <Text m='20px 8px 10px 10px'>Password</Text>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            onChange = {(e) => setPass(e.target.value)}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Text m='20px 8px 10px 10px'>Confirm Password</Text>
                    <InputGroup size='md' mb={'20px'}>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            onChange = {(e) => setCpass(e.target.value)}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Center mb={'30px'}>
                        Already have an account?<Link to='/login'>Login</Link>
                    </Center>
                    <Button onClick={processRegister}>Register</Button>
                </Card>
            </Center>
        </>
    );
}

export default Register;
