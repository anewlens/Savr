import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setAccount} from '../redux/account/account.actions'
import { selectName } from '../redux/account/account.selectors'
import { setUser } from '../redux/user/user.actions'

import { ReactComponent as DownArr } from '../images/svg/cheveron-outline-down.svg'
import { ReactComponent as Xbtn } from '../images/svg/close-outline.svg'

const Profile = ({name, setAccount, setUser, history}) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open)

    const Logout = async () => {
        await history.push('/login') 
        window.localStorage.clear()
        setUser(null)
        setAccount(null)
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
                    <button onClick={() => Logout()} className="User-dropdown-logout">Log out</button>
                </div>
            )}
            
        </div>
    )
}

const mapStateToProps = state => ({
    name: selectName(state)
})

const mapDispatchToProps = dispatch => ({
    setAccount: account => dispatch(setAccount(account)),
    setUser: user => dispatch(setUser(user)),
})

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))