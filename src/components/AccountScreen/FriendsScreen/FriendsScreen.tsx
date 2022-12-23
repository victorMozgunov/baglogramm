import { Button, Col, Row, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Dispatch, FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { follow, requestFriends, unfollow, usersActions } from '../../../redux/users-reducer'
import { selectFollowing, selectIsSubmitting, selectTotalCount, selectUsers } from '../../../selectors/users-selectors'

const { Text } = Typography

const FriendsScreen: FC = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const [page, setPage] = useState(1)
    const totalCount = useSelector(selectTotalCount)
    const isSubmitting = useSelector(selectIsSubmitting)
    const totalPages = Math.ceil(totalCount / 20)

    useEffect(() => {
        dispatch(usersActions.nullUsers())
    }, [])

    useEffect(() => {
        dispatch(requestFriends(page, 20))
    }, [page])

    const clickMore = () => {
        setPage(page + 1)
    }

    return <Content
        style={{
            margin: '0',
            overflow: 'scroll',
            overflowX: 'hidden',
            height: '100vh',
            backgroundColor: '#000'
        }}
    >
        <div>
            <Users />
            {page !== totalPages
            ?<Row justify='center' style={{ margin: '10px 0' }}>
                <Button
                    onClick={clickMore}
                    loading={isSubmitting}
                    type="primary"
                    style={{ backgroundColor: '#2b2b2b' }}
                >
                    More
                </Button>
            </Row>
            :<></>}
        </div>
    </Content>
}

const Users: FC = () => {
    const dispatch: Dispatch<any> = useDispatch()

    const users = useSelector(selectUsers)
    const following = useSelector(selectFollowing)

    const clickFollow = (userId: number) => {
        dispatch(follow(userId))
    }
    const clickUnfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return <>
        {users.map(el =>
            <Row justify='center' style={{ margin: '10px 0' }}>
                <Col span={6}>
                    <Link to={'/profile/' + el.id}>
                        <img
                            src={el.photos.large ? el.photos.large : 'http://localhost:3000/img/user.png'}
                            width={50}
                            height={50}
                            style={{ borderRadius: 200 }}
                        />
                    </Link>
                </Col>
                <Col span={6}>
                    <Row
                        align='middle'
                        style={{ color: 'white', height: 50, width: '16vw' }}
                    >
                        <Text ellipsis={true} style={{ color: 'white' }}>{el.name}</Text>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row align='middle' style={{ height: 50, width: 100 }}>
                        {el.followed
                            ? <Button
                                type="primary"
                                style={{ backgroundColor: '#2b2b2b' }}
                                onClick={() => clickUnfollow(el.id)}
                                loading={following.some(id => id === el.id)}
                            >
                                Unfollow
                            </Button>
                            : <Button
                                type="primary"
                                style={{ backgroundColor: '#2b2b2b' }}
                                onClick={() => clickFollow(el.id)}
                                loading={following.some(id => id === el.id)}
                            >
                                Follow
                            </Button>}
                    </Row>
                </Col>
            </Row>
        )}
    </>
}

export default FriendsScreen