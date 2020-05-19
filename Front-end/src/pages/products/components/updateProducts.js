import React, { useState, useEffect } from 'react';

import { Button, Modal, Form, FormGroup, Input, Label } from "reactstrap";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import axios from '../../../services/api';

export default function UpdateProducts({ getProducts, handleDelete, handleAllProducts, handleMapCategories, handleAllCategories }) {

    const MySwal = withReactContent(Swal)
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [categoriesId, setCategoriesId] = useState('');

    useEffect(() => {
        setName(getProducts.name);
        setQuantidade(getProducts.quantidade);
        setPreco(getProducts.preco);
        setCategoriesId(getProducts.categoria.id);
    }, []);

    const handleUpdateProducts = async () => {
        if (!name || !quantidade || !preco || !categoriesId) {
            MySwal.fire({
                icon: 'info',
                title: "Atenção",
                text: 'Preencha os campos vazios!',
            })
            return name;
        }

        await axios.put(`update/produtos/${getProducts.id}`, {
            name: name,
            quantidade: quantidade,
            preco: preco,
            id_categoria: categoriesId,
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
                title: 'Produto atualizado com sucesso :)'
            })

            setModal(false);
            handleAllProducts();
            handleAllCategories();
        }).catch((err) => {
            console.log(err);
        });
    }

    const optionAllCategories = handleMapCategories.map((result) => {
        return (
            <option key={result.props.value} value={result.props.value}>
                {result.props.children}
            </option>
        )
    })

    return (
        <>
            <tr>
                <td>{getProducts.id}</td>
                <td>{getProducts.name}</td>
                <td>{getProducts.quantidade}</td>
                <td>{getProducts.preco}</td>
                <td>{getProducts.categoria.name}</td>
                <td>
                    <Button color="danger" onClick={() => handleDelete(getProducts.id)}> <AiFillDelete /> </Button>
                    <Button color="info" onClick={() => setModal(true)} > <AiTwotoneEdit /> </Button>
                </td>
            </tr>
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
                            <select className="form-control" value={categoriesId} onChange={event => setCategoriesId(event.target.value)}>
                                <option>SELECIONE</option>
                                {optionAllCategories}
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
                    <Button color="success" type="submit" onClick={handleUpdateProducts} >
                        Salvar
                    </Button>
                </div>
            </Modal>
        </>
    )
}
