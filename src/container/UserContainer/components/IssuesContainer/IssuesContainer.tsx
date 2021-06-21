import * as React from 'react'

import { useQuery } from '@apollo/client'

import { getFilterOptions } from '../../../../queries/filter'
import { IFilter } from '../../../../types/filter.d'
import IssuesList from './IssuesList'


const IssuesContainer = () => {

    const { data } = useQuery<IFilter, any>(getFilterOptions)

    const {filter} = data || {}
    
    return (
        <>
            <IssuesList searchTerm={filter?.searchTerm} status={filter?.status} />
        </>
    )
}

export default IssuesContainer