import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { SessionsEntry } from './SessionsEntry'

export const SessionsEntries = memo(() => {

    const { groups} = useSelector( state => state.groups );

    return (
        <div className='sessions__entries'>
            {
                groups.map(group => (
                    <SessionsEntry 
                        key={group.id}
                        {...group}
                    />
                ))
            }
        </div>
    )
})
