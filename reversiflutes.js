var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("bgagame/reversiflutes", ["require", "exports", "ebg/core/gamegui", "ebg/counter"], function (require, exports, Gamegui) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ReversiFlutes = (function (_super) {
        __extends(ReversiFlutes, _super);
        function ReversiFlutes() {
            var _this = _super.call(this) || this;
            console.log("reversiflutes constructor");
            return _this;
        }
        ReversiFlutes.prototype.setup = function (gamedatas) {
            console.log("Starting game setup");
            for (var i in gamedatas.board) {
                var square = gamedatas.board[i];
                if (square === null || square === void 0 ? void 0 : square.player)
                    this.addTokenOnBoard(square.x, square.y, square.player);
            }
            this.setupNotifications();
            dojo.query('.square').connect('onclick', this, 'onPlayDisc');
            console.log("Ending game setup");
        };
        ReversiFlutes.prototype.onEnteringState = function (stateName, args) {
            console.log('Entering state: ' + stateName);
            switch (stateName) {
                case 'playerTurn':
                    this.updatePossibleMoves(args.args.possibleMoves);
                    break;
            }
        };
        ReversiFlutes.prototype.onLeavingState = function (stateName) {
            console.log("Leaving state: " + stateName);
        };
        ReversiFlutes.prototype.onUpdateActionButtons = function (stateName, args) {
            console.log("onUpdateActionButtons: " + stateName, args);
            if (!this.isCurrentPlayerActive())
                return;
        };
        ReversiFlutes.prototype.addTokenOnBoard = function (x, y, player_id) {
            var player = this.gamedatas.players[player_id];
            if (!player)
                throw new Error("Unknown player id: " + player_id);
            dojo.place(this.format_block("jstpl_token", {
                x_y: "".concat(x, "_").concat(y),
                color: player.color,
            }), "board");
            this.placeOnObject("token_".concat(x, "_").concat(y), "overall_player_board_".concat(player_id));
            this.slideToObject("token_".concat(x, "_").concat(y), "square_".concat(x, "_").concat(y)).play();
        };
        ReversiFlutes.prototype.clearPossibleMoves = function () {
            document.querySelectorAll('.possibleMove').forEach(function (element) {
                element.classList.remove('possibleMove');
            });
        };
        ReversiFlutes.prototype.updatePossibleMoves = function (possibleMoves) {
            this.clearPossibleMoves();
            for (var x in possibleMoves) {
                for (var y in possibleMoves[x]) {
                    var square = $("square_".concat(x, "_").concat(y));
                    if (!square)
                        throw new Error("Unknown square element: ".concat(x, "_").concat(y, ". Make sure the board grid was set up correctly in the tpl file."));
                    square.classList.add('possibleMove');
                }
            }
            this.addTooltipToClass('possibleMove', '', _('Place a disc here'));
        };
        ReversiFlutes.prototype.onPlayDisc = function (evt) {
            evt.preventDefault();
            if (!(evt.currentTarget instanceof HTMLElement))
                throw new Error('evt.currentTarget is null! Make sure that this function is being connected to a DOM HTMLElement.');
            if (!evt.currentTarget.classList.contains('possibleMove'))
                return;
            if (!this.checkAction('playDisc'))
                return;
            var _a = evt.currentTarget.id.split('_'), _square_ = _a[0], x = _a[1], y = _a[2];
            this.ajaxcall("/".concat(this.game_name, "/").concat(this.game_name, "/playDisc.html"), {
                x: x,
                y: y,
                lock: true
            }, this, function () { });
        };
        ReversiFlutes.prototype.setupNotifications = function () {
            console.log("notifications subscriptions setup");
        };
        return ReversiFlutes;
    }(Gamegui));
    dojo.setObject("bgagame.reversiflutes", ReversiFlutes);
});
