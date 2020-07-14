import React from "react";
import { NavLink, Link, withRouter } from 'react-router-dom';
import TrackIndexItem from '../track_index/track_index_item_container';
import NavbarContainer from '../navbar/navbar_container';
import StreamSidebar from './stream_sidebar';
import ReactPlayer from 'react-player';

class Stream extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		this.props.fetchAllTracks();
		this.props.fetchAllUsers();
		this.props.fetchCurrentUser(this.props.currentUser.id);
	}

	// componentDidUpdate(prevProps) {
	// 	this.setState({ 
	// 		tracks: prevProps.tracks, 
	// 		users: prevProps.users
	// 	}); 
	// }

	render() {
		const { user, currentUser, setPlayPause, setProg, deleteTrack, createRepost, deleteRepost, fetchTrack, fetchAllTracks } = this.props;
		let tracks = Object.values(this.props.tracks);
		let users = Object.values(this.props.users);

		let stream = ((tracks)).map((track, idx) => (
			<TrackIndexItem key={idx} track={track} currentUser={currentUser || null} users={users} tracks={tracks} setPlayPause={setPlayPause} setProg={setProg} deleteTrack={deleteTrack} createRepost={createRepost} deleteRepost={deleteRepost} fetchTrack={fetchTrack} fetchAllTracks={fetchAllTracks} />
		));

		let streamSidebar = (
			<StreamSidebar users={users} currentUser={currentUser || null} tracks={tracks} />
		);

		let streamNavbar = (
			<NavbarContainer currentUser={currentUser} />
		);

		return (
			<div className="stream-page-container">
				{streamNavbar}
				<main className='stream-main'>
					<div className='stream-index'>
						<nav className='stream-nav'>
							<ul>
								<li><NavLink to='/stream' activeClassNamje='selected'>Stream</NavLink></li>
								{/* <li><Link to='/stream'>Charts</Link></li>
								<li><Link to='/stream'>Discover</Link></li> */}
							</ul>
						</nav>
						<p>Hear the latest posts from the people you're following</p>
						<ul className='homepage-tracks'>
							{stream}
						</ul>
					</div>

					<div className="sidebar-placeholder">
						<div className="sidebar-ad-container">
							<a href="http://www.github.com/eqdang/soundpoof" target="_blank"><img src="" /></a>
						</div>
						{streamSidebar}
					</div>
					
				</main>
			</div>
		);
	}
} 

export default (Stream);