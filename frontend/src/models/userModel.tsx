export type UserLogin = {
    message: string;
    data: string
}

export interface Organization {
	_id: string;
	userId: Users;
	organizationName: string;
	organizationUniqueId: string;
	createdAt: string;
	updatedAt: string;
}

export interface Zone {
	_id: string;
	organizationId: Organization;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface Users {
	_id: string
	username: string
	firstName: string
	lastName: string
	email: string
	roles: { roleName: string }[]
	uniqueId: string
	createdAt: string
}

export interface Roles {
	roles: { _id: string, roleName: string}[]
}

export interface Data {
    loading: boolean
    status: string
	data: Users
	roles: Roles
	roleMsg: string
	orgMsg: string
	orgStatus: string
	organizations: Organization[]
	checkOrgs: string
	organizationMsg: string
	allOrganizations: Organization[]
	allOrgsMsg: string
	zone: Zone[]
	zoneMsg: string
	allZones: Zone[]
	allZoneMsg: string
}

export interface OrganizationZonesModalProps {
  isModalOpen: boolean;
  closeModal: React.MouseEventHandler;
  allZones: Zone[];
  zoneMsg: string;
  org: Organization;
}

export interface AddZoneModalProps {
  isModalOpen: boolean;
  closeModal: React.MouseEventHandler;
  org: Organization;
}
export interface Values { userId: string, roleName: string }
export interface ZoneValues { organizationUniqueId: string, zoneName: string }