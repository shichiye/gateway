
import { methodV } from '@/utils/request'
import { MESSAGE_PARAMS, RECEIVE_TYPE } from './type'
import { BusinessException } from "@/common/exceptions/business.exception";


export const messages = async (receive_id_type: RECEIVE_TYPE, params: MESSAGE_PARAMS, app_token: string) => {

  try {
    const { data } = await methodV({
      url: '/im/v1/messages',
      method: 'POST',
      query: {
        receive_id_type,
      },
      params,
      headers: {
        Authorization: `Bearer ${app_token}`,
      },
    })
    return data
  } catch (error) {
    const { data } = error.response
    throw new BusinessException({ code: data.code, message: data.msg })
  }

}
