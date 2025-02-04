import { Link, NavLink, useLocation} from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    const {pathname} = useLocation();
    const styledLink = pathname.includes('/characters')
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/Marvel">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink style={({isActive}) => ({color: isActive || styledLink ? '#9f0013' : ""})}  to="/Marvel" >Characters</NavLink></li>
                    /
                    <li><NavLink style={({isActive}) => ({color: isActive ? '#9f0013' : ""})} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;