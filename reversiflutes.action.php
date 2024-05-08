<?php
/*
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. ANY CHANGES MADE DIRECTLY MAY BE OVERWRITTEN.
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * ReversiFlutes implementation : © Flutes flutegirl@gmail.com
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 */

class action_reversiflutes extends APP_GameAction
{
	/** @var reversiflutes $game */
	protected $game; // Enforces functions exist on Table class

	// Constructor: please do not modify
	public function __default()
	{
		if (self::isArg('notifwindow')) {
			$this->view = "common_notifwindow";
			$this->viewArgs['table'] = self::getArg("table", AT_posint, true);
		} else {
			$this->view = "reversiflutes_reversiflutes";
			self::trace("Complete reinitialization of board game");
		}
	}

	public function playDisc()
	{
		self::setAjaxMode();

		/** @var int $x */
		$x = self::getArg('x', AT_int, true);
		/** @var int $y */
		$y = self::getArg('y', AT_int, true);

		$this->game->playDisc( $x, $y );
		self::ajaxResponse();
	}
}