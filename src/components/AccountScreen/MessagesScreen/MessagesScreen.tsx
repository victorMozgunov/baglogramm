import { Header, Content, Footer } from "antd/es/layout/layout"
import React from "react"

const MessagesScreen = () => {
    return <>
        <Header style={{top: 0, zIndex: 1, width: '100%', background: '#212121',}}>
            
        </Header>

        <Content style={{ margin: '0', overflow: 'scroll', height: '90vh'}}>
            <div style={{ padding: 24,  textAlign: 'center', background: '#0f0f0f', color: '#fff'}}>
                <p>long content</p>
                {
                    // indicates very long content
                    Array.from({ length: 100 }, (_, index) => (
                        <React.Fragment key={index}>
                            {index % 20 === 0 && index ? 'more' : '...'}
                            <br />
                        </React.Fragment>
                    ))
                }
            </div>
        </Content>
        <Footer style={{position: 'sticky', bottom: 0, width: '100%', textAlign: 'center', background: '#0f0f0f', padding: 10 }}>
            <textarea style={{height: 50}}></textarea>
        </Footer>
    </>
}

export default MessagesScreen