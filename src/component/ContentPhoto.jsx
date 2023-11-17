import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    IconButton,
    Image,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
    Text,
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import Comment from './Comment.jsx';
import { useEffect, useState } from 'react';
import { updateContent, deleteContent, getSource, deleteSource, getLikeCount, getComment } from '../api/content.js';
import { Form, useNavigate } from 'react-router-dom';

function ContentPhoto({ desc, date, id, path }) {
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newDescription, setNewDescription] = useState('');
    const [description, setDescription] = useState(desc);
    const [deleted, setDeleted] = useState(false);
    const [instruction, setInstruction] = useState('');
    const [previewFile, setPreviewFile] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        // Check if userID is not set in localStorage, then redirect to home page
        const userID = localStorage.getItem('userID');
        if (!userID) {
            navigate('/');
        }
        processPreview();
        processLikeCount();
        loadComment();
    }, [navigate]);

    const processUpdateDescription = async () => {
        try {
            if (newDescription == '') {
                setInstruction('Updated description cannot be empty')
            } else if (newDescription.length > 1000) {
                setInstruction('Description cannot be more than 1000 characters');
            } else {
                const res = await updateContent(newDescription, id);
                setDescription(newDescription);
                onClose();
            }   
        } catch (error) {
            console.log(error);
        }
    }
    
    const processDeleteContent = async () => {
        try {
            await deleteContent(id);
            await deleteSource(path);
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

    const processPreview = async () => {
        let res = await getSource(path);
        const reader = new FileReader();
        reader.onload = () => setPreviewFile(reader.result);
        reader.readAsDataURL(res.data);
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
                            flexDirection={{ base:'column', md: 'row' }}
                            gap={'5%'}
                            justifyContent={'space-around'}
                        >
                            <Image
                                src={previewFile}
                                width={{ base:'100%', md: '45%' }}
                                maxHeight={'70vh'}
                                objectFit={'contain'}
                            />
                            <Box width={{ base:'100%', md: '45%' }}>
                                <Flex justifyContent={'right'} mb={'20px'}>
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
                                                        Edit Description
                                                    </ModalHeader>
                                                    <ModalCloseButton />
                                                    <Textarea
                                                        type='description'
                                                        id='desc'
                                                        placeholder='Description'
                                                        w={'90%'}
                                                        m={'5%'}
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
                                            <Button onClick={processDeleteContent}>Delete Content</Button>
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
                                <Text as={'b'} fontSize={'24px'}>
                                    Comments
                                </Text>
                                <Box
                                    maxHeight={'40vh'}
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
                            </Box>
                        </Flex>
                    </CardBody>
                </Card>
            </>
        );
    }
}

export default ContentPhoto;
