# Canvas Hopper
An HTML5 canvas based sidescroller.

https://dylanorgeron.github.io/canvashopper/

![alt text](https://i.imgur.com/ZNAEMlW.png)

Canvas Hopper is a project inspired by a combination of many, *many* hours spent playing games like Terraria, 
as well as a desire to get more familiar with the workings of canvas, typescript, and general game programming.

## Overview

Physics and frame draw are both run at a 16ms interval for an end result of 60 fps. These two loops, along with
keystate listeners for controls, are created in `index.ts`. This file is also responsible for creatinga and exporting
the player, the level data, and the logic controller for enemy spawns.

## Level Data

The level data is tile based, with each tile drawn as a 25 pixel square. Tile collision can be toggled to create terrain 
geometery. Each tile is drawn based on the player's position in the level in relation to the camera postion. If a tile isn't
in the viewport, we don't bother drawing it.

## Players and Enemies

These classes are responsible for all of the logic releated to moving the player and enemies, including collision detection, 
hit detection, and item use. Much of the movement and draw logic is shared here, and should be abstracted out to a seperate
class. 

## Items

Items, which are at this point all weapons, all inherit from `weapon.ts`. The basic properties for metadata, along with properties
used for calculating damage and use behavior are all in this class. Each specific weapon uses its own logic for the "use" action;
Melee weapons are a simple swing, but bows involve sending arrows flying in an arc based on player position and cursor location.
