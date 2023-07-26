import {CONFIG} from '@/config'
import {axiosTenantsAuthInstance} from '@/utils'

interface GetTenantProps {
  id: string
}

export const getTenant = async (props: GetTenantProps) => {
  const {id} = props
  const URL = `${CONFIG.ENDPOINTS.GET_TENANT}/${id}`

  return await axiosTenantsAuthInstance.request({
    url: URL,
    method: 'GET',
    data: props,
  })
}
