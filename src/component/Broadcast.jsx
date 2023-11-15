import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Flex,
    IconButton,
    Image,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    useDisclosure,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import Comment from './Comment.jsx';
import { useState } from 'react';
import { updateBroadcast, deleteBroadcast } from '../api/broadcast.js';

function BroadcastItem({desc, date, id}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newDescription, setNewDescription] = useState('');
    const [description, setDescription] = useState(desc);
    const [deleted, setDeleted] = useState(false);
    const [instruction, setInstruction] = useState('');

    const processUpdateDescription = async () => {
        try {
            if (newDescription == '') {
                setInstruction('Updated broadcast cannot be empty')
            } else if (newDescription.length > 1000) {
                setInstruction('Broadcast cannot be more than 1000 characters');
            } else {
                const res = await updateBroadcast(newDescription, id);
                setDescription(newDescription);
                onClose();
            }   
        } catch (error) {
            console.log(error);
        }
    }
    
    const processDeleteBroadcast = async () => {
        try {
            const res = await deleteBroadcast(id);
            setDeleted(true);
        } catch (error) {
            console.log(error);
        }
    }

    function NewlineText(props) {
        const text = props.text;
        return text.split('\n').map(str => <p key={crypto.randomUUID()}>{str}</p>);
    }

    const openModal = () => {
        onOpen();
        setInstruction('');
    }

    if (deleted) {
        return <></>
    } else {
        return (
            <>
                <Card flex shadow={'2xl'} w={'80%'} mb={'3%'}>
                    <CardBody>
                        <Flex
                            flexDirection={'row'}
                            gap={'5%'}
                            justifyContent={'space-around'}
                        >
                            <Box width={'95%'}>
                                <Flex justifyContent={'right'} >
                                    <Popover>
                                        <PopoverTrigger>
                                            <IconButton
                                                aria-label='Search database'
                                                bg={'white'}
                                                icon={<EditIcon bg={'white'} />}
                                            />
                                        </PopoverTrigger>
                                        <PopoverContent w={'-moz-fit-content'}>
                                            <PopoverArrow />
                                            <Button onClick={openModal}>
                                                Edit Description
                                            </Button>
                                            <Modal
                                                onClose={onClose}
                                                isOpen={isOpen}
                                                isCentered
                                            >
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>
                                                        Edit Broadcast
                                                    </ModalHeader>
                                                    <ModalCloseButton />
                                                    <Textarea
                                                        type='description'
                                                        id='desc'
                                                        placeholder='Description'
                                                        w={'90%'}
                                                        m={'5% 5% 0 5%'}
                                                        onChange={(e) => setNewDescription(e.target.value)}
                                                        defaultValue={description}
                                                    />
                                                    <Text 
                                                        color={'red'}
                                                        width={'90%'}
                                                        m={'0 0 5% 5%'}>{instruction}</Text>
                                                    <Button onClick={processUpdateDescription}>
                                                        Update
                                                    </Button>
                                                </ModalContent>
                                            </Modal>
                                            <Button onClick={processDeleteBroadcast}>Delete Content</Button>
                                        </PopoverContent>
                                    </Popover>
                                </Flex>
                                <NewlineText text={description} />
                                <Flex m={'10px 0 5px 0'} flexDirection={'row'}>
                                    <Flex
                                        flexDirection={'row'}
                                        alignItems={'center'}
                                        gap={'20px'}
                                    >
                                        <Image
                                            src='../../assets/heart.png'
                                            h={'20px'}
                                            w={'20px'}
                                        />
                                        <Text>Likes</Text>
                                        <Image
                                            src='../../assets/date.png'
                                            h={'20px'}
                                            w={'20px'}
                                        />
                                        <Text>{date}</Text>
                                    </Flex>
                                </Flex>
                                <Divider mt={'20px'} />
                                <CardFooter flexDirection={'column'}>
                                    <Text as={'b'} fontSize={'24px'}>
                                        Comments
                                    </Text>
                                    <Box
                                        maxHeight={'20vh'}
                                        overflowY={'auto'}
                                        m={'5px 0 30px 0'}
                                    >
                                        <Comment />
                                        <Comment />
                                        <Comment />
                                        <Comment />
                                    </Box>
                                </CardFooter>
                            </Box>
                        </Flex>
                    </CardBody>
                </Card>
            </>
        );
    }

}

export default BroadcastItem;
