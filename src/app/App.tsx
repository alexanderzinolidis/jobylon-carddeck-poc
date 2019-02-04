import React from 'react'
import 'bulma/css/bulma.css'

import { fetchJobAds } from './effects'
import Spinner from './common/Spinner'
import CardStack from '../cardStack/CardStack'
import JobAd, { JobAdProps } from '../jobAd/JobAd'

const App = () => {
  const { data, loading } = fetchJobAds()

  if (loading) return <Spinner />

  return (
    <div id='app'>
      <CardStack>
        {data.map((item: JobAdProps, key: number) => <JobAd key={key} {...item} />)}
      </CardStack>
    </div>
  )
}

export default App
