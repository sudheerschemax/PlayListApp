import React from 'react';
import './App.css';
import { Layout, Menu, Icon, Col } from 'antd';
import BasicLayout from './orchestrationmockups/BasicLayout';
const { Header, Sider, Content, Footer }: any = Layout;

class App extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <div className="App">
                <BasicLayout/>
             </div>
        );
    }
}


export default App;
