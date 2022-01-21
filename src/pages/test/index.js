import React from 'react';
import { Button, Space, Divider } from 'oss-ui';

class Test extends React.Component {
    render() {
        return (
            <>
                <Divider />
                <Space>
                    <Button
                        onClick={() => {
                            this.props.history.push('/home');
                        }}
                    >
                        home
                    </Button>
                </Space>
            </>
        );
    }
}

export default Test;
