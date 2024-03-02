<?php
namespace LinkExpress;

use LinkExpress\Integrations\DeliveryTime;

class Application
{
	public static ?Application $instance = NULL;

	public static function getInstance(): ?Application
    {
		NULL === self::$instance && self::$instance = new self;
		return self::$instance;
	}

	public function __construct() {
        new Order();
        new Assets();
        new Settings();
        new DeliveryTime();
	}

	public function plugin_url( $path = null ) {
		return untrailingslashit( plugins_url( is_null( $path ) ? '/' : $path, LinkExpress_File ) );
	}

    public function plugin_dir( $path = null ) {
        return untrailingslashit( LinkExpress_DIR . '/' . $path );
    }

    public function option($option = 'all') {
        if($option == 'all') return Options::get_instance()->options;
        return Options::get_instance()->get_option_value($option);
    }

    public static function version(): string
    {
        $plugin = get_plugin_data(LinkExpress_File);
        return $plugin['Version'];
    }
}