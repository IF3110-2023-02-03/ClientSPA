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
import { updateContent, deleteContent, getSource, deleteSource } from '../api/content.js';
import { Form, useNavigate } from 'react-router-dom';

function ContentPhoto({ desc, date, id, path }) {
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newDescription, setNewDescription] = useState('');
    const [description, setDescription] = useState(desc);
    const [deleted, setDeleted] = useState(false);
    const [instruction, setInstruction] = useState('');
    const [previewFile, setPreviewFile] = useState(null);

    useEffect(() => {
        // Check if userID is not set in localStorage, then redirect to home page
        const userID = localStorage.getItem('userID');
        if (!userID) {
            navigate('/');
        }
        processPreview();
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
        console.log(res);
        console.log(res.data);
        const reader = new FileReader();
        reader.onload = () => setPreviewFile(reader.result);
        reader.readAsDataURL(res.data);
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
                            <Image
                                src={previewFile}
                                width={'45%'}
                                maxHeight={'70vh'}
                                objectFit={'contain'}
                            />
                            <Box width={'45%'}>
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
                                <Text as={'b'} fontSize={'24px'}>
                                    Comments
                                </Text>
                                <Box
                                    maxHeight={'40vh'}
                                    overflowY={'auto'}
                                    m={'5px 0 30px 0'}
                                >
                                    <Comment />
                                    <Comment />
                                    <Comment />
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
