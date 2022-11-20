# Planning

## Backend

- Maintains game instances
- Game instances generate and maintain level state, enemy ai state, and player state
    - Level state has nothing to do with drawing
    - Responsible for sending level data to client in a digestable way

**Goals**
- Remove all reliance on gameinstance in frontend code
- Move gameinstance to backend
- Remove lib, not the time yet
- Dont try and render anything on frontend
- Get backgend sending data