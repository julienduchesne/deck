import { IPromise, IQService, module } from 'angular';
import { API } from 'core/api';
import { Application } from 'core/application/application.model';
import { INFRASTRUCTURE_KEY } from 'core/application/nav/defaultCategories';
import { ApplicationDataSourceRegistry } from '../application/service/ApplicationDataSourceRegistry';

export const K8S_DATA_SOURCE = 'spinnaker.core.resource.dataSource';
export const K8S_DATA_SOURCE_KEY = 'k8s';
const K8S_DATA_SOURCE_SREF = `.insight.${K8S_DATA_SOURCE_KEY}`;

type ApiK8sResource = any;

const fetchK8sResources = ($q: IQService) => (application: Application): IPromise<ApiK8sResource> =>
  API.one('applications')
    .one(application.name)
    .all('rawResources')
    .getList()
    .then((kubernetesResources: IApiKubernetesResource[]) => $q.resolve(kubernetesResources));

const formatK8sResources = ($q: IQService) => (_: Application, result: ApiK8sResource): IPromise<ApiK8sResource> =>
  $q.resolve(result);

module(K8S_DATA_SOURCE, []).run([
  '$q',
  ($q: IQService) => {
    ApplicationDataSourceRegistry.registerDataSource({
      key: K8S_DATA_SOURCE_KEY,
      label: 'Kubernetes',
      category: INFRASTRUCTURE_KEY,
      sref: K8S_DATA_SOURCE_SREF,
      primary: true,
      icon: 'fas fa-xs fa-fw fa-th-large',
      iconName: 'spMenuK8s',
      loader: fetchK8sResources($q),
      onLoad: formatK8sResources($q),
      providerField: 'cloudProvider',
      credentialsField: 'account',
      regionField: 'region',
      description: 'Collections of kubernetes resources',
      defaultData: [],
    });
  },
]);
