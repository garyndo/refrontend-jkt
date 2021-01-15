import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { getProduct } from '../action'
import { Table, Button, Form,Modal } from 'react-bootstrap'


class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errAdd: false,
            selectedIndex: null
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:2000/products')
            .then((res) => {
                console.log(res.data)
                this.props.getProduct(res.data)
            })
            .catch((err) => console.log(err))
    }

    renderThead = () => {
        return (
            <thead>
                <tr>
                    <th>#</th>
                    <th>tanggal</th>
                    <th>nama produk</th>
                    <th>Category</th>
                    <th>serial number</th>
                    <th>stok</th>
                    <th>harga</th>
                    <th>action</th>
                </tr>
            </thead>
        )
    }
    renderTbody = () => {
        return (
            <tbody>
                {this.props.product.map((item, index) => {
                    if (this.state.selectedIndex === index) {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.date}</td>
                                <td><input></input></td>
                                <td><input></input></td>
                                <td>{item.serial}</td>
                                <td><input></input></td>
                                <td><input></input></td>
                                <td>
                                    <Button onClick={() => this.handelDone}>done</Button>
                                    <Button onClick={() => this.setState({ selectedIndex: null })}>cancel</Button>
                                </td>
                            </tr>
                        )
                    }
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.date}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.serial}</td>
                            <td>{item.stock}</td>
                            <td>{item.price}</td>
                            <td>
                                <Button onClick={() => this.setState({ selectedIndex: index })}>edit</Button>
                                <Button onClick={() => this.handleDel(index)}>delete</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    tableInput = () => {
        return (
            <tbody>
                <td>#</td>
                <td>
                    <input type='date' ref='tanggal' />
                </td>
                <td>
                    <Form.Control type="text" placeholder="nama produk" ref='namaproduk' />
                </td>
                <td>
                    <Form inline>
                        <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                            
                        </Form.Label>
                        <Form.Control
                            ref='kategori'
                            as="select"
                            className="my-1 mr-sm-2"
                            id="inlineFormCustomSelectPref"
                            custom
                        >
                            <option value="0">Choose...</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Handphone">Handphone</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Beuty">Beuty</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Food&Drink">Food&Drink</option>
                        </Form.Control>
                    </Form>
                </td>
                <td>
                    <Form.Control type="number" placeholder="stok produk" ref='stok' />
                </td>
                <td>
                    <Form.Control type="number" placeholder="harga produk" ref='price' />
                </td>
                <td>
                    <Button onClick={() =>this.handleAdd}>Add</Button>
                </td>
            </tbody>
        )
    }

    handleAdd = () => {
        
        let tanggal = this.refs.tanggal.value
        let namaProduk = this.refs.namaproduk.value
        let kategori = this.refs.kategori.value
        let stock = this.refs.stok.value
        let harga = this.refs.price.value
        let status = 'available'

        if(!tanggal || !namaProduk || !kategori || !stock || !harga) return this.setState ({ errAdd: true})

        let product = {
            date: new Date(tanggal).toLocaleString(),
            name: namaProduk,
            serial: Date.parse(tanggal),
            category: kategori,
            price: harga,
            status: status
        }

        Axios.post('http://localhost:2000/products', product)
        .then((res)=>{
            console.log(res.data)
            Axios.get('http://localhost:2000/products')
            .then((res)=>{
                this.props.getProduct(res.data)
            })
            .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err))
    }

    handleDel = (index) => {
        console.log(index)
    }

    handelDone = () => {
        console.log('done berhasil')
    }

    render() {
        // console.log(this.props.product)
        console.log(this.state.selectedIndex)
        return (
            <div>
                <Table striped bordered hover>
                    {this.renderThead()}
                    {this.renderTbody()}
                    {this.tableInput()}
                </Table>
                <Modal show={this.state.errAdd} onHide={() => this.setState({ errAdd: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>ERROR</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Please input all data
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ errAdd: false })}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}

export default connect(mapStateToProps, { getProduct })(Product)