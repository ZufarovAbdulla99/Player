CREATE DATABASE "Player";

\c "Player";

User
id
username
password
email
image
role

Playlist
id
name
image
count_track
user_id

Track
id
name
artist
image
playlist_id