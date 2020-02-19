import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const receiveUser = payload => ({
  type: RECEIVE_USER,
  user: payload.user,
  tracks: payload.tracks || {}
});

const receiveUserErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

const receiveAllUsers = users => ({
  type: RECEIVE_ALL_USERS,
  users
});

export const fetchUser = userId => dispatch =>
  UserAPIUtil.fetchUser(userId).then(
    user => dispatch(receiveUser(user)),
    errors => dispatch(receiveUserErrors(errors.responseJSON))
  );

export const fetchAllUsers = () => dispatch =>
  UserAPIUtil.fetchAllUsers().then(users => dispatch(receiveAllUsers(users)));
