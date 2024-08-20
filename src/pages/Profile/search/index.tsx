import { useEffect, useState } from "react"
import { IUser } from "../../../helpers/types"
import { searchUsers } from "../../../helpers/api"
import { BASE, DEF } from "../../../helpers/default"
import { Link } from "react-router-dom"

export const Search = () => {
    const [users, setUser] = useState<IUser[]>([])
    const [text, setText] = useState<string>("")
    useEffect(() => {
        if(!text.trim()) {
          return  setUser([])
        }
        searchUsers(text)
        .then(response => {
            setUser(response.payload as IUser[])
        })
    }, [text])
    return <div className="content">
        <input
         type="text"
        className="form-control"
        placeholder="Search to friend..."
        onChange={e => setText(e.target.value)}
        />
        <small>found {users.length} users</small>
        <div className="row">
            {
                users.map(user => (
                    <div className="col-md-3" key={user.id}>
                        <img 
                        className="profile-pic"
                            src={
                            user.picture? 
                            BASE +user.picture :
                            DEF
                            }
                         alt={user.name} />
                        <p>{user.name} {user.surname}</p>
                        <Link to={"/profile/" +user.id}>Accaunt</Link>
                    </div>
                ))
            }
        </div>
    </div>
    
} 