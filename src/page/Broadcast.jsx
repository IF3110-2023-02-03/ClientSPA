import {
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    useDisclosure,
    Button,
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

function Broadcast() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [description, setDescription] = useState('');

    const container = document.getElementById('container')
    
    const loadBroadcast = () => {
        try {
            const [data, setData] = useState([]);
            useEffect(() => {
                const getData = async () => {
                  try {
                    const res = await getBroadcast()
                    setData(res);
                  } catch (err) {
                    console.error(err);
                  }
                }
              
                getData();
              }, []);
            if (data.length != 0) {
                return (
                    <>
                        {data.data.data.map((item) => {
                            return  (
                                <BroadcastItem key={item.objectID} id={item.objectID} desc={item.description} date={item.post_date}/>
                            )}
                        )}
                    </>
                );
            } 
        } catch (error) {
            console.log(error);
            return (<></>)
        }
    }

    const refresh = () => {
        window.location.reload(false);
    }

    const processAddBroadcast = async () => {
        try {
            const res = await addBroadcast(description);
            refresh()
            onClose();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Flex justify={'center'} margin={'0 auto'}>
                <Navbar />
                <Box
                    w={'80%'}
                    h={'100%'}
                    mt={'8%'}
                    justify={'center'}
                    flexDirection={'column'}
                >
                    <Flex
                        flexDirection={'row'}
                        justify={'space-between'}
                        align={'center'}
                        mb={'3%'}
                    >
                        <Heading>Broadcasts</Heading>
                        <ButtonWhite
                            text={'Add New Broadcast'}
                            handler={onOpen}
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
                                    m={'5%'}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Button onClick={processAddBroadcast}>Post Broadcast</Button>
                            </ModalContent>
                        </Modal>
                    </Flex>
                    <Flex
                        justify={'center'}
                        align={'center'}
                        flexDirection={'column'}
                        id={'container'}
                    >
                        {loadBroadcast()}
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}

export default Broadcast;
