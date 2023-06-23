import React,{useContext,useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,FormControl,FormLabel,Input
  } from '@chakra-ui/react'
import axios from 'axios';
import { Button, ButtonGroup } from '@chakra-ui/react'
// import { FaUserEdit} from "react-icons/fa";
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
function TableComponent() {
    const MICROSERVICE1_URL = "https://plain-capris-eel.cyclic.app";
    const MICROSERVICE2_URL = "https://tame-gold-hummingbird-wrap.cyclic.app";
    const MICROSERVICE3_URL = "https://drab-gray-bream-gear.cyclic.app";
    const [data,setData]=useState([]);
    const [id,setId]=useState();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [gender,setGender]=useState("");
    const [status,setStatus]=useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [bool,setBool]=useState(false);

    useEffect(()=>{
        getData();
    },[]);

    useEffect(()=>{
      getData();
  },[bool]);

    const handleSave = () => {
        getData();
        const user= data.filter(i=>i.id===id);
        const updatedUser = {
            name: name,
            email: email,
            status:status,
            gender:gender,
            ...user,
        };
      
        axios.put(`${MICROSERVICE2_URL}/users/${id}`, updatedUser)
          .then(function (response) {
            console.log(response.data);
            // Handle success response
          })
          .catch(function (error) {
            console.log(error);
            // Handle error response
          });
        setBool(!bool);
        onClose();
      };
      
    const getData=async ()=>{
        await axios.get(`${MICROSERVICE1_URL}/users`)
      .then(function (response) {
        console.log(response.data.data,"daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        setData(response.data);
        
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    const handleEdit = (id,name, email,gender,status) => {
        setId(id);
        setName(name);
        setEmail(email);
        setGender(gender);
        setStatus(status);
        onOpen();
      };

  return (
    <div>
        <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>Users List</TableCaption>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>Email</Th>
        <Th>Gender</Th>
        <Th>Status</Th>
        <Th>Edit</Th>
      </Tr>
    </Thead>
    <Tbody>
    {data && data.map((e)=>{
      return(
        <Tr>
            <Td>{e.id}</Td>
            <Td>{e.name}</Td>
            <Td>{e.email}</Td>
            <Td>{e.gender}</Td>
            <Td>{e.status}</Td>
            <Td><Button onClick={() => handleEdit(e.id,e.name, e.email,e.gender,e.status)} >Edit</Button></Td>
        </Tr>
       )
    })}
      
      
    </Tbody>
    <Tfoot>
      
    </Tfoot>
  </Table>
</TableContainer>







<Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} finalFocusRef={finalRef}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Edit User Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody pb={6}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input ref={initialRef} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Status</FormLabel>
        <Input placeholder="Email" value={status} onChange={(e) => setEmail(e.target.status)} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Gender</FormLabel>
        <Input placeholder="Email" value={gender} onChange={(e) => setEmail(e.target.gender)} />
      </FormControl>
    </ModalBody>

    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={handleSave} >
        Save
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>




   </div>
  )
}

export default TableComponent;
