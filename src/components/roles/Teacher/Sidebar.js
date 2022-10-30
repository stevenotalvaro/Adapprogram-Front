import React from 'react'
import { Link } from 'react-router-dom'
import { SessionsEntries } from './SessionsEntries'

export const Sidebar = () => {
  return (
    <aside className='adaptive__sidebar-container'>
        <SessionsEntries />
    </aside>
  )
}
