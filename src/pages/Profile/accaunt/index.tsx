import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAccount } from "../../../helpers/types";
import { BASE, DEF } from "../../../helpers/default";
import { Gallery } from "../../../components/Gallery";
import { getAccaunt, handlCancelation, handleFollow, handleUnFollow } from "../../../helpers/api";

export const Account = () => {
    const { id } = useParams();
    const [user, setUser] = useState<IAccount | null>(null);
    const navigate = useNavigate();

    const handleRequest = () => {
        if (user?.connection.following) {
            unfollow();
        } else if (user?.connection?.requested) {
            cancelRequest();
        } else {
            follow();
        }
    };

    const follow = () => {
        if (user?.id) {
            handleFollow(user.id).then(response => {
                if (response.status === 'following') {
                    setUser({ ...user, connection: { ...user.connection, following: true } });
                } else if (response.status === 'requested') {
                    setUser({ ...user, connection: { ...user.connection, requested: true } });
                }
            });
        }
    };

    const unfollow = () => {
        if (user?.id) {
            handleUnFollow(user.id).then(response => {
                if (response.status === 'unfollowed') {
                    setUser({ ...user, connection: { ...user.connection, following: false } });
                }
            });
        }
    };

    const cancelRequest = () => {
        if (user?.id) {
            handlCancelation(user.id).then(response => {
                if (response.status === 'cancelled') {
                    setUser({ ...user, connection: { ...user.connection, requested: false } });
                }
            });
        }
    };

    useEffect(() => {
        if (!id) {
            return;
        }
        getAccaunt(id).then(response => {
            if (!response.payload || response.status === "error") {
                return navigate("/profile/search");
            }
            setUser(response.payload as IAccount);
        });
    }, [id]);

    return (
        user && (
            <div className="container mt-5 mb-5">
                <div className="row no-gutters shadow-lg rounded overflow-hidden">
                    <div className="col-md-4 col-lg-4" style={{ marginRight: "20px" }}>
                        <img
                            src={user.picture ? BASE + user.picture : DEF}
                            alt={`${user.name} ${user.surname}`}
                            className="img-fluid rounded-start"
                            style={{ objectFit: "cover", height: "100%" }}
                        />
                    </div>

                    <div className="col-md-8 col-lg-8">
                        <div className="d-flex flex-column h-100">
                            <div className="d-flex flex-row justify-content-between align-items-center p-4 bg-dark text-white rounded-top">
                                <h3 className="display-5 mb-0">{user.name} {user.surname}</h3>
                                <div>
                                    <i className="fa fa-facebook me-3"></i>
                                    <i className="fa fa-google me-3"></i>
                                    <i className="fa fa-youtube-play me-3"></i>
                                    <i className="fa fa-dribbble me-3"></i>
                                    <i className="fa fa-linkedin"></i>
                                </div>
                            </div>

                            <div className="p-4 bg-secondary text-white d-flex justify-content-between align-items-center">
                                <div>
                                    <img
                                        className="icon me-2"
                                        src={
                                            user.isPrivate
                                                ? "https://cdn1.iconfinder.com/data/icons/unicons-line-vol-4/24/lock-alt-512.png"
                                                : "https://cdn1.iconfinder.com/data/icons/unicons-line-vol-4/24/lock-open-alt-512.png"
                                        }
                                        alt="Privacy status"
                                        style={{ width: "24px", height: "24px" }}
                                    />
                                    <span className="align-middle">
                                        {user.isPrivate ? "Private Account" : "Public Account"}
                                    </span>
                                </div>
                                <button onClick={() => handleRequest()} style={{ height: "50px", width: "100px" }} className="btn btn-primary btn-sm">
                                    {user.connection.requested
                                        ? "Cancel Request"
                                        : user.connection.following
                                            ? "Unfollow"
                                            : user.connection.followsMe
                                                ? "Follow Back"
                                                : "Follow"}
                                </button>
                            </div>

                            <div className="d-flex text-white">
                                <div className="p-4 bg-primary text-center flex-fill">
                                    <h4>{user.followers?.length || 0}</h4>
                                    <h6>Followers</h6>
                                </div>
                                <div className="p-4 bg-success text-center flex-fill">
                                    <h4>{user.following?.length || 0}</h4>
                                    <h6>Following</h6>
                                </div>
                                <div className="p-4 bg-danger text-center flex-fill">
                                    <h4>{user.posts?.length || 0}</h4>
                                    <h6>Posts</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {(!user.isPrivate || user.connection.following) && <Gallery posts={user.posts} />}
            </div>
        )
    );
};
