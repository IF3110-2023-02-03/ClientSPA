import {
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Textarea,
    Flex,
    Box,
    Heading,
} from '@chakra-ui/react';
import BroadcastItem from '../component/Broadcast.jsx';
import Navbar from '../component/Navbar.jsx';
import ButtonWhite from '../component/ButtonWhite.jsx';
import { getBroadcast, addBroadcast } from '../api/broadcast.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Broadcast() {
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [description, setDescription] = useState('');
    const [instruction, setInstruction] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        // Check if userID is not set in localStorage, then redirect to home page
        const userID = localStorage.getItem('userID');
        if (!userID) {
            navigate('/');
        }
        loadData();
    }, [navigate]);

    const loadData = async () => {
        try {
            const res = await getBroadcast();
            setData(res);
        } catch (error) {
            console.log(error);
        }
    };

    const processAddBroadcast = async () => {
        try {
            if (description == '') {
                setInstruction('Type your broadcast first');
            } else if (description.length > 1000) {
                setInstruction('Broadcast cannot be more than 1000 characters');
            } else {
                await addBroadcast(description);
                loadData();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const openModal = () => {
        onOpen();
        setInstruction('');
        setDescription('');
    };

    return (
        <>
            <Flex justify={'center'} margin={'0 auto'}>
                <Navbar />
                <Box
                    w={'80%'}
                    h={'100%'}
                    mt={{ base:'30%', sm:'20%', lg: '8%' }}
                    justify={'center'}
                    flexDirection={'column'}
                >
                    <Flex
                        flexDirection={'row'}
                        justify={'space-between'}
                        align={'center'}
                        mb={'3%'}
                    >
                        <Heading fontSize={{ base:'25px', sm: '30px' }}>Broadcasts</Heading>
                        <ButtonWhite
                            text={'Add New Broadcast'}
                            handler={openModal}
                            fontSize={{ base:'15px', sm: '20px' }}
                        />
                        <Modal
                            onClose={onClose}
                            isOpen={isOpen}
                            size={'xl'}
                            isCentered
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Add New Broadcast</ModalHeader>
                                <ModalCloseButton />
                                <Textarea
                                    type='description'
                                    id='desc'
                                    placeholder='Description'
                                    w={'90%'}
                                    m={'5% 5% 0 5%'}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                                <Text
                                    color={'red'}
                                    width={'90%'}
                                    m={'0 0 5% 5%'}
                                >
                                    {instruction}
                                </Text>
                                <Button onClick={processAddBroadcast}>
                                    Post Broadcast
                                </Button>
                            </ModalContent>
                        </Modal>
                    </Flex>
                    <Flex
                        justify={'center'}
                        align={'center'}
                        flexDirection={'column'}
                        id={'container'}
                    >
                        {data.length == 0 
                            ? <></> 
                            : <>
                                {data.data.data.map((item) => {
                                    return (
                                        <BroadcastItem
                                            key={item.objectID}
                                            id={item.objectID}
                                            desc={item.description}
                                            date={item.post_date}
                                        />
                                    );
                                })}
                            </>}
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}

export default Broadcast;