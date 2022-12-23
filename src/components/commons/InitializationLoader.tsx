import { LoadingOutlined } from "@ant-design/icons"
import { Col, Row, Spin } from "antd"

const InitializationLoader = () => (
    <Row justify='center' style={{ marginTop: '45vh' }}>
        <Col>
            <Spin size='large' indicator={<LoadingOutlined style={{ fontSize: '100px'}} />} />
        </Col>
    </Row>
)
export default InitializationLoader