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

function ContentPhoto() {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                            src='../../assets/ig.png'
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
                                        <Button onClick={onOpen}>
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
                                                />
                                                <Button id='submit-photo'>
                                                    Update
                                                </Button>
                                            </ModalContent>
                                        </Modal>
                                        <Button>Delete Content</Button>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupid atat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum
                            </Text>
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
                                    <Text>99/99/9999</Text>
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
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
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

export default ContentPhoto;
