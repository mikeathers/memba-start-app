import {CONFIG} from '@/config'
import {axiosTenantsAuthInstance} from '@/utils'

export const createGymApp = async (
  props: CreateGymAppRequest,
): Promise<GetTenantUserApiResult | null> => {
  const URL = CONFIG.ENDPOINTS.CREATE_GYM_APP

  const response = await axiosTenantsAuthInstance.request({
    url: URL,
    method: 'POST',
    data: props,
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return response?.data

  return null
}
