import {
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    Image,
    Text,
    Textarea,
    Flex,
    Box,
    Heading,
    Center,
    TagLabel,
    FormLabel,
    useSafeLayoutEffect,
} from '@chakra-ui/react';
import BroadcastItem from '../component/Broadcast.jsx';
import ButtonWhite from '../component/ButtonWhite.jsx';
import { getContent, addContent } from '../api/content.js';
import ContentPhoto from '../component/ContentPhoto.jsx';
import ContentVideo from '../component/ContentVideo.jsx';
import Navbar from '../component/Navbar.jsx';
import { Form, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Content() {
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);
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
            const res = await getContent();
            setData(res);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const openModal = () => {
        onOpen();
        setSelectedFile(null);
        setPreviewFile(null);
        setInstruction('');
        setDescription('');
    };

    const processAddContent = async () => {
        try {
            if (!selectedFile) {
                setInstruction('No File Chosen');
            } else if (description == '') {
                setInstruction('Fill file description first');
            } else if (description.length > 1000) {
                setInstruction('Description cannot be more than 1000 characters');
            } else {
                const formData = new FormData();
                formData.append("userID", localStorage.getItem('userID'));
                formData.append("file", selectedFile);
                formData.append("description", description);
                await addContent(formData);
                loadData();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const preview = () => {
      if (!selectedFile) {
        return (
            <Image
                src='../../assets/no-image.jpg'
                maxHeight={'30vh'}
                maxWidth={'100%'}
                objectFit={'contain'}
                id='add-photo-display'
            /> 
      )} else {
        const reader = new FileReader();
        reader.onload = () => setPreviewFile(reader.result);
        reader.readAsDataURL(selectedFile);
        if (selectedFile.type == 'video/mp4') {
            return (
                <video
                    src={previewFile}
                    maxheight={'30vh'}
                    maxwidth={'100%'}
                    objectfit={'contain'}
                    id='add-photo-display'
                    controls
                /> 
            )
        } else {
            return (
                <Image
                    src={previewFile}
                    maxHeight={'30vh'}
                    maxWidth={'100%'}
                    objectFit={'contain'}
                    id='add-photo-display'
                />
            )
        }
      }
    };

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
                        <Heading>Contents</Heading>
                        <ButtonWhite
                            text={'Add New Content'}
                            handler={openModal}
                        />
                        <Modal onClose={onClose} isOpen={isOpen} isCentered>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Add New Content</ModalHeader>
                                <ModalCloseButton />
                                {preview()}
                                <Center mt={'4%'}>
                                    <FormLabel 
                                        htmlFor='file-input'
                                        border={'2px solid black'}
                                        borderRadius={'15px'}
                                        textAlign={'center'}
                                        padding={'10px 20px'}>
                                        Choose File
                                    </FormLabel>
                                </Center>
                                <Input
                                    type='file'
                                    id='file-input'
                                    display={"none"}
                                    accept=".jpg, .jpeg, .png, .mp4"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                />
                                <Textarea
                                    type='description'
                                    id='desc'
                                    placeholder='Description'
                                    w={'90%'}
                                    m={'5%'}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                                <Center
                                    color={'red'}
                                    width={'90%'}
                                    m={'0 0 5% 5%'}
                                >
                                    {instruction}
                                </Center>
                                <Button onClick={processAddContent}>
                                    Upload Content
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
                                    if (item.type == 'Photo' ) {
                                        return <ContentPhoto 
                                                    key={item.objectID}
                                                    id={item.objectID}
                                                    desc={item.description}
                                                    date={item.post_date}
                                                    path={item.url}
                                                />
                                    }
                                    return <ContentVideo
                                        key={item.objectID}
                                        id={item.objectID}
                                        desc={item.description}
                                        date={item.post_date}
                                        path={item.url}
                                    />
                                })}
                            </>}
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}

export default Content;