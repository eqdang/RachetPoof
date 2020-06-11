import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";
export const RECEIVE_REPOST = "RECEIVE_REPOST";
export const REMOVE_REPOST = "REMOVE_REPOST";

const receiveUser = payload => ({
	type: RECEIVE_USER,
	payload
  // user: payload.user,
  // tracks: payload.tracks || {}
});

const receiveUserErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

const receiveAllUsers = users => ({
	type: RECEIVE_ALL_USERS,
	// doNotReplace: payload.doNotReplace,
	users
  // users: payload.users
});

export const receiveLike = (payload) => ({
	type: RECEIVE_LIKE,
	userId: payload.userId,
	trackId: payload.trackId
});

export const removeLike = (payload) => ({
	type: REMOVE_LIKE,
	userId: payload.userId,
	trackId: payload.trackId
});

export const receiveRepost = (payload) => ({
	type: RECEIVE_REPOST,
	userId: payload.userId,
	trackId: payload.trackId
});

export const removeRepost = (payload) => ({
	type: REMOVE_REPOST,
	userId: payload.userId,
	trackId: payload.trackId
});

export const fetchUser = userId => dispatch => {
  return UserAPIUtil.fetchUser(userId).then(payload => 
		dispatch(receiveUser(payload))
		// return payload;
	), 
	errors => 
		dispatch(receiveUserErrors(errors.responseJSON));
		// return errors;
};

export const fetchAllUsers = () => dispatch => (
	UserAPIUtil.fetchAllUsers().then(users => 
		dispatch(receiveAllUsers(users))
		// return users;
	)
);

export const createLike = (trackId) => (dispatch) => {
	return UserAPIUtil.createLike(trackId).then(payload => {
		dispatch(receiveLike(payload));
		return payload;
	}, errors => {
		console.log(errors.responseJSON);
		return errors;
	});
};

export const deleteLike = (trackId) => (dispatch) => {
	return UserAPIUtil.deleteLike(trackId).then(payload => {
		dispatch(removeLike(payload));
		return payload;
	}, errors => {
		console.log(errors.responseJSON);
		return errors;
	});
};

export const createRepost = (trackId) => (dispatch) => {
	return UserAPIUtil.createRepost(trackId).then(payload => {
		dispatch(receiveRepost(payload));
		return payload;
	}, errors => {
		console.log(errors.responseJSON);
		return errors;
	});
};

export const deleteRepost = (trackId) => (dispatch) => {
	return UserAPIUtil.deleteRepost(trackId).then(payload => {
		dispatch(removeRepost(payload));
		return payload;
	}, errors => {
		console.log(errors.responseJSON);
		return errors;
	});
};

export const updateUser = (userId, formData) => (dispatch) => {
	return UserApiUtil.updateUser(userId, formData).then(user => {
		dispatch(receiveUser(user));
		return user;
	}, errors => {
		dispatch(receiveUserErrors(errors.responseJSON));
		return errors;
	});
};