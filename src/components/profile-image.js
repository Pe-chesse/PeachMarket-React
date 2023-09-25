import { Link } from 'react-router-dom';
import '../styles/profile-image.scss'

const UserProfileImage = ({ image_url, small}) =>  {
    return (

        <Link to="/home/">
            <div className={small == null? "post-userinfo-img" :small? "post-userinfo-img-small":"post-userinfo-img-big"}>
                {image_url == null || "" ? <img src="../img/peach_cha.png" alt="post-profile-img"/> :<img src={image_url} alt="user-profile-image"/>}
            </div>
        </Link>
    );
}
export default UserProfileImage;