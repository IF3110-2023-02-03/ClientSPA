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
function Login() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

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
                            Login
                        </Heading>
                    </CardHeader>
                    <Divider />
                    <Text m='20px 8px 10px 10px'>Username</Text>
                    <Input placeholder='Enter Username' size='md' />
                    <Text m='20px 8px 10px 10px'>Password</Text>
                    <InputGroup size='md' mb={'20px'}>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Center mb={'30px'}>
                        Do not have an account?
                        <Link to='/register'>Register</Link>
                    </Center>
                    <Button>Login</Button>
                </Card>
            </Center>
        </>
    );
}

export default Login;
