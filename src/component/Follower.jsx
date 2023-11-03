import { 
    Box,
    Button,
    Card, 
    CardBody,
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
    CardFooter,
    Heading} from "@chakra-ui/react"

function Follower() {
    return (
      <>
        <Card 
            flex 
            shadow={"2xl"} 
            w={"30%"}
            mb={"3%"}>
            <CardBody>
                <Flex
                    flexDirection={"row"}
                    gap={"5%"}
                    justifyContent={"space-around"}>
                    <Box
                        width={"95%"}>
                        <Heading as={"h2"}>Natthan Krish</Heading>
                        <Text>@natthankrish</Text>
                        <Flex
                            m={"10px 0 5px 0"}
                            flexDirection={"row"}>
                            <Flex 
                                flexDirection={"row"}
                                alignItems={"center"}
                                gap={"10px"}>
                                <Image 
                                    src="../../assets/check.png"
                                    h={"20px"}
                                    w={"20px"}/>
                                <Text>120 Following</Text>
                                <Image 
                                    src="../../assets/date.png"
                                    h={"20px"}
                                    w={"20px"}/>
                                <Text>12 Posts</Text>
                            </Flex>
                        </Flex>
                        <Divider mt={"20px"}/>
                        <Button text={"Delete From Followers"} w={"100%"} >Delete From Followers</Button>
                    </Box>
                </Flex>
            </CardBody>
        </Card>
      </>
    )
}
  
export default Follower