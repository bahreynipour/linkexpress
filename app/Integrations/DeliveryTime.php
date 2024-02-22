<?php namespace LinkExpress\Integrations;

class DeliveryTime
{
    public function __construct() {
        add_filter('link_express_change_default_values', [$this, 'link_express_change_default_values'], 10, 2);
    }

    public function link_express_change_default_values($default_value, $orderId) {
        if(!self::isActive())
            return $default_value;
        $date_time = get_post_meta($orderId, '_delivery_time', true);
        if(empty($date_time)) return $default_value;

        $date_time = explode(' - ', $date_time);
        $date = $date_time[0];
        $time = explode('-', $date_time[1]);
        $from = $time[0];
        $to = $time[1];
        if($default_value['city'] == 'تهران')  {
            if($from == 8 and $to == 14) $default_value['shift'] = 1;
            if($from == 14 and $to == 20) $default_value['shift'] = 2;
        } else {
            if($from == 8 and $to == 20) $default_value['shift'] = 3;
        }
        $default_value['sendDate'] = str_replace('/', '-', $date);

        return $default_value;
    }

    public static function getStructure() {
        ob_start();
        ?>
            برای هماهنگی با افزونه زمان ارسال، باید طبق شرایط زیر عمل کنید:
        <br>
        در صورتی که در شهر تهران سرویس میدهید و تنظیمات این افزونه را برای شهر تهران تنظیم کرده اید، باید شیفت های صبح و عصر را طبق لینک اکسپرس وارد کنید.
        <br>
        برای شهر های غیر از تهران که در شهر های سرویس دهی لینک اکسپرس هست، باید یک شیفت صبح تا عصر لینک اکسپرس را در تنظیمات این افزونه وارد کنید.
        <?php
        return ob_get_clean();
    }

    public function link_express_settings_sanitize($value, $key) {
        if($key == 'woocommerce_delivery_time') {
            if( !self::isActive() ) {
                add_settings_error('link_express-notices', '', 'افزونه زمان ارسال کالا فعال نیست', 'error');
                return false;
            }
            $wcdt_options = get_option('wcdt_options');
            if(empty($wcdt_options)) {
                add_settings_error('link_express-notices', '', 'تنظیمات زمان ارسال تعریف نشده است', 'error');
                return false;
            }
            if(empty($wcdt_options['city_conditions'])) {

            }
        }
        return $value;
    }

    public static function isActive(): bool
    {
        return class_exists('\WC_Delivery_Time\Includes\WC_Delivery_Time');
    }

    public function get_link_express_shift_from_selected_time($orderId) {
        $time = get_post_meta($orderId, '_delivery_time', true);
        return $time;
    }
}