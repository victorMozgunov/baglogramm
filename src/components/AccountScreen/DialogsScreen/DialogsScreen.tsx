import { MenuOutlined, UserOutlined } from "@ant-design/icons"
import { Dropdown, Menu, MenuProps, Typography } from "antd"
import { Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Dispatch } from "redux"
import { logout } from "../../../redux/auth-reducer"

const { Text } = Typography

const DialogsScreen = () => {
    const dispatch: Dispatch<any> = useDispatch()

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
        <div style={{color: 'white'}}>Ivan</div>, <div style={{color: 'white'}}>Vivi</div>,
        <div style={{color: 'white'}}>Peter</div>, <div style={{color: 'white'}}>Ararat</div>,
        <div style={{color: 'white'}}>Slava</div>, <div style={{color: 'white'}}>Fintipluch</div>,
        <div style={{color: 'white'}}>Victor</div>, <div style={{color: 'white'}}>Nasty</div>,
        <div style={{color: 'white'}}>Max</div>, <div style={{color: 'white'}}>Maya</div>,
        <div style={{color: 'white'}}>Banana</div>, <div style={{color: 'white'}}>Nikitos</div>,
        <div style={{color: 'white'}}>Anna</div>
    ].map((user, index) => ({
        key: String(index + 1),
        label: user,
        icon: <UserOutlined style={{color: 'white'}}/>
    }))

    return <Sider
        width='30vw'
    >
        <Header 
            style={{ 
                top: 0, 
                height: '10vh', 
                minHeight: 50, 
                zIndex: 1, 
                background: '#212121', 
                padding: 0, 
                borderRight: 'solid 1px #0f0f0f' 
            }}
        >
            <Dropdown menu={{ items }} trigger={['click']}>
                <MenuOutlined
                    style={{
                        color: '#fff',
                        width: 75,
                        height: 20,
                        margin: '10px',
                    }}
                />
            </Dropdown>
        </Header>
        <Menu mode="inline" items={dialogsItems}
            style={{
                background: '#212121',
                color: '#fff',
                overflow: 'scroll',
                overflowX: 'hidden',
                height: '90vh',
                left: 0,
                top: 0,
                bottom: 0,
                borderRight: 'solid 1px #0f0f0f'
            }}
        />
    </Sider>
}

export default DialogsScreen