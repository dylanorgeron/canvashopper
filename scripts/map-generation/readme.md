## Map Generation

Map generation is done on level load. A parameter for 
number of rooms can be provided, otherwise no config
is neccessary. The level instance will generate a map
comprised of rooms and hallways. Rooms are three varying
sizes, with a hallway of two blocks connecting each room.

All of this data is stored in the `Level.rooms` array.

## Room Properties
A room has several properties that help it decide how
it should be drawn and where the next room should go.

`size`: Enum for which size room to use. Currently
hardcoded in the constructor.

`origin`: The coordinate the room will be drawn from.
Represents the top left corner of the walkable area.
Surrounding wall tiles will be drawn -1,-1 from this
location.

`direction`: The direction from which the room was
generated. Used to tie hallways together, may be removed
later.

`portals`: These are the possible entrances and exits
for the room. One is chosen based on the possible rooms
that can be generated for it during the level generation.