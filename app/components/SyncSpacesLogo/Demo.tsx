'use client'

import { useState } from 'react'

import SyncSpacesLogo from './SyncSpacesLogo'

const Demo = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div onClick={() => setCollapsed(collapsed => !collapsed)}>
            <SyncSpacesLogo width={600} collapsed={collapsed} />
        </div>
    )
}

export default Demo
