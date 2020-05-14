import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table,Container} from "reactstrap";

import axios from '../../services/api';
import Nav from '../../components/navbar/nav';

export default function Product() {
  
  useEffect(() => {
    handleAll();
  }, []);

  let history = useHistory();
  const [all,setAll] = useState([]);

  const handleAll = async () => {

    const token = localStorage.getItem('jwt-token');

      if (!token) {
        history.push('/login');
      }
  
      await axios.get('/users', {
        headers : { Authorization: `Bearer ${token}`}
      }).then((response) => {
        
        setAll(response.data)
      }).catch((error) => {

        console.log(error);
        history.push('/login');
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
