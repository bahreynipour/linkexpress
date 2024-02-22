<?php
namespace LinkExpress;

class Hooks
{
    public function __construct() {
        add_filter('link_express_api_body_data', [$this, 'link_express_api_body_data'], 10, 1);
    }

    public function link_express_api_body_data($data) {
        if(empty($data['state']))
            return $data;

        $state = Helper::getStateTitle($data['state']);

        if(!empty($state))
            $data['state'] = $state;

        return $data;
    }
}