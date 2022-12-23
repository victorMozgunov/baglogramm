import { LoadingOutlined } from "@ant-design/icons"
import { Col, Row, Spin } from "antd"

const ProfileLoader = () => (
    <Row justify='center' style={{ marginTop: '30vh' }}>
        <Col>
            <Spin size='large' indicator={<LoadingOutlined style={{ fontSize: '120px', color: '#212121' }} />} />
        </Col>
    </Row>
)
export default ProfileLoader