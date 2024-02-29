<?php
/**
 * Plugin Name: LinkExpress Shipping
 * Plugin URI: https://linkexpress.ir
 * Description: Add LinkExpress features to your WooCommerce Store
 * Version: 2.1.0
 * Author: Reza Bahreynipour
 * Author URI: https://yuzwp.com
 * Text Domain: linkExpress
 * Domain Path: /languages/
 */

namespace LinkExpress;

if ( ! defined( 'ABSPATH' ) ) {
    return;
}

class Bootloader
{
    public static string $textDomain;
    public static string $name;
    public static string $appFile;
    public static string $version;
    public static string $appUrl;
    public static string $appDirPath;
    protected Application $app;
    public static ?Bootloader $instance = null;

    public static function getInstance( string $appDirUrl, string $appDirPath ): ?Bootloader
    {
        null === self::$instance and self::$instance = new self( $appDirUrl, $appDirPath );
        return self::$instance;
    }

    public function __construct( string $appDirUrl, string $appDirPath )
    {
        self::$appUrl     = $appDirUrl;
        self::$appDirPath = $appDirPath;
        $this->init();
    }

    protected function init(): void {
        $this->require( 'vendor/autoload.php' );
        $this->require( 'helpers.php' );
        $this->defineAppData();
        $this->install();
    }

    protected function defineAppData() {
        self::$appFile    = __FILE__;
        self::$textDomain = self::getAppData( 'TextDomain' );
        self::$name       = self::getAppData( 'TextDomain' );
        self::$version    = $this->getVersion();
        Constants::init( self::$name, self::$version );
    }

    private function install() {
        register_activation_hook(
            self::$appFile,
            [ Installation::class, 'install' ]
        );

        add_action(
            'admin_init',
            [ Onboarding::class, 'redirectToSettings' ]
        );
    }

    public function boot(): void {
        $this->app ??= new Application();
        add_action( 'init', function () {
            load_plugin_textdomain(
                self::$textDomain,
                false,
                dirname( plugin_basename( __FILE__ ) ) . '/languages'
            );
        } );
    }

    public function require( $path, bool $absolute = false, bool $once = false, bool $return = false ) {

        $path = $absolute ? $path : self::getFileDirPath( $path );
        if ( $once ) {
            $require = require_once $path;
        } else {
            $require = require $path;
        }

        if ( $return ) {
            return $require;
        }
    }

    public function getAppFile(): string {
        return self::$appFile;
    }

    public function getTextDomain(): string {
        return self::$textDomain;
    }

    public function getName(): string {
        return self::$name;
    }

    public static function getFileUrl( $path = null ): string {
        return untrailingslashit( self::$appUrl . ( $path ?? '' ) );
    }

    public static function getFileDirPath( $path = null ): string {
        return untrailingslashit( self::$appDirPath . ( $path ?? '' ) );
    }

    public function getVersion(): string {
        return self::getAppData( 'version' ) ?? '1.0.0';
    }

    public static function getAppData( ?string $key = null ) {

        $data = get_file_data( self::$appFile, array(
            'Version'    => 'Version',
            'TextDomain' => 'Text Domain',
            'DomainPath' => 'Domain Path'
        ), 'plugin' );

        if ( ! isset( $data ) ) {
            return null;
        }

        if ( empty( $key ) ) {
            return $data;
        }

        return $data[ ucfirst( $key ) ] ?? null;
    }
}

function app(): ?Bootloader {
    return Bootloader::getInstance(
        plugin_dir_url( __FILE__ ),
        plugin_dir_path( __FILE__ )
    );
}

app()->boot();