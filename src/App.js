import React from 'react'
import Navigation from './component/navigation'
import Product from './component/product'

class App extends React.Component {
    render() {
        return (
            <div>
                <Navigation/>
                <Product/>
            </div>
        )
    }
}

export default App 