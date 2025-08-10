export const formatQueryParams = (params: Record<string, any>): Record<string, any> => {
  const formatted: Record<string, any> = {}
  
  Object.keys(params).forEach(key => {
    const value = params[key]
    
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'number') {
        formatted[key] = value
      } else if (typeof value === 'boolean') {
        formatted[key] = value.toString()
      } else if (typeof value === 'string') {
        formatted[key] = value.trim()
      } else {
        formatted[key] = value
      }
    }
  })
  
  return formatted
}

export const buildQueryString = (params: Record<string, any>): string => {
  const formatted = formatQueryParams(params)
  const searchParams = new URLSearchParams()
  
  Object.keys(formatted).forEach(key => {
    searchParams.append(key, formatted[key].toString())
  })
  
  return searchParams.toString()
} 