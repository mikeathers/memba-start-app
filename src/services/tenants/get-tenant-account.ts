import {CONFIG} from '@/config'
import {axiosUsersAuthInstance, hasResult} from '@/utils'

interface GetTenantAccountProps {
  emailAddress: string
}

export const getTenantAccount = async (
  props: GetTenantAccountProps,
): Promise<MembaUser | null> => {
  const {emailAddress} = props
  const URL = `${CONFIG.ENDPOINTS.GET_TENANT_ACCOUNT}/${emailAddress}`

  const response = await axiosUsersAuthInstance.request({
    url: URL,
    method: 'GET',
    data: props,
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return response?.data.result
}
