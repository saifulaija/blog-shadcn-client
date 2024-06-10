import { USER_ROLE } from "@/constants/role";


export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type UserRole = keyof typeof USER_ROLE;



export interface IHeaderItem {
  title: string;
  path?: string ;
  subMenu?: IHeaderItem[]; 
}
export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message:string
};

export const Gender=["MALE","FEMALE"];
export const ApproveStatus=["APPROVED","CANCEL"];
export const BlogCategory=["programming","Technology","Travel","Food","Lifestyle","Fashion","Fitness"];
