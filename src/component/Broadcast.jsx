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
import { useEffect, useState } from 'react';
import { updateBroadcast, deleteBroadcast, getLikeCount, getComment } from '../api/broadcast.js';
import { useNavigate } from 'react-router-dom';

function BroadcastItem({desc, date, id}) {
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newDescription, setNewDescription] = useState('');
    const [description, setDescription] = useState(desc);
    const [deleted, setDeleted] = useState(false);
    const [instruction, setInstruction] = useState('');
    const [likeCount, setLikeCount] = useState(0);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        // Check if userID is not set in localStorage, then redirect to home page
        const userID = localStorage.getItem('userID');
        if (!userID) {
            navigate('/');
        }
        processLikeCount();
        loadComment();
    }, [navigate]);

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

    const processLikeCount = async () => {
        let res = await getLikeCount(id)
        setLikeCount(res.data.data.count)
    }

    const loadComment = async () => {
        let res = await getComment(id)
        console.log(res.data.data);
        setComment(res.data.data);
    }

    if (deleted) {
        return <></>
    } else {
        return (
            <>
                <Card flex shadow={'2xl'} w={{ base:'100%', md: '80%' }} mb={'3%'}>
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
                                        flexDirection={{ base:'column', md: 'row' }}
                                        gap={{ base:'10px', md: '20px' }}
                                    >   
                                        <Flex
                                            flexDirection={'row'}
                                            alignItems={'center'}
                                            gap={'20px'}>
                                            <Image
                                                src='../../assets/heart.png'
                                                h={'20px'}
                                                w={'20px'}
                                            />
                                            <Text> {likeCount} Likes</Text>

                                        </Flex>
                                        <Flex 
                                            flexDirection={'row'}
                                            alignItems={'center'}
                                            gap={'20px'}>
                                            <Image
                                                src='../../assets/date.png'
                                                h={'20px'}
                                                w={'20px'}
                                            />
                                            <Text>{date}</Text>
                                        </Flex> 
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
                                        {comment.length == 0 
                                            ? <>No Comments</> 
                                            : <>
                                                {comment.map((item) => {
                                                    return (
                                                        <Comment
                                                            key={item.commentID}
                                                            type={item.type}
                                                            id={item.commentID}
                                                            user={item.user}
                                                            message={item.message}
                                                        />
                                                    );
                                                })}
                                            </>}
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
