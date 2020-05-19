import React, { useState, useEffect } from 'react';

import { Button, Modal, Container, Table, Form, Input, FormGroup, Label } from "reactstrap";
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';

import axios from '../../services/api';
import Nav from '../../components/navbar/nav';


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

export default function Product() {

  useEffect(() => {
    handleAllProducts();
    handleAllCategories();
  }, []);

  const MySwal = withReactContent(Swal)
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesId, setCategoriesId] = useState("");

  const handleAllProducts = async () => {

    await axios.get('/produtos', {
    }).then((response) => {

      setProducts(response.data)
    }).catch((error) => {

      console.log(error);
    });
  }

  const handleAllCategories = async () => {

    await axios.get('/category').then((response) => {
      setCategories(response.data)
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleSubmit = async () => {
    if (!name || !quantidade || !preco || !categoriesId) {
      MySwal.fire({
        icon: 'info',
        title: 'Preencha os campos vazios!',
      })
      return name;
    }

    await axios.post('/store/produtos', {
      name: name,
      quantidade: quantidade,
      preco: preco,
      categoriesId: categoriesId
    }).then(() => {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Cadastrado com sucesso :)'
      })

      setName('');
      setQuantidade('');
      setPreco('');
      setCategoriesId('');
      setModal(false);
      handleAllProducts();
      handleAllCategories();

    }).catch((err) => {
      console.log(err);

    });

  }

  const handleMapCategories = categories.map((getAllCategories) => {
    return (
      <option key={getAllCategories.id} value={getAllCategories.id}>
        {getAllCategories.name}
      </option>
    );
  });

  const handleMapAll = products.map((getAll) => {
    return (
      <tr key={getAll.id}>
        <td>{getAll.id}</td>
        <td>{getAll.name}</td>
        <td>{getAll.quantidade}</td>
        <td>{getAll.preco}</td>
        <td>{getAll.categoria.name}</td>
        <td>
          <Button color="danger"> <AiFillDelete /> </Button>
          <Button color="info" > <AiTwotoneEdit /> </Button>
        </td>
      </tr>
    )
  });

  return (
    <>
      <Nav />
      <Container>
        <hr />
        <Button color="primary"
          type="button"
          className="mb-3"
          onClick={() => setModal(true)}
        >
          Novo Produto
        </Button>
        <Modal
          className="modal-dialog"
          isOpen={modal}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Produtos
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setModal(false)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form>
              <Label>Nome</Label>
              <FormGroup>
                <Input
                  className="form-control"
                  id="nome"
                  type="text"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </FormGroup>
              <Label>Quantidade</Label>
              <FormGroup>
                <Input
                  className="form-control"
                  id="quantidade"
                  type="text"
                  value={quantidade}
                  onChange={event => setQuantidade(event.target.value)}
                />
              </FormGroup>
              <Label>Preço</Label>
              <FormGroup>
              <Input
                  className="form-control"
                  id="preco"
                  type="text"
                  value={preco}
                  onChange={event => setPreco(event.target.value)}
                />
              </FormGroup>
              <Label>Categoria</Label>
              <FormGroup>
                <select className="form-control" onChange={event => setCategoriesId(event.target.value)}>
                  <option>SELECIONE</option>
                  {handleMapCategories}
                </select>
              </FormGroup>
            </Form>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => setModal(false)}
            >
              fechar
            </Button>
            <Button color="success" type="submit" onClick={handleSubmit} >
              Salvar
            </Button>
          </div>
        </Modal>

        <Table className="align-items-center mt-2" hover responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nome</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Preço</th>
              <th scope="col">Categoria</th>
              <th scope="col">Ações</th>
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
