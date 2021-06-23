import React, { useState } from 'react'

import { useApolloClient, ApolloClient, useQuery } from '@apollo/client'

import { SearchContainer } from './style.FilterBox'
import { STATUS_CONSTANTS } from './constants.FilterBox'
import { IFilter } from '../../../../types/filter.d'
import { getFilterOptions } from '../../../../queries/filter'

const FilterBox = () => {

    const { data } = useQuery<IFilter, any>(getFilterOptions)

    const {filter} = data || {}

    const [searchText, setSearchText] = useState(filter?.searchTerm || '')

    const [status, setStatus] = useState(filter?.status || '')

    const client: ApolloClient<any> = useApolloClient()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.currentTarget.value)
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.currentTarget.value)
    }

    const handleFilterButtonClick = () => {
        client.writeQuery({
            query: getFilterOptions,
            data: {
                filter: {
                    searchTerm: searchText,
                    status,
                }
            },
            broadcast: true
        })
    }

    const handleClearFilter = () => {
        setStatus('')
        setSearchText('')
        client.writeQuery({
            query: getFilterOptions,
            data: {
                filter: {
                    searchTerm: '',
                    status: '',
                }
            },
            broadcast: true
        })
    }

    return (
        <SearchContainer>
            <div className="filter-box">
                <label>Filter by title or body</label>
                <input type="text" onChange={handleInputChange} value={searchText} />
            </div>
            <div className="filter-box">
                <label>Filter by status</label>
                <select onChange={handleStatusChange} value={status}>
                    {
                        STATUS_CONSTANTS.map((status) => (
                            <option value={status.key} key={status.value}>{status.value}</option>
                        ))
                    }
                </select>
            </div>
            <div className="filter-box">
                <button onClick={handleFilterButtonClick}>Filter Issues</button>
            </div>
            {
                (filter?.searchTerm || filter?.status) && (
                    <div className="filter-box">
                        <button onClick={handleClearFilter}>Clear Filters X</button>
                    </div>
                )
            }
        </SearchContainer>
    )
}

export default FilterBox