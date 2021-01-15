import React from 'react'
import { Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'


class Navigation extends React.Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Brand href="#home">Gudang</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {/* stok produk = {this.props.product.length} */}
                            {this.props.product.length > 0 ? this.props.product.length : 'available'}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}

export default connect(mapStateToProps)(Navigation)