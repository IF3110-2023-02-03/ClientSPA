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
    Center} from '@chakra-ui/react'
import BroadcastItem from '../component/Broadcast.jsx'
import Navbar from '../component/Navbar.jsx'
import ButtonWhite from '../component/ButtonWhite.jsx'

function Broadcast() {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex
        justify={"center"}
        margin={"0 auto"}>
        <Navbar />
        <Box 
            w={"80%"}
            h={"100%"}
            mt={"8%"}
            justify={"center"}
            flexDirection={"column"}>
            <Flex
                flexDirection={"row"}
                justify={"space-between"}
                align={"center"}
                mb={"3%"}>
                <Heading>Broadcasts</Heading>
                <ButtonWhite text={"Add New Broadcast"} handler={onOpen}/>
                <Modal 
                    onClose={onClose}
                    isOpen={isOpen} 
                    size={"xl"}
                    isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader >Add New Broadcast</ModalHeader>
                        <ModalCloseButton />
                        <Textarea 
                            type="description" 
                            id="desc"
                            placeholder="Description" 
                            w={'90%'}
                            m={"5%"}/>
                        <Button id="submit-photo">Broadcast</Button>
                    </ModalContent>
                </Modal>
            </Flex>
            <Flex
                justify={"center"}
                align={"center"}
                flexDirection={"column"}>
                <BroadcastItem />
                <BroadcastItem />
            </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default Broadcast