<?php namespace LinkExpress;

use Da\QrCode\QrCode;

class Helper
{
    public static function isApiEntered(): bool
    {
        return getOption('api_username') && getOption('api_password');
    }

    public static function pwIntegrate($province, $check_pws = false)
    {
        if ($check_pws) {
            $maybePws = self::maybePws();
            if (!empty($maybePws)) {
                if (!empty($maybePws['states'])) {
                    foreach ($maybePws['states'] as $sk => $sv) {
                        if ($province === $sv) return $sk;
                    }
                }
            }
        }

        $oldStates = ["AE", "AW", "AR", "IS", "AL", "IL", "BU", "TE", "CM", "KJ", "KV", "KS", "KZ", "ZA", "SM", "SB", "FA", "QZ", "QM", "KD", "KE", "BK", "KB", "GO", "GI", "LO", "MN", "MK", "HG", "HD", "YA"];
        $newStates = ["EAZ", "WAZ", "ADL", "ESF", "ABZ", "ILM", "BHR", "THR", "CHB", "SKH", "RKH", "NKH", "KHZ", "ZJN", "SMN", "SBN", "FRS", "GZN", "QHM", "KRD", "KRN", "KRH", "KBD", "GLS", "GIL", "LRS", "MZN", "MKZ", "HRZ", "HDN", "YZD"];


        if ((defined('PW_VERSION') and !PW_VERSION < '3.5.4') || (defined('WCDT_VERSION')))
            return str_replace($oldStates, $newStates, $province);
        else
            return $province;
    }

    public static function generateQrCode($code): string
    {
        $qrCode = (new QrCode($code))
            ->setSize(200)
            ->setMargin(20)
            ->useForegroundColor(0, 0, 0);

        return '<img src="' . $qrCode->writeDataUri() . '">';
    }

    public static function maybePws(): false|array
    {
        if (!class_exists('PWS_VERSION'))
            return false;

        $tapin = get_option('pws_tapin');
        if (!empty($tapin['enable']) and $tapin['enable'] == 1 and class_exists('\PWS_Tapin')) {
            $tapin = new \PWS_Tapin();
            $states = $tapin::states();
            $province = $states;
            $cities = get_transient('link_express_tapin_list_cities');
            if (empty($cities)) {
                $cities = [];
                foreach ($states as $state_key => $state_label) {
                    $cities[$state_key] = $tapin::cities($state_key);
                }
                set_transient('link_express_tapin_list_cities', $cities, DAY_IN_SECONDS);
            }
        } else {
            $_province = get_terms([
                'taxonomy' => 'state_city',
                'hide_empty' => false,
                'parent' => 0
            ]);
            $province = wp_list_pluck($_province, 'name', 'term_id');

            $cities = [];
            foreach ($province as $key => $value) {
                $_cities = get_terms([
                    'taxonomy' => 'state_city',
                    'hide_empty' => false,
                    'parent' => $key
                ]);
                $cities[$key] = wp_list_pluck($_cities, 'name', 'term_id');
            }
        }

        if (!empty($cities))
            return ['states' => $province, 'cities' => $cities];

        return false;
    }

    public static function getStateTitle($state): string
    {
        $states = WC()->countries->get_states('IR');
        if (!empty($states[$state]))
            return $states[$state];
        return '';
    }
}