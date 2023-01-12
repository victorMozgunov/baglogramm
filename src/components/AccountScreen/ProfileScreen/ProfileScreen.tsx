import { ArrowLeftOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'
import { Col, Row, Typography, Button } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { Dispatch, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Params, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/hooks'
import { getProfileAndStatus, updateProfile, updateStatus } from '../../../redux/profile-reducer'
import { selectId } from '../../../selectors/auth-selectors'
import { selectIsLoading, selectProfile, selectStatus } from '../../../selectors/profile-selector'
import { DataForm, EditProfileProps, ProfileUserProps } from '../../../types/components.types'
import ProfileLoader from '../../commons/ProfileLoader'

const { Paragraph, Text } = Typography

const ProfileScreen: FC<{ params: Readonly<Params<string>> }> = (props) => {
    const dispatch: Dispatch<any> = useDispatch()

    const profile = useAppSelector(selectProfile)
    const status = useAppSelector(selectStatus)
    const userId = useAppSelector(selectId)
    const isLoading = useAppSelector(selectIsLoading)

    const [isEditMode, setIsEditMode] = useState(false)

    useEffect(() => {
        if (props.params.userId) {
            dispatch(getProfileAndStatus(Number(props.params.userId)))
        } else {
            dispatch(getProfileAndStatus(userId))
        }
    }, [props.params.userId])

    return <>
        <Row
            align='middle'
            justify='start'
            style={{
                minHeight: 50,
                background: '#212121',
                padding: 0,

            }}
        >
            <Col
                style={{
                    marginLeft: 20
                }}
            >
                <Text ellipsis={true} style={{ color: 'white', fontSize: 25 }}>Profile</Text>
            </Col>

        </Row>
        <Content
            style={{
                margin: '0',
                overflow: 'scroll',
                overflowX: 'hidden',
                height: '100vh',
                backgroundColor: '#000',
                paddingTop: 20,
                paddingBottom: 30
            }}
        >
            {isLoading
                ? <Row justify='center'>
                    <Col>
                        <ProfileLoader />
                    </Col>
                </Row>
                : isEditMode
                    ? <EditProfile
                        profile={profile}
                        status={status}
                        setIsEditMode={setIsEditMode}
                    />
                    : <ProfileUser
                        profile={profile}
                        status={status}
                        userId={props.params.userId}
                        setIsEditMode={setIsEditMode}
                    />
            }

        </Content>
    </>
}

const ProfileUser: FC<ProfileUserProps> = (props) => {
    const navigate = useNavigate()
    return <>
        <Row justify='center'>
            <Col style={{ backgroundColor: '#212121', borderRadius: 75 }}>
                <Row justify='center'>
                    <Col style={{ margin: 20 }}>
                        <img
                            src={props.profile?.photos.large ? props.profile.photos.large : 'https://victormozgunov.github.io/baglogramm/img/user.png'}
                            style={{
                                borderRadius: 200,
                                width: '20vw',
                                height: '20vw',
                                marginLeft: 20,
                                marginRight: 20
                            }}
                        />
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col>
                        <Paragraph
                            ellipsis={true}
                            style={{
                                color: 'white',
                                marginTop: 20,
                                marginBottom: 0,
                                fontSize: 20,
                                marginLeft: 20,
                                marginRight: 20
                            }}
                        >
                            {props.profile?.fullName ? props.profile?.fullName : 'no'}
                        </Paragraph>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col>
                        <Text
                            style={{
                                color: '#aaaaaa',
                                marginTop: 0,
                            }}
                        >
                            username
                        </Text>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col style={{ marginLeft: 20, marginRight: 20 }}>
                        <Paragraph
                            ellipsis={true}
                            style={{
                                color: 'white',
                                marginTop: 20,
                                fontSize: 20,
                                marginBottom: 0,
                                marginLeft: 20,
                                marginRight: 20
                            }}
                        >
                            {props.status ? props.status : 'no'}
                        </Paragraph>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col>
                        <div style={{ marginBottom: 20 }}>
                            <Text
                                style={{
                                    color: '#aaaaaa',
                                    marginTop: 0,
                                }}
                            >
                                status
                            </Text>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        {props.userId
            ?
            <Row justify='center'>
                <Col>
                    <Row
                        align='middle'
                        justify='center'
                        style={{
                            marginTop: 20,
                            height: 50,
                            width: 50,
                            backgroundColor: '#212121',
                            borderRadius: 75,
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate(-1)}
                    >

                        <ArrowLeftOutlined style={{ fontSize: 30, color: '#aaaaaa' }} />
                    </Row>

                </Col>
            </Row>
            :
            <Row justify='center'>
                <Col>
                    <Row
                        align='middle'
                        justify='center'
                        style={{
                            marginTop: 20,
                            height: 50,
                            width: 50,
                            backgroundColor: '#212121',
                            borderRadius: 75,
                            cursor: 'pointer',
                        }}
                        onClick={() => { props.setIsEditMode(true) }}
                    >

                        <EditOutlined style={{ fontSize: 30, color: '#aaaaaa' }} />
                    </Row>
                </Col>
            </Row>
        }
    </>
}

const EditProfile: FC<EditProfileProps> = (props) => {
    const dispatch: Dispatch<any> = useDispatch()

    const handleSubmit = (formData: DataForm) => {
        dispatch(updateStatus(formData.status))
        dispatch(updateProfile({
            userId: props.profile.userId,
            lookingForAJob: false,
            lookingForAJobDescription: 'no',
            fullName: formData.name,
            contacts: props.profile.contacts,
            photos: props.profile.photos,
            aboutMe: 'no'
        }))
        props.setIsEditMode(false)
    }

    return <Formik
        onSubmit={handleSubmit}
        initialValues={{ name: props.profile.fullName, status: props.status, upload: '' }}
        validate={values => {
            if (!values.name) return { name: '' }
            return undefined
        }}
    >
        {() => (<Form>
            <Row justify='center'>
                <Col style={{ backgroundColor: '#212121', borderRadius: 75 }}>
                    <Row justify='center'>
                        <Col style={{ margin: 20 }}>
                            <img
                                src={props.profile?.photos.large
                                    ? props.profile.photos.large
                                    : 'https://victormozgunov.github.io/baglogramm/img/user.png'
                                }
                                style={{
                                    borderRadius: 200,
                                    width: '20vw',
                                    height: '20vw',
                                    marginLeft: 20,
                                    marginRight: 20
                                }}
                            />
                        </Col>
                    </Row>
                    <Row justify='center'>
                        <Col style={{ marginLeft: 20, marginRight: 20 }}>
                            <Form.Item
                                name='name'
                                style={{ margin: 0 }}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    name='name'
                                    size='large'
                                    maxLength={20}
                                    style={{
                                        marginBottom: 0,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='center'>
                        <Col>
                            <Text
                                style={{
                                    color: '#a5a5a5',
                                    marginTop: 0
                                }}
                            >
                                username
                            </Text>
                        </Col>
                    </Row>
                    <Row justify='center'>
                        <Col style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                            <Form.Item
                                name='status'
                                style={{ margin: 0 }}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    name='status'
                                    size='large'
                                    maxLength={20}
                                    style={{
                                        marginBottom: 0,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='center'>
                        <Col>
                            <div style={{ marginBottom: 20 }}>
                                <Text
                                    style={{
                                        color: '#a5a5a5',
                                        marginTop: 0,
                                    }}
                                >
                                    status
                                </Text>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify='center'>
                <Col>
                    <Form.Item name='button'>
                        <SubmitButton
                            name='button'
                            
                            style={{
                                backgroundColor: '#212121',
                                marginTop: 20,
                                height: 50,
                                width: 50,
                                borderRadius: 75,
                                padding: 0,
                                borderColor: '#212121'
                            }}
                        >
                            <ArrowLeftOutlined style={{ fontSize: 30, color: '#aaaaaa'  }} />
                        </SubmitButton>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        )}
    </Formik>
}


const withRouter = (Children: FC<{ params: Readonly<Params<string>> }>) => {
    return () => {
        return <Children params={useParams()} />
    }
}

export default withRouter(ProfileScreen)