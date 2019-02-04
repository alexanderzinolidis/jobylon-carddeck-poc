import { useState, useEffect } from 'react'
import api from '../api'

export const fetchJobAds = () => {
  const [data, setData]       = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getJobAds()
      // Sleep for 500ms to demo the loading state... :-)
      .then(x => new Promise(resolve => setTimeout(() => resolve(x), 500)))
      .then((data: any) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  return { data, loading }
}