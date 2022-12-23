import { FC } from 'react'
import { Layout } from 'antd'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProfileScreen from './ProfileScreen/ProfileScreen'
import UsersScreen from './UsersScreen/UsersScreen'
import DialogsScreen from './DialogsScreen/DialogsScreen'
import FriendsScreen from './FriendsScreen/FriendsScreen'

const AccountScreen: FC = () => {
    return (
        <Layout hasSider>
            <DialogsScreen />
            <Layout style={{ background: 'white', height: '100vh', overflow: 'show' }}>
                <Routes>
                    <Route path='/*' element={<Navigate to='/profile'/>}/>
                    <Route path='/profile/*' element={<ProfileScreen />}/>
                    <Route path='/profile/:userId/*' element={<ProfileScreen />}/>
                    <Route path='/users/*' element={<UsersScreen />}/>
                    <Route path='/friends/*' element={<FriendsScreen />}/>
                </Routes>
            </Layout>
        </Layout>
    )
}

export default AccountScreen