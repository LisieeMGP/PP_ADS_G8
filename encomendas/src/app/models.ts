export type PackageStatus = 'pending' | 'picked-up';

export interface Resident {
  id: number;
  name: string;
  block: string;
  unit: string;
}

export interface Delivery {
  id: number;
  residentId: number;
  description: string;
  trackingCode: string;
  receivedAt: string;
  status: PackageStatus;
}
