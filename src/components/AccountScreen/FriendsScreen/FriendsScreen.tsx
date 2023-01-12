import { ArrowDownOutlined, DeleteFilled, LoadingOutlined } from '@ant-design/icons'
import { hover } from '@testing-library/user-event/dist/hover'
import { Button, Col, Row, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Dispatch, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { requestUsers, setNullUsers, setDeleteFriend } from '../../../redux/users-reducer'
import { selectIsSubmitting, selectTotalCount, selectUsers } from '../../../selectors/users-selectors'

const { Text } = Typography

const FriendsScreen: FC = () => {
    const pageSize = 20
    const friends = true

    const dispatch = useAppDispatch()
    const [page, setPage] = useState(1)
    const totalCount = useAppSelector(selectTotalCount)
    const isSubmitting = useAppSelector(selectIsSubmitting)

    const totalPages = Math.ceil(totalCount / 20)

    useEffect(() => {
        dispatch(setNullUsers())
    }, [])

    useEffect(() => {
        dispatch(requestUsers({ page, pageSize, friends }))
    }, [page])

    const clickMore = () => {
        setPage(page + 1)
    }

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
                <Text ellipsis={true} style={{ color: 'white', fontSize: 25 }}>Friends</Text>
            </Col>

        </Row>
        <Content
            style={{
                margin: '0',
                padding: '0 5vw',
                paddingBottom: 20,
                overflow: 'scroll',
                overflowX: 'hidden',
                height: 'calc(100vh - 50px)',
                backgroundColor: '#000'
            }}
        >
            <div>
                <Users />
                {page !== totalPages
                    ? isSubmitting
                        ?
                        <Row justify='center'>
                            <Col>
                                <Row
                                    align='middle'
                                    justify='center'
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: '#212121',
                                        borderRadius: 75,
                                        cursor: 'pointer',
                                    }}
                                >
                                    <LoadingOutlined style={{ color: '#aaaaaa', fontSize: 25 }} />
                                </Row>
                            </Col>
                        </Row>
                        : <Row justify='center'>
                            <Col>
                                <Row
                                    align='middle'
                                    justify='center'
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: '#212121',
                                        borderRadius: 75,
                                        cursor: 'pointer',
                                    }}
                                    onClick={clickMore}
                                >
                                    <ArrowDownOutlined style={{ color: '#aaaaaa', fontSize: 25 }} />
                                </Row>
                            </Col>
                        </Row>

                    : <></>}
            </div>
        </Content>
    </>
}

const Users: FC = () => {
    const dispatch: Dispatch<any> = useDispatch()

    const users = useAppSelector(selectUsers)

    const clickUnfollow = (userId: number) => {
        dispatch(setDeleteFriend(userId))
    }

    return <>
        {users.map(el =>
            <Row justify='space-around' style={{ margin: '10px 0' }}>
                <Col>
                    <Row align='middle' justify='center'>
                        <Link to={'/profile/' + el.id}>
                            <img
                                src={el.photos.large ? el.photos.large : 'https://victormozgunov.github.io/baglogramm/img/user.png'}
                                width='50'
                                height='50'
                                style={{ borderRadius: 200 }}
                            />
                        </Link>
                    </Row>
                </Col>
                <Col>
                    <Link to={'/profile/' + el.id}>
                        <Row
                            align='middle'
                            justify='center'
                            style={{
                                color: 'white',
                                height: 50,
                                width: '25vw',
                                backgroundColor: '#212121',
                                borderRadius: 75,
                            }}
                        >
                            <Text ellipsis={true} style={{ color: 'white' }}>{el.name}</Text>
                        </Row>
                    </Link>
                </Col>
                <Col>
                    <Row
                        align='middle'
                        justify='center'
                        style={{
                            height: 50,
                            width: 50,
                            backgroundColor: '#212121',
                            borderRadius: 75,
                            cursor: 'pointer',
                        }}
                        onClick={() => clickUnfollow(el.id)}
                    >
                        <DeleteFilled style={{ color: '#aaaaaa', fontSize: '20', }} />
                    </Row>
                </Col>
            </Row>

        )}
    </>
}

export default FriendsScreen