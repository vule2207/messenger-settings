export interface BaseResponse<T = any> {
  success: boolean;
  msg?: string;
  rows?: T;
}
