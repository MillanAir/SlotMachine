﻿module config {

    // Scene Constants
    export class Scene {
        public static MENU: number = 0;
        public static SLOT_MACHINE: number = 1;
        public static GAME_OVER: number = 2;
    }
    
    
    // Screen Constants
    export class Screen {
        public static WIDTH: number = 1280;
        public static HEIGHT: number = 800;
        public static CENTER_X: number = 640;
        public static CENTER_Y: number = 400;
    }
    
    // Game Constants
    export class Game {
        public static FPS: number = 60;
    }
}