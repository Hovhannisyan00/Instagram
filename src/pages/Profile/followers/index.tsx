import React, { useEffect, useState } from "react"
import { allFollowFollowings } from "../../../helpers/api"
import { IUser } from "../../../helpers/types"
import { BASE } from "../../../helpers/default"
import { Link } from "react-router-dom"

export const Followers:React.FC = () => {

    const [followers, setFollowers] = useState<IUser[]>([])

    useEffect(() => {
      allFollowFollowings()
        .then(response => {
            setFollowers(response.payload as IUser[])
            console.log(response.payload, 666)
        })
    }, [])

   
    return (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '20px',
          backgroundColor: '#f0f4f8',
          borderRadius: '15px',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)',
        }}>
          {followers.map((follower) => (
            <div key={follower.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '15px',
              boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
              width: '240px',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}>
              <Link to={"/profile/" +follower.id}>
              <img src={BASE + follower.picture} alt={`${follower.name} ${follower.surname}`} style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '15px',
                border: '2px solid #007bff',
              }} />
              <span style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '5px',
              }}>{follower.name}</span>
              <span style={{
                fontSize: '16px',
                color: '#777',
              }}>{follower.surname}</span>
              </Link>
            </div>
          ))}
        </div>
      );
         
}