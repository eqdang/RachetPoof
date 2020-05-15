# json.extract! user, :id, :track_ids, :username, :email, :bio, :location

json.id user.id
json.email user.email
json.username user.username
json.bio user.bio
json.location user.location
json.trackIds user.track_ids
json.likedTrackIds user.liked_track_ids
json.tracks user.tracks
json.commentedTrackIds user.commented_track_ids

# json.trackIds user.tracks.pluck(:id)

json.profile_image_url url_for(user.profile_image)
# json.bannerUrl asset_path(user.banner.url)
# json.profileUrl asset_path(user.profile.url)