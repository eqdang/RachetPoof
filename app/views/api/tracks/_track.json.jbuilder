json.id track.id
json.title track.title
json.artist track.artist
json.description track.description
json.user_id track.user_id
json.audioUrl url_for(track.audio)
json.artworkUrl url_for(track.artwork)
json.numLikes track.likes.length
json.numComments track.comments.length