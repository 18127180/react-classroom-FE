import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import ModalButton from "../ModalButton"
import ClassroomCard from "../ClassroomCard";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



const LayoutClassroom = (props) => {
    // const [state, setState] = useState({
    //     collapsed: false,
    // });
    const [listCard, setListCard] = useState([]);
    let listItems = listCard.map(e => (
        <Col span={8}><ClassroomCard section={e.section} topic={e.topic} room={e.room} name={e.name} /></Col>
    ));

    const addNewCard = (obj) => {
        let newListCard=listCard.slice();
        newListCard.push(obj);
        setListCard(newListCard);
    };

    useEffect(() => {
        async function getListCardClassroom() {
            const requestUrl = 'https://classroom-ex-04.herokuapp.com/classroom';
            const response = await fetch(requestUrl, { method: 'GET' });
            const responseJson = await response.json();
            setListCard(responseJson);
        }
        getListCardClassroom();
    }, []);
    // const onCollapse = collapsed => {
    //     console.log(collapsed);
    //     setState({ collapsed });
    // };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={false}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        Option 2
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        Files
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Row justify="end" style={{ marginRight: '15px' }}>
                        <Col>
                            <ModalButton name="Thêm lớp học" callBack={(addObj)=>addNewCard(addObj)} />
                        </Col>
                    </Row>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Classroom</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Row gutter={[8, 8]}>
                            {listItems}
                        </Row>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

export default LayoutClassroom;