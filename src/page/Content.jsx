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
    Textarea,
    Flex,
    Box,
    Heading,
    Center,
} from '@chakra-ui/react';
import ButtonWhite from '../component/ButtonWhite.jsx';
import ContentPhoto from '../component/ContentPhoto.jsx';
import ContentVideo from '../component/ContentVideo.jsx';
import Navbar from '../component/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Content() {
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        // Check if userID is not set in localStorage, then redirect to home page
        const userID = localStorage.getItem('userID');
        if (!userID) {
            navigate('/');
        }
    }, [navigate]);

    const getContent = async () => {
        try {
            const res = await getContent(username, password);
            localStorage.setItem('token', res.token);
            localStorage.setItem('userID', res.userID);
        } catch (error) {
            console.log(error);
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
                            handler={onOpen}
                        />
                        <Modal onClose={onClose} isOpen={isOpen} isCentered>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Add New Content</ModalHeader>
                                <ModalCloseButton />
                                <Image
                                    src='../../assets/home-page.png'
                                    maxHeight={'30%'}
                                    maxWidth={'100%'}
                                    objectFit={'contain'}
                                    id='add-photo-display'
                                />
                                <Center mt={'4%'}>
                                    <label htmlFor='file-input'>
                                        <ButtonWhite text={'Choose File'} />
                                    </label>
                                </Center>
                                <Input
                                    type='file'
                                    id='file-input'
                                    display={'none'}
                                />
                                <Textarea
                                    type='description'
                                    id='desc'
                                    placeholder='Description'
                                    w={'90%'}
                                    m={'5%'}
                                />
                                <Button id='submit-photo'>
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
                        <ContentPhoto />
                        <ContentVideo />
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}

export default Content;