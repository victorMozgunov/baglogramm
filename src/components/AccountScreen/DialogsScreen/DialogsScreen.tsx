import { MenuOutlined, UserOutlined } from "@ant-design/icons"
import { Col, Dropdown, Menu, MenuProps, Row } from "antd"
import { Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../../hooks/hooks"
import { logout } from "../../../redux/auth-reducer"

const DialogsScreen = () => {
    const dispatch = useAppDispatch()

    const items: MenuProps['items'] = [
        <Link to='/profile'>Profile</Link>,
        <Link to='/users'>Users</Link>,
        <Link to='/friends'>Friends</Link>,
        <div onClick={() => dispatch(logout())}>Exit</div>,

    ].map((user, index) => ({
        key: String(index + 1),
        label: user,
    }))

    const dialogsItems: MenuProps['items'] = [
        <div style={{ color: 'white' }}>Ivan</div>, <div style={{ color: 'white' }}>Vivi</div>,
        <div style={{ color: 'white' }}>Peter</div>, <div style={{ color: 'white' }}>Ararat</div>,
        <div style={{ color: 'white' }}>Slav</div>, <div style={{ color: 'white' }}>Fintipluch</div>,
        <div style={{ color: 'white' }}>Victor</div>, <div style={{ color: 'white' }}>Nasty</div>,
        <div style={{ color: 'white' }}>Max</div>, <div style={{ color: 'white' }}>Maya</div>,
        <div style={{ color: 'white' }}>Banana</div>, <div style={{ color: 'white' }}>Nikita</div>,
        <div style={{ color: 'white' }}>Anna</div>, <div style={{ color: 'white' }}>Vivi</div>,
        <div style={{ color: 'white' }}>Liza</div>, <div style={{ color: 'white' }}>Sultana</div>,
    ].map((user, index) => ({
        key: String(index + 1),
        label: user,
        icon: <UserOutlined style={{ color: 'white' }} />
    }))

    return <Sider
        width='30vw'
    >
        <Row
            align='middle'
            justify='start'
            style={{
                minHeight: 50,
                background: '#212121',
                padding: 0,
                borderRight: '1px solid #0f0f0f',

            }}
        >
            <Col
                style={{
                    marginLeft: 15
                }}
            >
                <Row justify='center'>
                    <Col>
                        <Row
                            align='middle'
                            justify='center'
                            style={{
                                height: 40,
                                width: 40,
                                backgroundColor: '#212121',
                                borderRadius: 75,
                                cursor: 'pointer',
                            }}
                        >
                            <Dropdown menu={{ items }} trigger={['click']}>
                                <MenuOutlined
                                    style={{
                                        color: '#fff',
                                        width: 75,
                                        height: 20,
                                    }}
                                />
                            </Dropdown>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Menu mode="inline" items={dialogsItems}
            style={{
                background: '#212121',
                color: '#fff',
                overflow: 'scroll',
                overflowX: 'hidden',
                height: 'calc(100vh - 50px)',
                left: 0,
                top: 0,
                bottom: 0,
                borderRight: 'solid 1px #0f0f0f',

            }}
        />
    </Sider>
}

export default DialogsScreen