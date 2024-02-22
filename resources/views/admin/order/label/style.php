

@font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: 100;
    src: url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff/IRANSansXFaNum-Thin.woff') format('woff'),
    url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff2/IRANSansXFaNum-Thin.woff2') format('woff2');
}

@font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: 200;
    src: url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff/IRANSansXFaNum-UltraLight.woff') format('woff'),
    url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff2/IRANSansXFaNum-UltraLight.woff2') format('woff2');
}

@font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: 300;
    src: url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff/IRANSansXFaNum-Light.woff') format('woff'),
    url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff2/IRANSansXFaNum-Light.woff2') format('woff2');
}

@font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: 500;
    src: url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff/IRANSansXFaNum-Medium.woff') format('woff'),
    url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff2/IRANSansXFaNum-Medium.woff2') format('woff2');
}

@font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: 600;
    src: url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff/IRANSansXFaNum-DemiBold.woff') format('woff'),
    url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff2/IRANSansXFaNum-DemiBold.woff2') format('woff2');
}

@font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: 800;
    src: url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff/IRANSansXFaNum-ExtraBold.woff') format('woff'),
    url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff2/IRANSansXFaNum-ExtraBold.woff2') format('woff2');
}

@font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: 900;
    src: url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff/IRANSansXFaNum-Black.woff') format('woff'),
    url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff2/IRANSansXFaNum-Black.woff2') format('woff2');
}

@font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: Bold;
    src: url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff/IRANSansXFaNum-Bold.woff') format('woff'),
    url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff2/IRANSansXFaNum-Bold.woff2') format('woff2');
}

@font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: normal;
    src: url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff/IRANSansXFaNum-Regular.woff') format('woff'),
    url('<?php echo LinkExpress()->plugin_url('assets/admin/dist/fonts/'); ?>/IRANSans/Woff2/IRANSansXFaNum-Regular.woff2') format('woff2');
}






body{font-family:  "IRANSansX",  sans-serif !important;     letter-spacing: 0 !important;}
span, div, a, ul, li, input{font-family:  "IRANSansX", sans-serif !important;    letter-spacing: 0 !important;}
h1,h2,h3,h4,h5,h6{font-family: "IRANSansX", sans-serif !important;}
#wpadminbar .ab-icon, #wpadminbar .ab-item:before, #wpadminbar>#wp-toolbar>#wp-admin-bar-root-default .ab-icon, .wp-admin-bar-arrow {
    font: normal 20px/1 dashicons !important;
    letter-spacing: 0 !important;
}



.link-express-label {
border: 1px solid #000;
border-radius: 5px;
padding: 10px;
}

.link-express-label .head {
    display: flex;
    align-items: center;
}

.link-express-label .head .label {
    font-weight: 600;
}

.link-express-label .head .right,
.link-express-label .head .left{
display: flex;
align-items: center;
justify-content: auto;
}
.flex-item {
display: flex;
gap: 10px;
margin: 10px 0;
}
.barcode {
text-align: center;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
}
.justify-between {
justify-content: space-between;
}

.print {
display: flex;
align-items: center;
justify-content: center;
}
.print .button {
background: #000;
color: #FFF;
text-decoration: none;
padding: 10px;
margin-top: 100px;
border-radius: 5px;
}