import { module } from 'angular';

import { K8S_DATA_SOURCE } from './k8s.dataSource';
import { K8S_STATES } from './k8s.states';

export const K8S_MODULE = 'spinnaker.core.k8s';

module(K8S_MODULE, [K8S_DATA_SOURCE, K8S_STATES]);
