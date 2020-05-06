	import { RECEIVE_CURRENT_TRACK, PLAY_PAUSE_TRACK, PREVIOUS, NEXT,END_CURRENT_TRACK, TOGGLE_SHUFFLE, TOGGLE_LOOP, SEEK_TRACK, SET_TRACK_PLAYER, SEEK_WAVE_FORM, SEEK_PLAYER, SET_PROGRESS } from '../actions/track_player_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

const defaultState = {
	currentTrack: null,
	playing: false,
	player: null,
	trackId: 0,
	playerSeek: 0,
	waveSeek: 0,
	progressTrackId: {},
	loop: null,
	shuffle: false,
	unshuffled: []
};

const trackplayerReducer = (oldState = defaultState, action) => {
	Object.freeze(oldState);
	let newState;
	let change;
	switch (action.type) {
		case RECEIVE_CURRENT_TRACK:
			change = { currentTrack: action.track, playing: true, trackId: action.track.id, seek: 0 };
			return merge({}, oldState, change);
		case PLAY_PAUSE_TRACK:
			if (action.trackId !== oldState.trackId) { // if play_paused track is not whats currently playing
				return merge({}, oldState, {
					playing: true, //action.boolean,
					trackId: action.trackId,
					waveSeek: oldState.progressTrackId[action.trackId] || 0,
					playerSeek: oldState.progressTrackId[action.trackId] || 0,
					progressTrackId: { [action.trackId]: action.progress } //setting leaving track progress out
				});
			} else if (!action.trackId || action.trackId === -1) {
				return merge({}, oldState, {
					playing: true,
					trackId: 0
				});
			} else {
				return merge({}, oldState, {
					playing: !oldState.playing,
					progressTrackId: { [action.trackId]: action.progress },
				});
			}
		case NEXT:
			newState = merge({}, oldState);
					switch (state.loop) {
						case LOOP_ALL:
							if (newState.trackId === newState.tracks.length - 1) {
								newState.trackId = 0;
							} else {
								newState.trackId += 1;
							}
							break;
						case null:
							if (newState.trackId !== newState.tracks.length - 1) {
								newState.trackId += 1;
							}
							break
					}
					newState.playing = true;
					return newState;
		case PREVIOUS:
			newState = merge({}, oldState);
			if (newState.trackId !== 0 && newState.position < 1000) {
				newState.trackId -= 1;
			}
			newState.playing = true;
			newState.seek = 0;
			return newState;
		case END_CURRENT_TRACK:
			return merge({}, oldState, {
				playing: false,
				progressTrackId: { [action.trackId]: 0 },
				waveSeek: 0,
				playerSeek: 0,
			});
		case SET_PROGRESS:
			return merge({}, oldState, {
				progressTrackId: { [action.trackId]: action.progress }
			});
		case LOGOUT_CURRENT_USER:
			return defaultState;
		case SEEK_TRACK:
			return merge({}, oldState, { seek: action.seconds });
		case SEEK_PLAYER:
			return Object.assign({}, oldState, { playerSeek: action.progress });
		case SET_TRACK_PLAYER:
			return merge({}, oldState, { player: action.trackplayer });
		case SEEK_WAVE_FORM:
			if (action.trackId && (action.trackId !== oldState.trackId)) { // if new track is not current track
				return merge({}, oldState, {
					progressTrackId: { [action.trackId]: action.progress } //save progress of leaving track 
				});
			} else { //it is the same track 
				// return Object.assign({}, oldState, { waveSeek: action.progress }); 
				return merge({}, oldState, { progressTrackId: { [action.trackId]: action.progress }, waveSeek: action.progress });
			}
		default:
			return oldState;
	}
};

export default trackplayerReducer;