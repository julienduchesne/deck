import React from 'react';
import './RawResource.less';

interface IRawResourceProps {
  resource: IApiKubernetesResource;
}

interface IRawResourceState {}

export class RawResource extends React.Component<IRawResourceProps, IRawResourceState> {
  constructor(props: IRawResourceProps) {
    super(props);
  }

  public render() {
    return (
      <div className="raw-resource-card">
        <h4 className="raw-resource-title">
          {this.props.resource.kind}: <b>{this.props.resource.displayName}</b>
        </h4>
        <div className="raw-resource-details" style={{ display: 'flex' }}>
          <div className="raw-resource-details-column" style={{ display: 'flex' }}>
            <div className="raw-resource-details-column-label">account:</div>
            <div>{this.props.resource.account}</div>
          </div>
          <div className="raw-resource-details-column" style={{ display: 'flex' }}>
            <div className="raw-resource-details-column-label">namespace:</div>
            <div>{this.props.resource.namespace}</div>
          </div>
          <div className="raw-resource-details-column" style={{ display: 'flex' }}>
            <div className="raw-resource-details-column-label">apiVersion:</div>
            <div>{this.props.resource.apiVersion}</div>
          </div>
        </div>
      </div>
    );
  }
}
