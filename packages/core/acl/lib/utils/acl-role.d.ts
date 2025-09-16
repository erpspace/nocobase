import { ACLRole } from '../acl-role';
export declare function mergeRole(roles: ACLRole[]): Record<string, any>;
export declare function mergeAclActionParams(sourceParams: any, targetParams: any): any;
export declare function removeEmptyParams(params: any): void;
