import React from 'react';

interface IRawResourceGroupProps {
  title: string;
  resources?: IApiKubernetesResource[];
}

interface IRawResourceGroupState {
  open: boolean;
}

export class RawResourceGroup extends React.Component<IRawResourceGroupProps, IRawResourceGroupState> {
  constructor(props: IRawResourceGroupProps) {
    super(props);

    this.state = {
      open: true,
    };
  }

  public render() {
    return (
      <div className="raw-resource-group" style={{ marginTop: '2em' }}>
        <div
          className="clickable sticky-header"
          onClick={this.onHeaderClick.bind(this)}
          style={{
            display: 'flex',
            height: '37px',
            padding: 0,
            color: 'var(--color-primary)',
          }}
        >
          <span
            className={`glyphicon pipeline-toggle glyphicon-chevron-${this.state.open ? 'down' : 'right'}`}
            style={{
              backgroundColor: 'var(--color-alabaster)',
              display: 'inline-block',
              padding: '10px 10px 10px 0',
              height: '36px',
              flex: '0 0 auto',
            }}
          />
          <div className="shadowed" style={{ position: 'relative', display: 'flex' }}>
            <h4 style={{ display: 'inline-block', paddingLeft: '1em' }}>{this.props.title}</h4>
          </div>
        </div>
        <div className="raw-resource-items" style={{ display: this.state.open ? 'block' : 'none' }}>
          {this.props.children}
        </div>
      </div>
    );
  }

  private onHeaderClick() {
    this.setState({
      open: !this.state.open,
    });
  }
}
