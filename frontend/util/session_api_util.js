export const login = user =>
  $.ajax({
    method: "POST",
    url: "/api/session",
    data: { user }
  });

export const signup = user =>
  $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user }
  });

export const logout = () =>
  $.ajax({
    method: "DELETE",
    url: "/api/session"
	});
	
export const fetchCurrentUser = id => {
	$.ajax({
		method:"POST",
		url: `/api/users/${id}`,
		data: { currentUser: id }
	})
}

export const emailValidate = email =>
  $.ajax({
    method: "POST",
    url: "/api/session/validate",
    data: { user: email }
  });