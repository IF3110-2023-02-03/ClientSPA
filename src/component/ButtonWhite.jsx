import { PhoneIcon } from "@chakra-ui/icons"
import { 
    Button} from "@chakra-ui/react"

function ButtonWhite({text, pv, ph, fontSize, handler}) {
    return (
        <>
            <Button
                color= {"black"}
                background={"white"}
                fontSize={fontSize ? fontSize : 16 + "px"}
                border={"2px solid black"}
                borderRadius={"15px"}
                textAlign={"center"}
                onClick={handler}
                padding={ pv ? pv : 10  + "px " + ph ? ph : 20 + "px"}
                >
                {text}
            </Button>
        </>
    )
}

export default ButtonWhite