
import { IPost } from '../helpers/types';
import { BASE } from '../helpers/default'

interface Props {
    posts: IPost[]
}

export function Gallery({ posts }: Props) {
    const handleBoom = (post:string) => {
    
       return <img src={BASE + post} alt="" style={{width:"500px", height:"800px"}} />
    }
    return (
        <div className='list'>
            {
                posts.map(post => {
                    return <div key={post.id}>
                        <button onClick={() => handleBoom(post.picture)}>
                        <img
                            src={BASE + post.picture}
                        />
                        </button>
                        <p>{post.title} <small>({post.likes.length} likes</small>)</p>
                    </div>
                })
            }
        </div>
    )
}