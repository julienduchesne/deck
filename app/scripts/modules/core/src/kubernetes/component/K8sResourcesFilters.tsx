import { Application, ApplicationDataSource } from 'core/application';
import { FilterSection } from 'core/cluster/filter/FilterSection';
import { FilterCheckbox } from 'core/filterModel/FilterCheckBox';
import React from 'react';
import { FiltersPubSub } from '../controller/FiltersPubSub';
import { K8S_DATA_SOURCE_KEY } from '../k8s.dataSource';

export interface IK8sResourcesFiltersProps {
  app: Application;
}

export interface IK8sResourcesFiltersState {
  accounts: Record<string, boolean>;
  kinds: Record<string, boolean>;
  namespaces: Record<string, boolean>;
}

export class K8sResourcesFilters extends React.Component<IK8sResourcesFiltersProps, IK8sResourcesFiltersState> {
  private dataSource: ApplicationDataSource<IApiKubernetesResource[]>;
  private filterPubSub: FiltersPubSub = FiltersPubSub.getInstance(this.props.app.name);

  constructor(props: IK8sResourcesFiltersProps) {
    super(props);
    this.dataSource = this.props.app.getDataSource(K8S_DATA_SOURCE_KEY);

    this.state = {
      accounts: {},
      kinds: {},
      namespaces: {},
    };
  }

  public async componentDidMount() {
    await this.dataSource.ready();

    this.setState({
      accounts: Object.assign({}, ...this.dataSource.data.map((resource) => ({ [resource.account]: false }))),
      kinds: Object.assign({}, ...this.dataSource.data.map((resource) => ({ [resource.kind]: false }))),
      namespaces: Object.assign({}, ...this.dataSource.data.map((resource) => ({ [resource.namespace]: false }))),
    });
  }

  public render() {
    return (
      <div className="content">
        <FilterSection heading={'Kind'} expanded={true}>
          {...Object.keys(this.state.kinds)
            .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
            .map((key) => (
              <FilterCheckbox
                heading={key}
                key={key}
                sortFilterType={this.state.kinds}
                onChange={this.onCheckbox.bind(this)}
              ></FilterCheckbox>
            ))}
        </FilterSection>
        <FilterSection heading={'Account'} expanded={true}>
          {...Object.keys(this.state.accounts)
            .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
            .map((key) => (
              <FilterCheckbox
                heading={key}
                key={key}
                sortFilterType={this.state.accounts}
                onChange={this.onCheckbox.bind(this)}
              ></FilterCheckbox>
            ))}
        </FilterSection>
        <FilterSection heading={'Namespace'} expanded={true}>
          {...Object.keys(this.state.namespaces)
            .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
            .map((key) => (
              <FilterCheckbox
                heading={key}
                key={key}
                sortFilterType={this.state.namespaces}
                onChange={this.onCheckbox.bind(this)}
              ></FilterCheckbox>
            ))}
        </FilterSection>
      </div>
    );
  }

  private onCheckbox() {
    this.setState({ ...this.state });
    this.filterPubSub.publish(this.state);
  }
}
