import { connect } from 'react-redux';
import TrackIndexItem from './track_index_item';
import { fetchTrack, deleteTrack, updateTrack } from '../../actions/track_actions';
import { fetchUser, createLike, removeLike, deleteLike } from '../../actions/user_actions';
import { setCurrentTrack, setPlayPause, setProg } from '../../actions/track_player_actions';

const mapStateToProps = (state, ownProps) => ({
	comments: state.entities.comments,
	errors: state.errors.tracks || [],
	trackplayer: state.trackplayer || {},
	currentUser: state.session.currentUser || {},
	loading: state.ui.loading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchUser: (userId) => dispatch(fetchTrack(userId)),
	fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
	setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
	setPlayPause: (boolean, trackId, progress) => dispatch(setPlayPause(boolean, trackId, progress)),
	deleteTrack: (trackId) => dispatch(deleteTrack(trackId)),
	updateTrack: (track, id) => dispatch(updateTrack(track, id)),
	toggleLike: (trackId) => dispatch(createLike(trackId)),
	setProg: (trackId, progress) => dispatch(setProg(trackId, progress)),
	createLike: (trackId) => dispatch(createLike(trackId)),
	deleteLike: (trackId) => dispatch(deleteLike(trackId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackIndexItem);