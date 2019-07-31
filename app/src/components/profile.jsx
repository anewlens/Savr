import React from 'react'

const Profile = ({name}) => {
    return (
        <div className="User">
            <h2 className="User-name">
                {name}
            </h2>
            <div className="User-img"></div>
        </div>
    )
}

export default Profile