var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            // reset the game initial values
            this._resetAll();
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 500, 587, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this);
            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 572, 587, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this);
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 644, 587, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this);
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 716, 587, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this);
            // add resetButton to the scene
            this._resetButton = new objects.Button("ResetButton", 100, 100, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this);
            // add startOverButton to the scene
            this._startOverButton = new objects.Button("StartOverButton", 100, 200, false);
            this.addChild(this._startOverButton);
            this._startOverButton.on("click", this._startOverButtonClick, this);
            // add Credit Text to the scene
            this._creditsText = new objects.Label(this._playerMoney.toString(), "20px Consolas", "#ff0000", 557, 237, false);
            this._creditsText.textAlign = "right";
            this.addChild(this._creditsText);
            // add Bet Text to the scene
            this._betText = new objects.Label(this._playerBets.toString(), "20px Consolas", "#ff0000", 675, 237, false);
            this._betText.textAlign = "right";
            this.addChild(this._betText);
            // add Result Text to the scene
            this._resultText = new objects.Label(this._winnings.toString(), "20px Consolas", "#ff0000", 792, 237, false);
            this._resultText.textAlign = "right";
            this.addChild(this._resultText);
            // add Jackpot Text to the scene
            this._jackpotText = new objects.Label(this._jackpot.toString(), "20px Consolas", "#ff0000", 665, 720, false);
            this._jackpotText.textAlign = "right";
            this.addChild(this._jackpotText);
            //Initialize array of bitmaps
            this._initializeBitmapArray();
            // Setup Background
            this._setupBackground("BlackBackground");
            // FadeIn
            this._fadeIn(500);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
        };
        SlotMachine.prototype._resetAll = function () {
            this._playerMoney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._playerBets = 0;
        };
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._spinReels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "Blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Banana";
                        this._bananas++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Orange";
                        this._oranges++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Bar";
                        this._bars++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Seven";
                        this._sevens++;
                        break;
                }
            }
            return betLine;
        };
        /* This function calculates the player's winnings, if any */
        SlotMachine.prototype._determineWinnings = function () {
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this._winnings = this._playerBets * 10;
                }
                else if (this._bananas == 3) {
                    this._winnings = this._playerBets * 20;
                }
                else if (this._oranges == 3) {
                    this._winnings = this._playerBets * 30;
                }
                else if (this._cherries == 3) {
                    this._winnings = this._playerBets * 40;
                }
                else if (this._bars == 3) {
                    this._winnings = this._playerBets * 50;
                }
                else if (this._bells == 3) {
                    this._winnings = this._playerBets * 75;
                }
                else if (this._sevens == 3) {
                    this._winnings = this._playerBets * 100;
                }
                else if (this._grapes == 2) {
                    this._winnings = this._playerBets * 2;
                }
                else if (this._bananas == 2) {
                    this._winnings = this._playerBets * 2;
                }
                else if (this._oranges == 2) {
                    this._winnings = this._playerBets * 3;
                }
                else if (this._cherries == 2) {
                    this._winnings = this._playerBets * 4;
                }
                else if (this._bars == 2) {
                    this._winnings = this._playerBets * 5;
                }
                else if (this._bells == 2) {
                    this._winnings = this._playerBets * 10;
                }
                else if (this._sevens == 2) {
                    this._winnings = this._playerBets * 20;
                }
                else if (this._sevens == 1) {
                    this._winnings = this._playerBets * 5;
                }
                else {
                    this._winnings = this._playerBets * 1;
                }
                console.log("Win!");
            }
            else {
                console.log("Loss!");
            }
            this._resultText.text = this._winnings.toString();
            this._playerMoney += this._winnings;
            this._creditsText.text = this._playerMoney.toString();
            this._resetFruitTally();
        };
        SlotMachine.prototype._resetFruitTally = function () {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        };
        //Initialize array of bitmaps 
        SlotMachine.prototype._initializeBitmapArray = function () {
            this._reels = new Array();
            for (var reel = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Blank"));
                this._reels[reel].y = 350;
                this._reels[reel].x = 545 + (reel * 72);
                this.addChild(this._reels[reel]);
            }
        };
        SlotMachine.prototype._placeBet = function (playerBet) {
            // ensure player's bet is equal or less than money
            if (playerBet <= this._playerMoney) {
                this._playerBets += playerBet;
                this._playerMoney -= playerBet;
                this._creditsText.text = this._playerMoney.toString();
                this._betText.text = this._playerBets.toString();
            }
            else {
                // Greying out the button
                console.log("Grey out");
                this._spinButton.alpha = 0.2;
            }
        };
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            console.log("Bet 1 Credit");
            this._placeBet(1);
        };
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            console.log("Bet 10 Credit");
            this._placeBet(10);
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            console.log("Bet 100 Credit");
            this._placeBet(100);
        };
        SlotMachine.prototype._resetButtonClick = function (event) {
            console.log("Reset the game values to intial values");
            this._resetAll();
            this._creditsText.text = "1000";
            this._betText.text = "0";
            this._jackpotText.text = "5000";
            this._resultText.text = "0";
        };
        SlotMachine.prototype._startOverButtonClick = function (event) {
            console.log("Reset the game");
            //Change scene
            //FadeOut 
            this._fadeOut(500, function () {
                // Switch to the MENU Scene
                scene = config.Scene.MENU;
                changeScene();
            });
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            //ensure player has enough money
            if (this._playerBets > 0) {
                var bitmap = this._spinReels();
                for (var reel = 0; reel < 3; reel++) {
                    this._reels[reel].image = assets.getResult(bitmap[reel]);
                }
                this._determineWinnings();
                // reset player's bet and winnings to zero
                this._playerBets = 0;
                this._winnings = 0;
                this._betText.text = this._playerBets.toString();
            }
            else {
                // Greying out the button
                console.log("Grey out");
                this._spinButton.alpha = 0.2;
            }
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map