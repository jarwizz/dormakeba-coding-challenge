import { ConnectionStatus } from '@/models/ConnectionStatus';

export const connectionStatusColor: Record<ConnectionStatus, string> = {
  online: 'success.main',
  offline: 'error.main',
};
