import React, {useState} from 'react'
import {ReactComponent as Check} from '../images/svg/checkmark.svg'
import {ReactComponent as Edit} from '../images/svg/edit-pencil.svg'

const Item = ({label, data, action}) => {

    const [ edit, setEdit ] = useState(false)
    const [ entry, setEntry ] = useState(data)

    const handleEditBtn = () => setEdit(!edit)
    const sendEdit = async () => {
        await action(entry)
        setEdit(!edit)
    }

    return (
        <span className="Account-details-line">
            <label className='Account-label'>{label}:</label>
            {
                !edit 
                ? <data className="Account-details-data">{data}</data>
                : <input type='text' value={entry} onChange={e => setEntry(e.target.value)}/>
            }

            {
                action
                ? <button onClick={!edit ? handleEditBtn : sendEdit} className="Account-details-edit">
                        {
                            edit 
                            ? <Check className='Account-details-svg' /> 
                            : <Edit className='Account-details-svg' />
                        }
                    </button>
                : null
            }
        </span>
    )
}

export default Item