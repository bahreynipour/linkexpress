<?php namespace LinkExpress;

use LinkExpress\Integrations\DeliveryTime;
use LinkExpress\Services\Nonce;

class Assets
{
    public function __construct()
    {
        add_action('admin_enqueue_scripts', [$this, 'admin_enqueue_scripts']);
    }

    public function admin_enqueue_scripts()
    {
        $screen = get_current_screen();
        if (empty($screen)) return '';
        if ($screen->post_type == 'shop_order' || strpos($screen->base, Constants::settingsSlug())) {

            if (!DeliveryTime::isActive() || !wp_script_is('wcdt-backend-persian-date-js', 'enqueued')) {
                wp_enqueue_script(
                    'link-express-datepicker-script',
                    app()::getFileUrl('assets/libraries/persian-datepicker/persian-datepicker.min.js'),
                    ['jquery'],
                    Constants::appVersion(),
                    true
                );
                wp_enqueue_style(
                    'link-express-datepicker-style',
                    app()::getFileUrl('assets/libraries/persian-datepicker/persian-datepicker.css'),
                    [],
                    Constants::appVersion(),
                );
            }
            wp_enqueue_style(
                'linkExpress',
                app()::getFileUrl('assets/admin/dist/css/linkexpress.min.css'),
                ['woocommerce_admin_styles'],
                Constants::appVersion()
            );
            wp_enqueue_script(
                'linkExpress',
                app()::getFileUrl('assets/admin/dist/js/linkexpress.min.js'),
                ['jquery', 'jquery-blockui', 'wc-enhanced-select', 'selectWoo'],
                Constants::appVersion(),
                true
            );

            $params = [
                'ajax' => [
                    'url' => admin_url('admin-ajax.php'),
                    'nonce' => Nonce::make('linkExpress')->create()
                ],
                'shifts' => getShifts(),
                'supported_cities' => linkCities(),
                'p_type' => getPTypes()

            ];

            if (DeliveryTime::isActive() && wp_script_is('wcdt-backend-persian-date-js', 'enqueued')) {
                $params['is_wcdt_active'] = true;
            }

            $pws = Helper::maybePws();
            if (!empty($pws)) {
                $params['states'] = $pws['states'];
                $params['cities'] = $pws['cities'];
                $params['pws_active'] = true;
            }

            wp_localize_script('linkExpress', 'link_express_object_data', $params);
        }
    }

}