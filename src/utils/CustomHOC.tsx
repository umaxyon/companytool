import * as React from 'react';

interface ICustomHOCProps {
  onBlur: any,
}

const customHOC = <P extends object>(Wrapped: React.ComponentType<P>) => {
  return class CustomHOC extends React.Component<P & ICustomHOCProps> {
    public render() {
      return <Wrapped {...this.props} onBlur={this.props.onBlur} />
    }
  }
}

export default customHOC;