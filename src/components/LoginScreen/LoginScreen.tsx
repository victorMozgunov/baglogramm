import Logo from '../commons/Logo'
import React, { Dispatch, FC, useState } from 'react'
import { Typography, Col, Row, Image } from 'antd'
import { Checkbox, Form, Input, SubmitButton } from 'formik-antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { login } from '../../redux/auth-reducer'
import { LoginFormValues } from '../../types/login.types'
import { selectCaptchaUrl, selectErrorMessage } from '../../selectors/auth-selectors'

const { Text } = Typography

const LoginScreen: FC = () => {

    const [isSubmitting, setSubmitting] = useState(false)
    const dispatch: Dispatch<any> = useDispatch()
    const errorMessage = useSelector(selectErrorMessage)
    // const captchaUrl = useSelector(selectCaptchaUrl)

    const handleSubmit = (formData: LoginFormValues) => {
        setSubmitting(true)
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
        setSubmitting(false)
    }

    return (
        <>
            <Row justify='center'>
                <Col style={{ margin: '40px' }}>
                    <Logo />
                </Col>
            </Row>
            <Row justify='center'>
                <Col>
                    <Text strong style={{ fontSize: 'calc(20px + 0.8vw)' }}>Sign in to Telegram</Text>
                </Col>
            </Row>
            <Row justify='center'>
                <Col style={{ marginTop: '10px' }}>
                    <Text style={{ fontSize: 'calc(10px + 0.5vw)', color: '#707579' }}>
                        Please enter your login and
                    </Text>
                </Col>
            </Row>
            <Row justify='center'>
                <Col>
                    <Text style={{ fontSize: 'calc(10px + 0.5vw)', color: '#707579', marginBottom: '20px' }}>
                        enter your password.
                    </Text>
                </Col>
            </Row>
            <Row justify='center'>
                <Col>
                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={{ rememberMe: true, password: '', email: '', captcha: null }}
                        validate={values => {
                            if (!values.email && !values.password) {
                                return {
                                    email: 'Please input your email',
                                    password: 'Please input your password'
                                }
                            }
                            if (!values.email) {
                                return { email: 'Please input your email' }
                            }
                            if (!values.password) {
                                return { password: 'Please input your password' }
                            }
                            return undefined
                        }}
                    >
                        {() => (
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                autoComplete="off"
                            >
                                {errorMessage
                                    ? <Row justify='center'>
                                        <Col style={{ marginTop: '20px' }}>
                                            <Text style={
                                                {
                                                    fontSize: 'calc(10px + 0.5vw)',
                                                    color: '#ff2400',
                                                }
                                            }
                                            >
                                                {errorMessage}
                                            </Text>
                                        </Col>
                                    </Row>
                                    : <div style={{ marginBottom: '20px' }}></div>
                                }
                                <Form.Item
                                    name="email"
                                    wrapperCol={{ span: 24 }}
                                >
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="Email"
                                        size='large'
                                        name="email"
                                        style={{ marginTop: '10px' }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    wrapperCol={{ span: 24 }}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        placeholder='Password'
                                        size='large'
                                        name="password"
                                    />
                                </Form.Item>

                                <Form.Item name="rememberMe" valuePropName="checked">
                                    <Checkbox style={{ fontSize: 'calc(10px + 0.5vw)' }} name="rememberMe">
                                        Remember me
                                    </Checkbox>
                                </Form.Item>

                                <Form.Item wrapperCol={{ span: 24 }} name='button'>
                                    <SubmitButton
                                        name='button'
                                        type='primary'
                                        size='large'
                                        style={{ width: '100%' }}
                                        loading={isSubmitting}
                                    >
                                        Login
                                    </SubmitButton>
                                </Form.Item>
                            </Form>
                        )}
                    </Formik>


                </Col>
            </Row>

        </>
    )
}
export default LoginScreen