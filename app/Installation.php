<?php

namespace LinkExpress;

class Installation {

	public static function install() {
		if ( ! is_blog_installed() ) {
			return;
		}

		self::setIsInstalling();
		self::activationTransient();
		self::unsetInstalling();
	}


	/**
	 * Returns true if we're installing.
	 *
	 * @return bool
	 */
	private static function isInstalling(): bool {
		return 'yes' === get_transient( Constants::installingKey() );
	}

	private static function setIsInstalling() {
		set_transient( Constants::installingKey(), 'yes', MINUTE_IN_SECONDS * 10 );
	}

	private static function unsetInstalling() {
		delete_transient( Constants::installingKey() );
	}

	/**
	 * Is this a brand-new installation?
	 *
	 * A brand-new installation has no version yet. Also treat empty installations as 'new'.
	 *
	 * @return boolean
	 */
	public static function isNewInstall(): bool {
		return is_null( get_option( Constants::appVersionKey(), null ) );
	}

	/**
	 * See if we need to set redirect transients for activation or not.
	 *
     * @return void
	 */
	private static function activationTransient() {
		if ( ! self::isNewInstall() ) {
			return;
		}

		set_transient( Constants::activationRedirectKey(), 1, 30 );

	}
}