/*
 * @Author: Y
 * @Date: 2022-02-06 15:46:40
 * @LastEditTime: 2022-02-06 15:55:42
 * @LastEditors: Y
 * @Description:
 */
interface IResponse {
  code: string;
  data: any;
  msg: string;
}
export const returnResponse = (
  code: string,
  msg: string,
  data: any = null,
): IResponse => {
  return { code, data, msg };
};
