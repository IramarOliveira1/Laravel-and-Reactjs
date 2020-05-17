import React, { useState, useEffect } from 'react';
import { Table,Container} from "reactstrap";

import axios from '../../services/api';
import Nav from '../../components/navbar/nav';

export default function Product() {
  
  useEffect(() => {
    handleAllProducts();
  }, []);

  const [all,setAll] = useState([]);

  const handleAllProducts = async () => {

      await axios.get('/users', {
      }).then((response) => {
        
        setAll(response.data)
      }).catch((error) => {

        console.log(error);
      });
  
  }
  
  const handleMapAll = all.map((getAll) => {
    return(
        <tr key={getAll.id}>
          <td>{getAll.id}</td>
          <td>{getAll.name}</td>
          <td>{getAll.email}</td>
        </tr>
    )
  });
  
  return (
    <>
      <Nav/>
      <Container>
        <hr/>
        <Table className="align-items-center mt-2" hover responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
              {handleMapAll}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
