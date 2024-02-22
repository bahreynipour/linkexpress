<?php

namespace LinkExpress;

class Onboarding {

	public static function redirectToSettings() {
		if ( ! get_transient( Constants::activationRedirectKey() ) ) {
			return;
		}

		$redirect = true;

		if ( wp_doing_ajax() || is_network_admin() || ! current_user_can( 'manage_woocommerce' ) ) {
			$redirect = false;
		}

		if ( self::isAdminSettingsPage() ) {
			delete_transient( Constants::activationRedirectKey() );
			$redirect = false;
		}

		if ( ! $redirect ) {
			return;
		}

		delete_transient( Constants::activationRedirectKey() );
		wp_safe_redirect( getSettingsUrl() );
		exit;
	}

	public static function isAdminSettingsPage(): bool {
		$page    = $_GET['page'] ?? null;
		$tab     = $_GET['tab'] ?? null;

		return $page === Constants::settingsSlug() && $tab === 'api_credentials';
	}

}