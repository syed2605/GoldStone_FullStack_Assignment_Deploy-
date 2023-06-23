import React from 'react'
import TableComponent from '../components/TableComponent'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Text,Box } from '@chakra-ui/react'
import axios from 'axios';
function Home() {
  const MICROSERVICE3_URL = "http://localhost:8082";
    const getData=async ()=>{
      axios.get(`${MICROSERVICE3_URL}/export-csv`)
    .then(function (response) {
      console.log("d");
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  
  return (
    <div>
        <Box  bg='grey' w='100%' p={4}  style={{display:"flex",justifyContent:"space-around"}}>
            <Text fontSize='3xl'> Welocme to Gold_Stone_MicroServices</Text>
            <Button colorScheme='teal' variant='solid' onClick={getData}>User csv download</Button>
        </Box>
        <TableComponent/>
    </div>
  )
}

export default Home