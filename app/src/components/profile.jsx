import React, { useState } from 'react'
import { connect } from 'react-redux'

import { selectName } from '../redux/account/account.selectors'

import { ReactComponent as DownArr } from '../images/svg/cheveron-outline-down.svg'
import { ReactComponent as Xbtn } from '../images/svg/close-outline.svg'

const Profile = ({name, setLoggedIn, setAccount, setUser, setLoading}) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open)

    const Logout = async () => {
        await window.localStorage.clear()
        await setLoggedIn(false)
        await setAccount(null)
        await setUser(null)
        await setLoading(true)
    }

    return (
        <div className="User">
            <h2 className="User-name">
                {name}
            </h2>
            <button onClick={handleOpen} className='User-dropdown-btn'>
                {!open && <DownArr className='User-dropdown-svg'/>}
                {open && <Xbtn className='User-dropdown-svg'/>}
            </button>

            {open && (
                <div className="User-dropdown">
                    <button onClick={Logout} className="User-dropdown-logout">Log out</button>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    name: selectName(state)
})

export default connect(mapStateToProps)(Profile)