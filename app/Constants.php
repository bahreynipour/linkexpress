<?php

namespace LinkExpress;

use LinkExpress\Concerns\HasConstants;

class Constants {
    use HasConstants;

    public static function init( $appName, $appVersion ) {
        self::setConstant( [
            'appName'                => $appName,
            'appVersion'             => $appVersion,
            'appVersionKey'         => $appName . '_version',
            'dbVersionKey'          => $appName . '_db_version',
            'activationRedirectKey' => $appName . '_activation_redirect',
            'settingsSlug'            => $appName . '-settings'
        ] );
    }

    public static function appName() {
        return self::getConstant( 'appName' );
    }

    public static function appVersion() {
        return self::getConstant( 'appVersion' );
    }

    public static function appVersionKey() {
        return self::getConstant( 'appVersionKey' );
    }

    public static function dbVersionKey() {
        return self::getConstant( 'dbVersionKey' );
    }

    public static function activationRedirectKey() {
        return self::getConstant( 'activationRedirectKey' );
    }

    public static function settingsSlug() {
        return self::getConstant( 'settingsSlug' );
    }
}