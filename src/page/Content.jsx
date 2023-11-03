import { Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, useDisclosure, Button, Input, Image, Textarea } from '@chakra-ui/react'
import Navbar from '../component/Navbar.jsx'
import "../style/Page.css"
import { useState } from 'react'

function Content() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <div className='content-wrapper'>
        <Navbar />
        <div className="content">
            <div className="item-settings-container">
                <h1 className="title">Contents</h1>
                <Button onClick={onOpen} className="button-white">Add Content</Button>
                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent className='add-photo-popup'>
                        <ModalHeader >Add Photo</ModalHeader>
                        <ModalCloseButton />
                        <Image src="../../assets/home-page.png" className="add-photo-img" id="add-photo-display"/>
                        <div className="hcenter">
                            <label htmlFor="file-input" className="input-label">Choose File</label>
                        </div>
                        <Input type="file" id="file-input"/>
                        <div className="form-group">
                            <Textarea type="description" id="desc" className="desc" placeholder="Description" w={'90%'}/>
                        </div>
                        <Button className="button-black" id="submit-photo">Upload Content</Button>
                    </ModalContent>
                </Modal>
            </div>
            <br/>
            <div className="content-container" id="container">
            </div>
        </div>
      </div>
      
    </>
  )
}

export default Content