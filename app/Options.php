<?php
namespace LinkExpress;

class Options
{
    public static $instance = NULL;
    public $options;

    public static function get_instance()
    {
        NULL === self::$instance and self::$instance = new self;
        return self::$instance;
    }

    public function __construct() {
        $this->set_options();
    }

    public function set_options() {
        $this->options = get_option('link_express_settings');
    }

    public function get_option_value($option) {
        if(!empty($this->options[$option])) return $this->options[$option];
        return false;
    }

    public static function get($key = 'all') {
        $options = get_option('link_express_settings');
        if($key == 'all')
            return $options;

        return $options[$key] ?? false;
    }
}