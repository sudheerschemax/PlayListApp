import React, { Component } from 'react';
import { Layout, Menu, Icon, Col, Breadcrumb } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import SurplusLocationCategoryForm from '../components/servicecomponents/SurplusLocationCategory';

import Playlist from '../components/servicecomponents/PlayList/Playlist';
import CreatePlaylist from '../components/servicecomponents/CreatePlayList/CreatePlayList';
import SearchSong from '../components/servicecomponents/SearchSong/Searchsong';


const { Header, Sider, Content, Footer }: any = Layout;
class BasicLayout extends Component {
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

            <Layout>
                <Router>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>

                        <Menu theme="dark" mode="inline" style={{ paddingTop: "20px" }} defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Link to="/playlist"> <Icon type="dashboard" />
                                    <span>Songs Library
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/createplayList"> <Icon type="dashboard" />
                                    <span>Create PlayList
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/searchsong"> <Icon type="dashboard" />
                                    <span>Search a Song
                                    </span>
                                </Link>
                            </Menu.Item>


                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <div className="ant-pro-global-header">
                                <span className="ant-pro-global-header-trigger">
                                    <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle}
                                    />
                                </span>
                            </div>
                        </Header>

                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                background: '#fff',
                                minHeight: 280,
                            }}  
                        >
                            <Route exact path = "/playlist" component = {Playlist} />
                            <Route exact path = "/createplayList" component = {CreatePlaylist} />
                            <Route exact path = "/searchsong" component = {SearchSong} />


                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Design ©2020</Footer>
                    </Layout>
                </Router>
            </Layout>
        );
    }
}

export default BasicLayout;
