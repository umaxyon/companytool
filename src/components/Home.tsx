import { Redirect } from 'react-router'
import * as React from 'react';

class Home extends React.Component<any, any> {

    public render() {
        return <Redirect to={`${process.env.PUBLIC_URL}/contract`} />
    }
}
export default Home;
