import request from './index'

const getUsersQuery = {
  // default query: get all users
  departmentName: '',
  departmentCode: '',
  personName: '',
  email: '',
  pageSize: 0,
  page: 0,
}

export async function getUsers<T = any>(
  querys: Partial<typeof getUsersQuery> = getUsersQuery
) {
  const keys = Object.keys(getUsersQuery)
  const obj = {} as any
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value =
      key in querys ? (querys as any)[key] : (getUsersQuery as any)[key]
    obj[key] = value
  }
  return request
    .post<T>(`https://nc.fytri.cn/api/Users`, obj)
    .then((response) => response.data)
}

export function getDepartment<T = any>() {
  return request
    .get<T>(`https://nc.fytri.cn/api/Department`)
    .then((response) => response.data)
}

export function getAllDepartment<T = any>() {
  return request
    .get<T>(`/edirectory/external/edstaff/getAllDepartment`)
    .then((response) => response.data)
}

export function getAllStaff<T = any>(departmentId: string, keyword: string) {
  return request
    .get<T>(
      `/edirectory/external/edstaff/list?departmentId=${departmentId}&name=${keyword}`
    )
    .then((response) => response.data)
}
