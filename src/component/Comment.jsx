import { PhoneIcon } from "@chakra-ui/icons"
import { 
    Box, 
    Flex,
    Icon,
    Text } from "@chakra-ui/react"

function Comment() {
    return (
        <>
            <Flex
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}>
                <Box>
                    <Text as={"b"}>
                        natthankrish
                    </Text>
                    <Text>
                        BAGUS BANGET ASTAGA  
                    </Text>
                </Box>
                <Flex
                    flexDirection={"row"}>
                    <PhoneIcon />
                </Flex>

            </Flex>
        </>
    )
}

export default Comment