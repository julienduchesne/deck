import { module } from 'angular';
import { ApplicationStateProvider, APPLICATION_STATE_PROVIDER } from 'core/application';
import { INestedState } from 'core/navigation';
import { K8sResources } from './component/K8sResources';
import { K8sResourcesFilters } from './component/K8sResourcesFilters';

export const K8S_STATES = 'spinnaker.core.k8s.states';
module(K8S_STATES, [APPLICATION_STATE_PROVIDER]).config([
  'applicationStateProvider',
  (applicationStateProvider: ApplicationStateProvider) => {
    const kubernetes: INestedState = {
      url: `/kubernetes`,
      name: 'k8s',
      views: {
        nav: { component: K8sResourcesFilters, $type: 'react' },
        master: { component: K8sResources, $type: 'react' },
      },
      data: {
        pageTitleSection: {
          title: 'Kubernetes',
        },
      },
      children: [],
    };

    applicationStateProvider.addInsightState(kubernetes);
  },
]);
