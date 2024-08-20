import { useEffect, useState } from "react"
import { acceptRequest, declineRequest, handleAllFollowRequest } from "../../../helpers/api"
import { IUser } from "../../../helpers/types"
import { BASE } from "../../../helpers/default"
import { Link } from "react-router-dom"


export const Requests = () => {
    const [requests, setRequests] = useState<IUser[]>([])
    useEffect(() => {
        handleAllFollowRequest()
        .then(response => {
            setRequests(response.payload as IUser[])
            console.log(response.payload, 666)
        })
    }, [])
    const handleAcctept = (id: number) => {
        acceptRequest(id)
            .then(response => {
                console.log(response);
                setRequests(prevRequests =>
                    prevRequests.filter(request => request.id != id)
                );
            });
    };
    const handleDelice = (id:number) => {
        declineRequest(id)
        .then(() => {
            setRequests([])
        });
    }
    return (    
        <div
          style={{
            padding: "30px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            backgroundColor: "#e9f0f7",
            minHeight: "100vh",
          }}
        >
          <h1
            style={{
              color: "#3b7dd8",
              fontSize: "36px",
              borderBottom: "4px solid #ccc",
              paddingBottom: "15px",
              marginBottom: "35px",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            Requests
          </h1>
          {requests.length &&
            requests.map((request) => (
              <div
                key={request?.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "30px",
                  backgroundColor: "#ffffff",
                  borderRadius: "15px",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                  padding: "25px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
                }}
              >
                <Link
                  to={"/profile/" + request.user?.id}
                  style={{
                    textDecoration: "none",
                    color: "#2c3e50",
                    fontWeight: "600",
                    fontSize: "22px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={BASE + request.user?.picture}
                    alt={`${request.user?.name} ${request.user?.surname}`}
                    style={{
                      width: "85px",
                      height: "85px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "25px",
                      border: "3px solid #3b7dd8",
                    }}
                  />
                  {request?.user?.name} {request.user?.surname}
                </Link>
                <button onClick={() => handleAcctept(request.id as number) } className="btn btn-success m-2">accept</button>
                <button onClick={() => handleDelice(request.id as number)} className="btn btn-danger">decline</button>
                <p style={{ marginLeft: "auto", fontWeight: "bold", fontSize: "18px" }}>
                <img
                        className="icon me-2"
                        src={
                          request.user?.isPrivate
                            ? "https://cdn1.iconfinder.com/data/icons/unicons-line-vol-4/24/lock-alt-512.png"
                            : "https://cdn1.iconfinder.com/data/icons/unicons-line-vol-4/24/lock-open-alt-512.png"
                        }
                        alt="Privacy status"
                        style={{ width: "24px", height: "24px" }}
                      />
                  {request.user?.isPrivate ? "Private profile" : "Public profile"}
                </p>
              </div>
            ))}
        </div>
      );
    }