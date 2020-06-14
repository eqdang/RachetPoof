json.extract! comment, :id, :body, :user_id, :track_id, :created_at
json.id comment.id
json.created_at comment.created_at
json.user_id comment.user.id
json.body comment.body
json.track_id comment.track.id
json.profileImgUrl url_for(comment.user.profile_image)
json.commenterEmail url_for(comment.user.email)

# json.comments do
# 		json.set! comment.id do
# 			json.extract! comment, :id, :body, :track_id, :user_id
# 			json.users comment.users.each do |user|
# 				json.commenter_id comment.user_id
# 			end
# 			json.tracks comment.tracks.each do |track|
# 				json.track_id comment.track_id
# 			end
# 		end
# end
	