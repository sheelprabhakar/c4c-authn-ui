export interface TenantData {

  id: string;
  name: string;
  shortName: string;
  email: string;
  address: string;
  cityId: number;

  pin: string;
  phone: string;
  mobile: string;


  area: string;
  landmark: string | null;
  pictureUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  active: boolean;

  deleted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  createdBy: Date;
  updatedBy: Date | null;
}
