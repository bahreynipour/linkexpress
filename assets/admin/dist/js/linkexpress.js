!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.NiceSelect=t():e.NiceSelect=t()}(self,(()=>(()=>{"use strict";var e={d:(t,i)=>{for(var s in i)e.o(i,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function i(e){var t=document.createEvent("MouseEvents");t.initEvent("click",!0,!1),e.dispatchEvent(t)}function s(e){var t=document.createEvent("HTMLEvents");t.initEvent("change",!0,!1),e.dispatchEvent(t)}function o(e){var t=document.createEvent("FocusEvent");t.initEvent("focusin",!0,!1),e.dispatchEvent(t)}function n(e){var t=document.createEvent("FocusEvent");t.initEvent("focusout",!0,!1),e.dispatchEvent(t)}function d(e){var t=document.createEvent("UIEvent");t.initEvent("modalclose",!0,!1),e.dispatchEvent(t)}function l(e,t){"invalid"==t?(c(this.dropdown,"invalid"),h(this.dropdown,"valid")):(c(this.dropdown,"valid"),h(this.dropdown,"invalid"))}function r(e,t){return null!=e[t]?e[t]:e.getAttribute(t)}function a(e,t){return!!e&&e.classList.contains(t)}function c(e,t){if(e)return e.classList.add(t)}function h(e,t){if(e)return e.classList.remove(t)}e.r(t),e.d(t,{bind:()=>f,default:()=>u});var p={data:null,searchable:!1,showSelectedItems:!1};function u(e,t){this.el=e,this.config=Object.assign({},p,t||{}),this.data=this.config.data,this.selectedOptions=[],this.placeholder=r(this.el,"placeholder")||this.config.placeholder||"Select an option",this.searchtext=r(this.el,"searchtext")||this.config.searchtext||"Search",this.selectedtext=r(this.el,"selectedtext")||this.config.selectedtext||"selected",this.dropdown=null,this.multiple=r(this.el,"multiple"),this.disabled=r(this.el,"disabled"),this.create()}function f(e,t){return new u(e,t)}return u.prototype.create=function(){this.el.style.opacity="0",this.el.style.width="0",this.el.style.padding="0",this.el.style.height="0",this.data?this.processData(this.data):this.extractData(),this.renderDropdown(),this.bindEvent()},u.prototype.processData=function(e){var t=[];e.forEach((e=>{t.push({data:e,attributes:{selected:!!e.selected,disabled:!!e.disabled,optgroup:"optgroup"==e.value}})})),this.options=t},u.prototype.extractData=function(){var e=this.el.querySelectorAll("option,optgroup"),t=[],i=[],s=[];e.forEach((e=>{if("OPTGROUP"==e.tagName)var s={text:e.label,value:"optgroup"};else s={text:e.innerText,value:e.value,selected:null!=e.getAttribute("selected")||this.el.value==e.value,disabled:null!=e.getAttribute("disabled")};var o={selected:e.selected,disabled:e.disabled,optgroup:"OPTGROUP"==e.tagName};t.push(s),i.push({data:s,attributes:o})})),this.data=t,this.options=i,this.options.forEach((e=>{e.attributes.selected&&s.push(e)})),this.selectedOptions=s},u.prototype.renderDropdown=function(){var e=["nice-select",r(this.el,"class")||"",this.disabled?"disabled":"",this.multiple?"has-multiple":""];let t='<div class="nice-select-search-box">';t+=`<input type="text" class="nice-select-search" placeholder="${this.searchtext}..." title="search"/>`,t+="</div>";var i=`<div class="${e.join(" ")}" tabindex="${this.disabled?null:0}">`;i+=`<span class="${this.multiple?"multiple-options":"current"}"></span>`,i+='<div class="nice-select-dropdown">',i+=`${this.config.searchable?t:""}`,i+='<ul class="list"></ul>',i+="</div>",i+="</div>",this.el.insertAdjacentHTML("afterend",i),this.dropdown=this.el.nextElementSibling,this._renderSelectedItems(),this._renderItems()},u.prototype._renderSelectedItems=function(){if(this.multiple){var e="";this.config.showSelectedItems||this.config.showSelectedItems||"auto"==window.getComputedStyle(this.dropdown).width||this.selectedOptions.length<2?(this.selectedOptions.forEach((function(t){e+=`<span class="current">${t.data.text}</span>`})),e=""==e?this.placeholder:e):e=this.selectedOptions.length+" "+this.selectedtext,this.dropdown.querySelector(".multiple-options").innerHTML=e}else{var t=this.selectedOptions.length>0?this.selectedOptions[0].data.text:this.placeholder;this.dropdown.querySelector(".current").innerHTML=t}},u.prototype._renderItems=function(){var e=this.dropdown.querySelector("ul");this.options.forEach((t=>{e.appendChild(this._renderItem(t))}))},u.prototype._renderItem=function(e){var t=document.createElement("li");if(t.innerHTML=e.data.text,e.attributes.optgroup)c(t,"optgroup");else{t.setAttribute("data-value",e.data.value);var i=["option",e.attributes.selected?"selected":null,e.attributes.disabled?"disabled":null];t.addEventListener("click",this._onItemClicked.bind(this,e)),t.classList.add(...i)}return e.element=t,t},u.prototype.update=function(){if(this.extractData(),this.dropdown){var e=a(this.dropdown,"open");this.dropdown.parentNode.removeChild(this.dropdown),this.create(),e&&i(this.dropdown)}r(this.el,"disabled")?this.disable():this.enable()},u.prototype.disable=function(){this.disabled||(this.disabled=!0,c(this.dropdown,"disabled"))},u.prototype.enable=function(){this.disabled&&(this.disabled=!1,h(this.dropdown,"disabled"))},u.prototype.clear=function(){this.resetSelectValue(),this.selectedOptions=[],this._renderSelectedItems(),this.update(),s(this.el)},u.prototype.destroy=function(){this.dropdown&&(this.dropdown.parentNode.removeChild(this.dropdown),this.el.style.display="")},u.prototype.bindEvent=function(){this.dropdown.addEventListener("click",this._onClicked.bind(this)),this.dropdown.addEventListener("keydown",this._onKeyPressed.bind(this)),this.dropdown.addEventListener("focusin",o.bind(this,this.el)),this.dropdown.addEventListener("focusout",n.bind(this,this.el)),this.el.addEventListener("invalid",l.bind(this,this.el,"invalid")),window.addEventListener("click",this._onClickedOutside.bind(this)),this.config.searchable&&this._bindSearchEvent()},u.prototype._bindSearchEvent=function(){var e=this.dropdown.querySelector(".nice-select-search");e&&e.addEventListener("click",(function(e){return e.stopPropagation(),!1})),e.addEventListener("input",this._onSearchChanged.bind(this))},u.prototype._onClicked=function(e){var t,i;if(e.preventDefault(),a(this.dropdown,"open")?this.multiple||(h(this.dropdown,"open"),d(this.el)):(c(this.dropdown,"open"),t=this.el,(i=document.createEvent("UIEvent")).initEvent("modalopen",!0,!1),t.dispatchEvent(i)),a(this.dropdown,"open")){var s=this.dropdown.querySelector(".nice-select-search");s&&(s.value="",s.focus());var o=this.dropdown.querySelector(".focus");h(o,"focus"),c(o=this.dropdown.querySelector(".selected"),"focus"),this.dropdown.querySelectorAll("ul li").forEach((function(e){e.style.display=""}))}else this.dropdown.focus()},u.prototype._onItemClicked=function(e,t){var i=t.target;a(i,"disabled")||(this.multiple?a(i,"selected")?(h(i,"selected"),this.selectedOptions.splice(this.selectedOptions.indexOf(e),1),this.el.querySelector(`option[value="${i.dataset.value}"]`).removeAttribute("selected")):(c(i,"selected"),this.selectedOptions.push(e)):(this.selectedOptions.forEach((function(e){h(e.element,"selected")})),c(i,"selected"),this.selectedOptions=[e]),this._renderSelectedItems(),this.updateSelectValue())},u.prototype.updateSelectValue=function(){if(this.multiple){var e=this.el;this.selectedOptions.forEach((function(t){var i=e.querySelector(`option[value="${t.data.value}"]`);i&&i.setAttribute("selected",!0)}))}else this.selectedOptions.length>0&&(this.el.value=this.selectedOptions[0].data.value);s(this.el)},u.prototype.resetSelectValue=function(){if(this.multiple){var e=this.el;this.selectedOptions.forEach((function(t){var i=e.querySelector(`option[value="${t.data.value}"]`);i&&i.removeAttribute("selected")}))}else this.selectedOptions.length>0&&(this.el.selectedIndex=-1);s(this.el)},u.prototype._onClickedOutside=function(e){this.dropdown.contains(e.target)||(h(this.dropdown,"open"),d(this.el))},u.prototype._onKeyPressed=function(e){var t=this.dropdown.querySelector(".focus"),s=a(this.dropdown,"open");if(13==e.keyCode)i(s?t:this.dropdown);else if(40==e.keyCode){if(s){var o=this._findNext(t);o&&(h(this.dropdown.querySelector(".focus"),"focus"),c(o,"focus"))}else i(this.dropdown);e.preventDefault()}else if(38==e.keyCode){if(s){var n=this._findPrev(t);n&&(h(this.dropdown.querySelector(".focus"),"focus"),c(n,"focus"))}else i(this.dropdown);e.preventDefault()}else if(27==e.keyCode&&s)i(this.dropdown);else if(32===e.keyCode&&s)return!1;return!1},u.prototype._findNext=function(e){for(e=e?e.nextElementSibling:this.dropdown.querySelector(".list .option");e;){if(!a(e,"disabled")&&"none"!=e.style.display)return e;e=e.nextElementSibling}return null},u.prototype._findPrev=function(e){for(e=e?e.previousElementSibling:this.dropdown.querySelector(".list .option:last-child");e;){if(!a(e,"disabled")&&"none"!=e.style.display)return e;e=e.previousElementSibling}return null},u.prototype._onSearchChanged=function(e){var t=a(this.dropdown,"open"),i=e.target.value;if(""==(i=i.toLowerCase()))this.options.forEach((function(e){e.element.style.display=""}));else if(t){var s=new RegExp(i);this.options.forEach((function(e){var t=e.data.text.toLowerCase(),i=s.test(t);e.element.style.display=i?"":"none"}))}this.dropdown.querySelectorAll(".focus").forEach((function(e){h(e,"focus")})),c(this._findNext(null),"focus")},t})()));
const linkCities = {
    cities: (state) => {
        if (linkHelper.isPwsActive)
            return Object.fromEntries([
                ...Object.values(linkHelper.settings.cities[state]).map((item) => [item, item])
            ])

        if (!state)
            return new Array(['استان را انتخاب کنید', 0])

        const cities = []
        switch (state.toUpperCase()) {
            //تهران
            case 'THR':
            case 'TE':
                cities[1] = ['شهر قدس', '3619'];
                cities[2] = ['پردیس', '5588'];
                cities[3] = ['نسیم شهر', '5589'];
                cities[4] = ['گلستان', '5590'];
                cities[5] = ['قرچک', '5591'];
                cities[6] = ['دماوند', '3633'];
                cities[7] = ['فیروزکوه', '3634'];
                cities[8] = ['ورامین', '3592'];
                cities[9] = ['پیشوا', '3593'];
                cities[10] = ['جاجرود', '3594'];
                cities[11] = ['لواسان', '3588'];
                cities[12] = ['شهریار', '3589'];
                cities[13] = ['فردوس', '3590'];
                cities[15] = ['تجزیه مبادلات لشکر', '3578'];
                cities[23] = ['ری', '3586'];
                cities[24] = ['برغان', '3851'];
                cities[25] = ['رامجین', '3852'];
                cities[26] = ['کوهسار', '3853'];
                cities[27] = ['شهراسر', '3854'];
                cities[28] = ['منگلان', '3855'];
                cities[29] = ['طالقان', '3856'];
                cities[30] = ['قلعه سین', '3857'];
                cities[31] = ['خیرآبادخالصه', '3858'];
                cities[32] = ['عسگرآبادعباسی', '3859'];
                cities[33] = ['دهماسین', '3860'];
                cities[34] = ['باغ خواص', '3861'];
                cities[35] = ['ایجدان', '3862'];
                cities[36] = ['آب باریک', '3863'];
                cities[37] = ['جواد آباد', '3864'];
                cities[38] = ['خاوه', '3865'];
                cities[39] = ['محمودآبادعرب', '3866'];
                cities[40] = ['جلیل آباد', '3867'];
                cities[41] = ['کریم آباد', '3868'];
                cities[42] = ['قلعه خواجه', '3869'];
                cities[43] = ['داودآباد', '3870'];
                cities[44] = ['پاکدشت', '3871'];
                cities[45] = ['شریف آباد', '3872'];
                cities[46] = ['پارچین', '3873'];
                cities[47] = ['حصارامیر', '3874'];
                cities[48] = ['خاتون آباد', '3875'];
                cities[49] = ['آتشگاه', '3822'];
                cities[50] = ['احمدآبادمستوفی', '3823'];
                cities[51] = ['اسلام شهر', '3824'];
                cities[52] = ['مروزبهرام', '3825'];
                cities[53] = ['گلدسته', '3826'];
                cities[54] = ['صالح آباد', '3827'];
                cities[55] = ['واوان', '3828'];
                cities[56] = ['شاتره', '3829'];
                cities[57] = ['میان آباد', '3830'];
                cities[58] = ['چهاردانگه', '3831'];
                cities[59] = ['فخرایران', '3832'];
                cities[60] = ['احمدآبادمصدق', '3833'];
                cities[61] = ['نجم آباد', '3834'];
                cities[62] = ['تنگمان', '3835'];
                cities[63] = ['سعیدآباد', '3836'];
                cities[64] = ['هیو', '3837'];
                cities[65] = ['حومه گلندوک', '3838'];
                cities[66] = ['اوشان', '3839'];
                cities[67] = ['میگون', '3840'];
                cities[68] = ['فشم', '3841'];
                cities[69] = ['لوسان بزرگ', '3842'];
                cities[70] = ['شهریاربردآباد', '3843'];
                cities[71] = ['قاسم آبادقندیشاد', '3844'];
                cities[72] = ['باغستان', '3845'];
                cities[73] = ['شهرآباد', '3846'];
                cities[74] = ['شاهدشهر', '3847'];
                cities[75] = ['ملارد', '3848'];
                cities[76] = ['لم آباد', '3849'];
                cities[77] = ['خسروآباد', '3786'];
                cities[78] = ['بومهن', '3787'];
                cities[79] = ['شهرجدیدپردیس', '3788'];
                cities[80] = ['خرمدشت', '3789'];
                cities[81] = ['باقر شهر', '3790'];
                cities[82] = ['جعفرآباد', '3791'];
                cities[83] = ['مرقدامام', '3792'];
                cities[84] = ['کهریزک', '3793'];
                cities[85] = ['تورقوزآباد', '3794'];
                cities[86] = ['شورآباد', '3795'];
                cities[87] = ['قمصر', '3796'];
                cities[88] = ['حسن آباد', '3797'];
                cities[89] = ['شمس آباد', '3798'];
                cities[90] = ['ابراهیم آباد', '3799'];
                cities[91] = ['چرمسازی سالاریه', '3800'];
                cities[92] = ['قلعه محمدعلیخان', '3801'];
                cities[93] = ['فرودگاه امام خمینی', '3802'];
                cities[94] = ['وهن آباد', '3803'];
                cities[95] = ['قلعه نوخالصه', '3804'];
                cities[96] = ['گل تپه کبیر', '3805'];
                cities[97] = ['محمودآبادپیرزاد', '3806'];
                cities[98] = ['فرون آباد', '3807'];
                cities[99] = ['خاورشهر', '3808'];
                cities[100] = ['اسلام آباد', '3809'];
                cities[101] = ['لپهزنگ', '3810'];
                cities[102] = ['قیام دشت', '3811'];
                cities[103] = ['قرچحصار', '3812'];
                cities[104] = ['خلاریز', '3813'];
                cities[105] = ['سوهانک', '3814'];
                cities[106] = ['پس قلعه', '3815'];
                cities[107] = ['درکه', '3816'];
                cities[108] = ['ادران', '3817'];
                cities[109] = ['آسارا', '3818'];
                cities[110] = ['نساء', '3819'];
                cities[111] = ['پلنگ آباد', '3820'];
                cities[112] = ['شهرقدس(مویز)', '4003'];
                cities[113] = ['اندیشه', '4004'];
                cities[114] = ['مارلیک', '4005'];
                cities[115] = ['نصیرآباد', '4006'];
                cities[116] = ['رزگان', '4007'];
                cities[117] = ['گلمه', '4008'];
                cities[118] = ['پرند', '4009'];
                cities[119] = ['سلطان آباد', '4010'];
                cities[120] = ['گلستان', '4011'];
                cities[121] = ['اسماعیل آباد', '4012'];
                cities[122] = ['اکبرآباد', '4013'];
                cities[123] = ['نصیرآبادقاجار', '4014'];
                cities[124] = ['منجیل آباد', '4015'];
                cities[125] = ['جابان', '4109'];
                cities[126] = ['رودهن', '4110'];
                cities[127] = ['گیلاوند', '4111'];
                cities[128] = ['آبعلی', '4112'];
                cities[129] = ['کیلان', '4113'];
                cities[130] = ['آبسرد', '4114'];
                cities[131] = ['سربندان', '4115'];
                cities[132] = ['مشاء', '4116'];
                cities[133] = ['مراء', '4117'];
                cities[134] = ['هرانده', '4118'];
                cities[135] = ['درده', '4119'];
                cities[136] = ['حصارین', '4120'];
                cities[137] = ['ارجمند', '4121'];
                cities[138] = ['امیریه', '4122'];
                cities[139] = ['گرمدره', '4123'];
                cities[140] = ['تهران', '3322'];
                break;

            //گیلان
            case 'GIL':
            case 'GI':
                cities[1] = ['رودبنه', '5607'];
                cities[2] = ['آبکنار', '3636'];
                cities[3] = ['خمام', '3637'];
                cities[4] = ['فومن', '3638'];
                cities[5] = ['صومعه سرا', '3639'];
                cities[6] = ['هشتپر ـ طوالش', '3640'];
                cities[7] = ['ماسال', '3641'];
                cities[8] = ['آستارا', '3642'];
                cities[9] = ['سیاهکل', '3643'];
                cities[10] = ['آستانه اشرفیه', '3644'];
                cities[11] = ['منجیل', '3645'];
                cities[12] = ['رودبار', '3646'];
                cities[13] = ['لنگرود', '3647'];
                cities[14] = ['رودسر', '3648'];
                cities[15] = ['کلاچای', '3649'];
                cities[16] = ['کپورچال', '4124'];
                cities[17] = ['جیرهنده لشت نشا', '4125'];
                cities[18] = ['لیجارکی', '4126'];
                cities[19] = ['سنگر', '4127'];
                cities[20] = ['اسلام آباد', '4128'];
                cities[21] = ['سراوان', '4129'];
                cities[22] = ['خشک بیجار', '4130'];
                cities[23] = ['لشت نشا', '4131'];
                cities[24] = ['پیربست لولمان', '4132'];
                cities[25] = ['خاچکین', '4133'];
                cities[26] = ['کوچصفهان', '4134'];
                cities[27] = ['بلسبنه', '4135'];
                cities[28] = ['چاپارخانه', '4136'];
                cities[29] = ['جیرکویه', '4137'];
                cities[30] = ['لولمان', '4138'];
                cities[31] = ['شفت', '4139'];
                cities[32] = ['ملاسرا', '4140'];
                cities[33] = ['چوبر', '4141'];
                cities[34] = ['ماسوله', '4142'];
                cities[35] = ['گشت', '4143'];
                cities[36] = ['احمد سرگوراب', '4144'];
                cities[37] = ['مرجقل', '4145'];
                cities[38] = ['گورابزرمیخ', '4146'];
                cities[39] = ['طاهر گوداب', '4147'];
                cities[40] = ['ضیابر', '4148'];
                cities[41] = ['مرکیه', '4149'];
                cities[42] = ['هنده خاله', '4150'];
                cities[43] = ['نوخاله اکبر', '4151'];
                cities[44] = ['بازاراسالم', '4152'];
                cities[45] = ['شیلهوشت', '4153'];
                cities[46] = ['جوکندان', '4154'];
                cities[47] = ['لیسار', '4155'];
                cities[48] = ['خطبه سرا', '4156'];
                cities[49] = ['حویق', '4157'];
                cities[50] = ['پلاسی', '4158'];
                cities[51] = ['ویسادار', '4159'];
                cities[52] = ['رضوان شهر', '4160'];
                cities[53] = ['شاندرمن', '4161'];
                cities[54] = ['پرهسر', '4162'];
                cities[55] = ['پلنک پاره', '4163'];
                cities[56] = ['بازارجمعه شاندرمن', '4164'];
                cities[57] = ['اسالم', '4165'];
                cities[58] = ['شیخ محله', '4166'];
                cities[59] = ['ویرمونی', '4167'];
                cities[60] = ['سیبلی', '4168'];
                cities[61] = ['لوندویل', '4169'];
                cities[62] = ['شند', '4170'];
                cities[63] = ['کوتهکومه', '4171'];
                cities[64] = ['حیران علیا', '4172'];
                cities[65] = ['پاشاکی', '4173'];
                cities[66] = ['گرماور', '4174'];
                cities[67] = ['لیش', '4175'];
                cities[68] = ['بادکوسرا', '4176'];
                cities[69] = ['شیرین نسائ', '4177'];
                cities[70] = ['خرارود', '4178'];
                cities[71] = ['دیلمان', '4179'];
                cities[72] = ['لسکوکلایه', '4180'];
                cities[73] = ['کیسم', '4181'];
                cities[74] = ['شیرکوه چهارده', '4182'];
                cities[75] = ['دهشال', '4183'];
                cities[76] = ['کیاشهر', '4184'];
                cities[77] = ['دستک', '4185'];
                cities[78] = ['پرگاپشت مهدیقانی', '4186'];
                cities[79] = ['لوشان', '4187'];
                cities[80] = ['بیورزین', '4188'];
                cities[81] = ['جیرنده', '4189'];
                cities[82] = ['برهسر', '4190'];
                cities[83] = ['ویشان', '4191'];
                cities[84] = ['کلیشم', '4192'];
                cities[85] = ['علی آباد کلشتر', '4193'];
                cities[86] = ['رستم آباد', '4194'];
                cities[87] = ['توتکابن', '4195'];
                cities[88] = ['کلشتر', '4196'];
                cities[89] = ['جوین', '4197'];
                cities[90] = ['اسکلک', '4198'];
                cities[91] = ['کوکنه', '4199'];
                cities[92] = ['سلوش', '4200'];
                cities[93] = ['چمخاله', '4201'];
                cities[94] = ['شلمان', '4202'];
                cities[95] = ['کومله', '4203'];
                cities[96] = ['دیوشل', '4204'];
                cities[97] = ['پروش پایین', '4205'];
                cities[98] = ['اطاقور', '4206'];
                cities[99] = ['قاسم آبادسفلی', '4207'];
                cities[100] = ['حسن سرا', '4208'];
                cities[101] = ['طوللات', '4209'];
                cities[102] = ['رانکوه', '4210'];
                cities[103] = ['چابکسر', '4211'];
                cities[104] = ['جنگسرا', '4212'];
                cities[105] = ['واجارگاه', '4213'];
                cities[106] = ['رحیم آباد', '4214'];
                cities[107] = ['بلترک', '4215'];
                cities[108] = ['املش', '4216'];
                cities[109] = ['پائین زربیجار', '4217'];
                cities[110] = ['کجیر', '4218'];
                cities[111] = ['گرمابدست', '4219'];
                cities[112] = ['شوئیل', '4220'];
                cities[113] = ['پونل', '4221'];
                cities[114] = ['بندرانزلی', '3519'];
                cities[115] = ['لاهیجان', '3520'];
                cities[116] = ['رشت', '3361'];
                break;

            //آذربایجان شرقی
            case 'EAZ':
            case 'AE':
                cities[1] = ['تبریز', '3366'];
                cities[2] = ['میانه', '3527'];
                cities[3] = ['مرند', '3528'];
                cities[4] = ['مراغه', '3529'];
                cities[5] = ['سبلان', '3682'];
                cities[6] = ['شهر جدید سهند', '3683'];
                cities[7] = ['اسکو', '3684'];
                cities[8] = ['سردرود', '3685'];
                cities[9] = ['آذرشهر', '3686'];
                cities[10] = ['شبستر', '3687'];
                cities[11] = ['هریس', '3688'];
                cities[12] = ['هادیشهر', '3689'];
                cities[13] = ['جلفا', '3690'];
                cities[14] = ['اهر', '3691'];
                cities[15] = ['کلیبر', '3692'];
                cities[16] = ['سراب', '3693'];
                cities[17] = ['بستان آباد', '3694'];
                cities[18] = ['عجب شیر', '3695'];
                cities[19] = ['بناب', '3696'];
                cities[20] = ['ملکان', '3697'];
                cities[21] = ['قره اغاج ـ چاراویماق', '3698'];
                cities[22] = ['اغچه ریش', '3699'];
                cities[23] = ['ترک', '4383'];
                cities[24] = ['ترکمانچای', '4384'];
                cities[25] = ['خاتون آباد', '4385'];
                cities[26] = ['شیخدرآباد', '4386'];
                cities[27] = ['قره بلاغ', '4387'];
                cities[28] = ['آق کند', '4388'];
                cities[29] = ['اچاچی', '4389'];
                cities[30] = ['گوندوغدی', '4390'];
                cities[31] = ['پورسخلو', '4391'];
                cities[32] = ['کنگاور', '4392'];
                cities[33] = ['قویوجاق', '4393'];
                cities[34] = ['ارموداق', '4394'];
                cities[35] = ['کهنمو', '4395'];
                cities[36] = ['اربط', '4396'];
                cities[37] = ['خسروشهر', '4397'];
                cities[38] = ['لاهیجان', '4398'];
                cities[39] = ['خاصبان', '4399'];
                cities[40] = ['ایلخچی', '4400'];
                cities[41] = ['سرایده', '4401'];
                cities[42] = ['کجاآباد', '4402'];
                cities[43] = ['خلجان', '4403'];
                cities[44] = ['ینگی اسپران', '4404'];
                cities[45] = ['باسمنج', '4405'];
                cities[46] = ['شادبادمشایخ', '4406'];
                cities[47] = ['کندرود', '4407'];
                cities[48] = ['مایان سفلی', '4408'];
                cities[49] = ['تیمورلو', '4409'];
                cities[50] = ['قدمگاه', '4410'];
                cities[51] = ['ممقان', '4411'];
                cities[52] = ['گوگان', '4412'];
                cities[53] = ['شیرامین', '4413'];
                cities[54] = ['هفت چشمه', '4414'];
                cities[55] = ['امند', '4415'];
                cities[56] = ['خامنه', '4416'];
                cities[57] = ['سیس', '4417'];
                cities[58] = ['صوفیان', '4418'];
                cities[59] = ['شندآباد', '4419'];
                cities[60] = ['تسوج', '4420'];
                cities[61] = ['شرفخانه', '4421'];
                cities[62] = ['مینق', '4422'];
                cities[63] = ['بخشایش ـ کلوانق', '4423'];
                cities[64] = ['سرند', '4424'];
                cities[65] = ['زرنق', '4425'];
                cities[66] = ['بیلوردی', '4426'];
                cities[67] = ['خواجه', '4427'];
                cities[68] = ['گلین قیه', '4428'];
                cities[69] = ['هرزندجدید', '4429'];
                cities[70] = ['بناب جدید ـ مرند', '4430'];
                cities[71] = ['زنوز', '4431'];
                cities[72] = ['دولت آباد', '4432'];
                cities[73] = ['یکان کهریز', '4433'];
                cities[74] = ['یامچی', '4434'];
                cities[75] = ['شجاع', '4435'];
                cities[76] = ['داران', '4436'];
                cities[77] = ['سیهرود', '4437'];
                cities[78] = ['نوجهمهر', '4438'];
                cities[79] = ['کشک سرای', '4439'];
                cities[80] = ['خاروانا', '4440'];
                cities[81] = ['هوراند', '4441'];
                cities[82] = ['چولقشلاقی', '4442'];
                cities[83] = ['ورگهان', '4443'];
                cities[84] = ['افیل', '4444'];
                cities[85] = ['اذغان', '4445'];
                cities[86] = ['سیهکلان', '4446'];
                cities[87] = ['ورزقان', '4447'];
                cities[88] = ['اقبراز', '4448'];
                cities[89] = ['مولان', '4449'];
                cities[90] = ['خمارلو', '4450'];
                cities[91] = ['عاشقلو', '4451'];
                cities[92] = ['اسکلو', '4452'];
                cities[93] = ['ابشاحمد', '4453'];
                cities[94] = ['یوزبند', '4454'];
                cities[95] = ['کاغذکنان', '4455'];
                cities[96] = ['خداآفرین', '4456'];
                cities[97] = ['کندوان', '4457'];
                cities[98] = ['تیل', '4458'];
                cities[99] = ['وایقان', '4459'];
                cities[100] = ['لاریجان', '4460'];
                cities[101] = ['اسب فروشان', '4461'];
                cities[102] = ['ابرغان', '4462'];
                cities[103] = ['شربیان', '4463'];
                cities[104] = ['مهربان', '4464'];
                cities[105] = ['رازلیق', '4465'];
                cities[106] = ['اغمیون', '4466'];
                cities[107] = ['اردها', '4467'];
                cities[108] = ['قرهچای حاجعلی', '4468'];
                cities[109] = ['قره بابا', '4469'];
                cities[110] = ['سعیدآباد', '4470'];
                cities[111] = ['الانق', '4471'];
                cities[112] = ['کردکندی', '4472'];
                cities[113] = ['قرهچمن', '4473'];
                cities[114] = ['ورجوی', '4474'];
                cities[115] = ['گلتپه', '4475'];
                cities[116] = ['خراجو', '4476'];
                cities[117] = ['داشاتان', '4477'];
                cities[118] = ['داش بلاغ بازار', '4478'];
                cities[119] = ['صومعه', '4479'];
                cities[120] = ['علویان', '4480'];
                cities[121] = ['شیراز', '4481'];
                cities[122] = ['خضرلو', '4482'];
                cities[123] = ['یگنجه', '4483'];
                cities[124] = ['مهماندار', '4484'];
                cities[125] = ['خانیان', '4485'];
                cities[126] = ['دانالو', '4486'];
                cities[127] = ['رحمانلو', '4487'];
                cities[128] = ['زاوشت', '4488'];
                cities[129] = ['القو', '4489'];
                cities[130] = ['روشت بزرگ', '4490'];
                cities[131] = ['خوشه مهر', '4491'];
                cities[132] = ['زوارق', '4492'];
                cities[133] = ['خانه برق', '4493'];
                cities[134] = ['لکلر', '4494'];
                cities[135] = ['بایقوت', '4495'];
                cities[136] = ['اروق', '4496'];
                cities[137] = ['اقمنار', '4497'];
                cities[138] = ['لیلان', '4498'];
                cities[139] = ['طوراغائی', '4499'];
                cities[140] = ['هشترود', '4500'];
                cities[141] = ['اوشندل', '4501'];
                cities[142] = ['علی آبادعلیا', '4502'];
                cities[143] = ['ذوالبین', '4503'];
                cities[144] = ['نظرکهریزی', '4504'];
                cities[145] = ['آتش بیگ', '4505'];
                cities[146] = ['سلوک', '4506'];
                cities[147] = ['نصیرآبادسفلی', '4507'];
                cities[148] = ['ارسگنای سفلی', '4508'];
                cities[149] = ['سلطان آباد', '4509'];
                cities[150] = ['قله حسین خان', '4510'];
                cities[151] = ['ذاکر کندی', '4511'];
                cities[152] = ['قوچ احمد', '4512'];
                cities[153] = ['اغزیارت', '4513'];
                cities[154] = ['تیکمه داش', '5576'];
                break;

            //خوزستان
            case 'KHZ':
            case 'KZ':
                cities[1] = ['اهواز', '3374'];
                cities[2] = ['آبادان', '3538'];
                cities[3] = ['خرمشهر', '3539'];
                cities[4] = ['اروندکنار', '3075'];
                cities[5] = ['ملاثانی', '3076'];
                cities[6] = ['ماهشهر', '3077'];
                cities[7] = ['آغاجاری', '3078'];
                cities[8] = ['رامهرمز', '3079'];
                cities[9] = ['ایذه', '3080'];
                cities[10] = ['شادگان', '3081'];
                cities[11] = ['سوسنگرد ـ دشت آزادگان', '3082'];
                cities[12] = ['شوشتر', '3083'];
                cities[13] = ['دزفول', '3084'];
                cities[14] = ['شوش', '3085'];
                cities[15] = ['اندیمشک', '3086'];
                cities[16] = ['مسجد سلیمان', '3087'];
                cities[17] = ['شیبان', '5597'];
                cities[18] = ['ویس', '5598'];
                cities[19] = ['زهره', '5599'];
                cities[20] = ['شرافت', '5600'];
                cities[21] = ['سالند', '5601'];
                cities[22] = ['فیاضی', '4614'];
                cities[23] = ['تنگه یک', '4615'];
                cities[24] = ['چویبده', '4616'];
                cities[25] = ['نهر سلیم', '4617'];
                cities[26] = ['فرخپیـسعدونی', '4618'];
                cities[27] = ['ابطر', '4619'];
                cities[28] = ['عیندو', '4620'];
                cities[29] = ['حمیدیه', '4621'];
                cities[30] = ['امالطیر', '4622'];
                cities[31] = ['خزامی', '4623'];
                cities[32] = ['قلعه چنعال', '4624'];
                cities[33] = ['کریت برومی', '4625'];
                cities[34] = ['نحیزانیه', '4626'];
                cities[35] = ['چمکلگه', '4627'];
                cities[36] = ['چمران ـ شهرک طالقانی', '4628'];
                cities[37] = ['بندر امام خمینی', '4629'];
                cities[38] = ['بندرامام خمینی', '4630'];
                cities[39] = ['صالح شهر', '4631'];
                cities[40] = ['اسیاب', '4632'];
                cities[41] = ['هندیجان', '4633'];
                cities[42] = ['بهبهان', '4634'];
                cities[43] = ['گروه پدافندهوائی', '4635'];
                cities[44] = ['ده ابراهیم', '4636'];
                cities[45] = ['کردستان بزرگ', '4637'];
                cities[46] = ['منصوریه', '4638'];
                cities[47] = ['سردشت', '4639'];
                cities[48] = ['امیدیه', '4640'];
                cities[49] = ['میانکوه', '4641'];
                cities[50] = ['رودزردماشین', '4642'];
                cities[51] = ['کیم', '4643'];
                cities[52] = ['نفت سفید', '4644'];
                cities[53] = ['رمیله علیا', '4645'];
                cities[54] = ['رامشیر', '4646'];
                cities[55] = ['جایزان', '4647'];
                cities[56] = ['دره تونمنمی', '4648'];
                cities[57] = ['نورآباد', '4649'];
                cities[58] = ['صیدون', '4650'];
                cities[59] = ['باغ ملک', '4651'];
                cities[60] = ['قلعه تل', '4652'];
                cities[61] = ['چنارستان', '4653'];
                cities[62] = ['پشت پیان', '4654'];
                cities[63] = ['دهدز', '4655'];
                cities[64] = ['عبودی', '4656'];
                cities[65] = ['دارخوین', '4657'];
                cities[66] = ['درویشی', '4658'];
                cities[67] = ['بوزیسیف', '4659'];
                cities[68] = ['مینوشهر', '4660'];
                cities[69] = ['حفارشرقی', '4661'];
                cities[70] = ['مقاومت', '4662'];
                cities[71] = ['برویهیک', '4663'];
                cities[72] = ['ابوحمیظه', '4664'];
                cities[73] = ['هویزه', '4665'];
                cities[74] = ['یزدنو', '4666'];
                cities[75] = ['رفیع', '4667'];
                cities[76] = ['بستان', '4668'];
                cities[77] = ['سیدعباس', '4669'];
                cities[78] = ['گوریه', '4670'];
                cities[79] = ['جنتمکان', '4671'];
                cities[80] = ['گتوند', '4672'];
                cities[81] = ['پیردالو', '4673'];
                cities[82] = ['شهرکنورمحمدی', '4674'];
                cities[83] = ['گاومیش آباد', '4675'];
                cities[84] = ['عربحسن', '4676'];
                cities[85] = ['صفی آباد', '4677'];
                cities[86] = ['شهرک امام خمینی', '4678'];
                cities[87] = ['مهمانشهراصفهانی', '4679'];
                cities[88] = ['بردگوری', '4680'];
                cities[89] = ['نبات', '4681'];
                cities[90] = ['چلون', '4682'];
                cities[91] = ['شرکت کاغذسازی پار', '4683'];
                cities[92] = ['مزرعه یک', '4684'];
                cities[93] = ['خرج راضی احمد', '4685'];
                cities[94] = ['الوانی', '4686'];
                cities[95] = ['همله تیمور', '4687'];
                cities[96] = ['شهرک بهرام', '4688'];
                cities[97] = ['صالحمشطت', '4689'];
                cities[98] = ['شهرک انصار', '4690'];
                cities[99] = ['قلعه خواجو', '4691'];
                cities[100] = ['حسینیه', '4692'];
                cities[101] = ['کلگهدره2', '4693'];
                cities[102] = ['تلهزنگ', '4694'];
                cities[103] = ['چمکلگ', '4695'];
                cities[104] = ['عنبر', '4696'];
                cities[105] = ['لالی', '4697'];
                cities[106] = ['دره بوری', '4698'];
                cities[107] = ['هفتگل', '4699'];
                cities[108] = ['کوشکک کوشک', '4700'];
                cities[109] = ['قلعه خواجه ـ اندیکا', '4701'];
                cities[110] = ['گلگیر', '4702'];
                break;

            //فارس
            case 'FRS':
            case 'FA':
                cities[1] = ['بهمن', '5574'];
                cities[2] = ['بندامیر', '4808'];
                cities[3] = ['اکبرآباد', '4809'];
                cities[4] = ['خیرآبادتوللی', '4810'];
                cities[5] = ['داریان', '4811'];
                cities[6] = ['کچل آباد', '4812'];
                cities[7] = ['گشنکان', '4813'];
                cities[8] = ['کمجان', '4814'];
                cities[9] = ['شورجه', '4815'];
                cities[10] = ['مهارلونو', '4816'];
                cities[11] = ['کوهنجان', '4817'];
                cities[12] = ['سلطان آباد', '4818'];
                cities[13] = ['تفیهان', '4819'];
                cities[14] = ['طسوج', '4820'];
                cities[15] = ['اکبرآبادکوار', '4821'];
                cities[16] = ['مظفری', '4822'];
                cities[17] = ['کوشک بیدک', '4823'];
                cities[18] = ['فتح آباد', '4824'];
                cities[19] = ['دهشیب', '4825'];
                cities[20] = ['چنارراهدار', '4826'];
                cities[21] = ['موردراز', '4827'];
                cities[22] = ['کوشک بیبیچه', '4828'];
                cities[23] = ['کلاتون', '4829'];
                cities[24] = ['کلانی', '4830'];
                cities[25] = ['کمارج', '4831'];
                cities[26] = ['مهبودی علیا', '4832'];
                cities[27] = ['وراوی', '4833'];
                cities[28] = ['حکیم باشی', '4834'];
                cities[29] = ['کنارتخته', '4835'];
                cities[30] = ['خشت', '4836'];
                cities[31] = ['انارستان', '4837'];
                cities[32] = ['نودان', '4838'];
                cities[33] = ['مهرنجان', '4839'];
                cities[34] = ['جره', '4840'];
                cities[35] = ['بالاده', '4841'];
                cities[36] = ['لپوئی', '4842'];
                cities[37] = ['کام فیروز', '4843'];
                cities[38] = ['خرامه', '4844'];
                cities[39] = ['سروستان', '4845'];
                cities[40] = ['کوار', '4846'];
                cities[41] = ['کدسنج', '4847'];
                cities[42] = ['ماهسرم علیا', '4848'];
                cities[43] = ['گویم', '4849'];
                cities[44] = ['کلاه سیاه', '4850'];
                cities[45] = ['بابامیر', '4851'];
                cities[46] = ['آهنگری', '4852'];
                cities[47] = ['پیرین', '4853'];
                cities[48] = ['حسین آبادرستم', '4854'];
                cities[49] = ['مصیری ـ رستم', '4855'];
                cities[50] = ['میشان', '4856'];
                cities[51] = ['بهرغان', '4857'];
                cities[52] = ['بیضا', '4858'];
                cities[53] = ['دهپاگا', '4859'];
                cities[54] = ['کمهر', '4860'];
                cities[55] = ['راشک علیا', '4861'];
                cities[56] = ['هرایجان', '4862'];
                cities[57] = ['بانش', '4863'];
                cities[58] = ['کوشک', '4864'];
                cities[59] = ['خانیمن', '4865'];
                cities[60] = ['سعادت شهر ـ پاسارگاد', '4866'];
                cities[61] = ['قادرآباد', '4867'];
                cities[62] = ['ارسنجان', '4868'];
                cities[63] = ['سیدان', '4869'];
                cities[64] = ['زنگی آباد', '4870'];
                cities[65] = ['کوشکک', '4871'];
                cities[66] = ['خنجشت', '4872'];
                cities[67] = ['امامزاده اسماعیل', '4873'];
                cities[68] = ['حسن آباد', '4874'];
                cities[69] = ['آس پاس', '4875'];
                cities[70] = ['سده', '4876'];
                cities[71] = ['بازیچه', '4877'];
                cities[72] = ['دژکرد', '4878'];
                cities[73] = ['شهرمیان', '4879'];
                cities[74] = ['صغاد', '4880'];
                cities[75] = ['بوانات', '4881'];
                cities[76] = ['صفاشهر ـ خرم بید', '4882'];
                cities[77] = ['خرمی', '4883'];
                cities[78] = ['علاءمرودشت', '4884'];
                cities[79] = ['فیشور', '4885'];
                cities[80] = ['کازرون', '3545'];
                cities[81] = ['جهرم', '3546'];
                cities[82] = ['اردکان ـ سپیدان', '3710'];
                cities[83] = ['مرودشت', '3711'];
                cities[84] = ['اقلید', '3712'];
                cities[85] = ['آباده', '3713'];
                cities[86] = ['لار ـ لارستان', '3714'];
                cities[87] = ['گراش', '3715'];
                cities[88] = ['استهبان', '3716'];
                cities[89] = ['فسا', '3717'];
                cities[90] = ['فیروزآباد', '3718'];
                cities[91] = ['داراب', '3719'];
                cities[92] = ['نی ریز', '3720'];
                cities[93] = ['شیراز', '3384'];
                cities[94] = ['بوانات(سوریان)', '3260'];
                cities[95] = ['سورمق', '3261'];
                cities[96] = ['ایزدخواست', '3262'];
                cities[97] = ['حیدرآباد', '3263'];
                cities[98] = ['ابدون', '3264'];
                cities[99] = ['باب انار', '3265'];
                cities[100] = ['بندبست', '3266'];
                cities[101] = ['آبگرم مینا', '3267'];
                cities[102] = ['اوز', '3268'];
                cities[103] = ['لامرد', '3269'];
                cities[104] = ['جویم', '3270'];
                cities[105] = ['بنارویه', '3271'];
                cities[106] = ['لطیفی', '3272'];
                cities[107] = ['بیرم', '3273'];
                cities[108] = ['اشکنان', '3274'];
                cities[109] = ['کهنه', '3275'];
                cities[110] = ['خنج', '3276'];
                cities[111] = ['مهر', '3277'];
                cities[112] = ['رونیز', '3278'];
                cities[113] = ['بنوان', '3279'];
                cities[114] = ['ایج', '3280'];
                cities[115] = ['درب قلعه', '3281'];
                cities[116] = ['قلعه دمتنگ', '3282'];
                cities[117] = ['قطب آباد', '3283'];
                cities[118] = ['دنیان', '3284'];
                cities[119] = ['سروو', '3285'];
                cities[120] = ['مانیان', '3286'];
                cities[121] = ['بهجان', '3287'];
                cities[122] = ['کوشک قاضی', '3288'];
                cities[123] = ['خیرآباد جنگل', '3289'];
                cities[124] = ['نوبندگان', '3290'];
                cities[125] = ['ششده', '3291'];
                cities[126] = ['قاسم آباد سفلی', '3292'];
                cities[127] = ['زاهدشهر', '3293'];
                cities[128] = ['میانده', '3294'];
                cities[129] = ['صحرارود', '3295'];
                cities[130] = ['بایگان', '3296'];
                cities[131] = ['مبارک آباد', '3297'];
                cities[132] = ['میمند', '3298'];
                cities[133] = ['افزر', '3299'];
                cities[134] = ['قیر', '3300'];
                cities[135] = ['فراشبند', '3301'];
                cities[136] = ['دهرم', '3302'];
                cities[137] = ['چوگان', '3303'];
                cities[138] = ['مادوان', '3304'];
                cities[139] = ['ماهسالاری', '3305'];
                cities[140] = ['رستاق', '3306'];
                cities[141] = ['دوبران', '3307'];
                cities[142] = ['حاجی آباد ـ زرین دشت', '3308'];
                cities[143] = ['فدامی', '3309'];
                cities[144] = ['چمن مروارید', '3310'];
                cities[145] = ['جنت شهر(دهخیر)', '3311'];
                cities[146] = ['لای حنا', '3312'];
                cities[147] = ['آباده طشک', '3313'];
                cities[148] = ['قطاربنه', '3314'];
                cities[149] = ['دهکرگی', '3315'];
                cities[150] = ['جعفرآباد', '3316'];
                cities[151] = ['مشکان', '3317'];
                cities[152] = ['قطرویه', '3318'];
                cities[153] = ['هرگان', '3319'];
                cities[154] = ['خاوران', '3320'];
                cities[155] = ['خفر', '3321'];
                cities[156] = ['قائمیه', '3123'];
                cities[157] = ['زرقان', '3124'];
                cities[158] = ['نورآباد ـ ممسنی', '3125'];
                break;

            //اصفهان
            case 'ESF':
            case 'IS':
                cities[1] = ['نوش آباد', '5577'];
                cities[2] = ['بهارستان', '5578'];
                cities[3] = ['نصر آباد', '5579'];
                cities[4] = ['سگزی', '5580'];
                cities[5] = ['تودشک', '5581'];
                cities[6] = ['بادرود', '5582'];
                cities[7] = ['خالدآباد', '5583'];
                cities[8] = ['کوشک', '5584'];
                cities[9] = ['نیاسر', '5585'];
                cities[10] = ['ابریشم', '5586'];
                cities[11] = ['افوس', '5587'];
                cities[12] = ['رهنان', '5575'];
                cities[13] = ['خوراسگان', '5514'];
                cities[14] = ['دستجاء', '5515'];
                cities[15] = ['شهرک صنعتی مورچ', '5516'];
                cities[16] = ['پاسگاه امام جعفر', '5517'];
                cities[17] = ['پالایشگاه اصفهان', '5518'];
                cities[18] = ['کلهرود', '5519'];
                cities[19] = ['گرگاب', '5520'];
                cities[20] = ['دستگردوبرخوار', '5521'];
                cities[21] = ['گز', '5522'];
                cities[22] = ['خورزوق', '5523'];
                cities[23] = ['حبیب آباد', '5524'];
                cities[24] = ['موته', '5525'];
                cities[25] = ['وزوان', '5526'];
                cities[26] = ['لای بید', '5527'];
                cities[27] = ['رباط آقاکمال', '5528'];
                cities[28] = ['خسروآباد', '5529'];
                cities[29] = ['کمشچه', '5530'];
                cities[30] = ['جندق', '5531'];
                cities[31] = ['فرخی', '5532'];
                cities[32] = ['مزیک', '5533'];
                cities[33] = ['مهرجان', '5534'];
                cities[34] = ['بیاضیه', '5535'];
                cities[35] = ['چوپانان', '5536'];
                cities[36] = ['بلان', '5537'];
                cities[37] = ['محمدآباد', '5538'];
                cities[38] = ['هرند', '5539'];
                cities[39] = ['ورزنه', '5540'];
                cities[40] = ['قهجاورستان', '5541'];
                cities[41] = ['نیک آباد', '5542'];
                cities[42] = ['اژیه', '5543'];
                cities[43] = ['حسن اباد', '5544'];
                cities[44] = ['کچومثقال', '5545'];
                cities[45] = ['ظفرقند', '5546'];
                cities[46] = ['نهوج', '5547'];
                cities[47] = ['نیسیان', '5548'];
                cities[48] = ['ومکان', '5549'];
                cities[49] = ['همسار', '5550'];
                cities[50] = ['فسخود', '5551'];
                cities[51] = ['نوداز', '5552'];
                cities[52] = ['اشکستان', '5553'];
                cities[53] = ['کجان', '5554'];
                cities[54] = ['نیستانک', '5555'];
                cities[55] = ['انارک', '5556'];
                cities[56] = ['بافران', '5557'];
                cities[57] = ['تیرانچی', '5558'];
                cities[58] = ['اصغرآباد', '5559'];
                cities[59] = ['دستگردفداره', '5560'];
                cities[60] = ['قرطمان', '5561'];
                cities[61] = ['جعفرآباد', '5562'];
                cities[62] = ['مهاباد', '5563'];
                cities[63] = ['درقه', '5564'];
                cities[64] = ['شهراب', '5565'];
                cities[65] = ['تورزن', '5566'];
                cities[66] = ['کریم آباد', '5567'];
                cities[67] = ['تلک آباد', '5568'];
                cities[68] = ['موغار', '5569'];
                cities[69] = ['خوانسارک', '5570'];
                cities[70] = ['پیربکران', '5571'];
                cities[71] = ['کلیشادوسودرجان', '5572'];
                cities[72] = ['جوچی', '5573'];
                cities[73] = ['کرمگان', '5086'];
                cities[74] = ['باغکومه', '5087'];
                cities[75] = ['سهروفیروزان', '5088'];
                cities[76] = ['لارگان', '5089'];
                cities[77] = ['اشترجان', '5090'];
                cities[78] = ['گارماسه', '5091'];
                cities[79] = ['حسین آبادازران', '5092'];
                cities[80] = ['شیردوان', '5093'];
                cities[81] = ['جوجیل', '5094'];
                cities[82] = ['ورنامخواست', '5095'];
                cities[83] = ['سده لنجان', '5096'];
                cities[84] = ['چرمهین', '5097'];
                cities[85] = ['باغ بهارداران', '5098'];
                cities[86] = ['نوگوران', '5099'];
                cities[87] = ['چمگردان', '5100'];
                cities[88] = ['کرجگان', '5101'];
                cities[89] = ['دیزیچه', '5102'];
                cities[90] = ['زیبا شهر', '5103'];
                cities[91] = ['باغملک', '5104'];
                cities[92] = ['دهسرخ', '5105'];
                cities[93] = ['پلی اکریل', '5106'];
                cities[94] = ['فولادمبارکه', '5107'];
                cities[95] = ['کرکوند', '5108'];
                cities[96] = ['زاینده رود', '5109'];
                cities[97] = ['چمنور', '5110'];
                cities[98] = ['کجرثیه', '5111'];
                cities[99] = ['اشیان', '5112'];
                cities[100] = ['طالخونچه', '5113'];
                cities[101] = ['نکوآباد', '5114'];
                cities[102] = ['رضوان شهر', '5115'];
                cities[103] = ['ورپشت', '5116'];
                cities[104] = ['عسگران', '5117'];
                cities[105] = ['گندان', '5118'];
                cities[106] = ['عزیزآباد', '5119'];
                cities[107] = ['میرآباد', '5120'];
                cities[108] = ['حاجی آباد', '5121'];
                cities[109] = ['خیرآباد', '5122'];
                cities[110] = ['اشن', '5123'];
                cities[111] = ['خونداب', '5124'];
                cities[112] = ['حسین آباد', '5125'];
                cities[113] = ['غرغن', '5126'];
                cities[114] = ['دامنه', '5127'];
                cities[115] = ['بوئین ومیاندشت', '5128'];
                cities[116] = ['زرنه', '5129'];
                cities[117] = ['بلطاق', '5130'];
                cities[118] = ['کرچ', '5131'];
                cities[119] = ['قره بلطاق', '5132'];
                cities[120] = ['مجتمع مسکونی سدزا', '5133'];
                cities[121] = ['مشهد کاوه', '5134'];
                cities[122] = ['اسکندری برآفتاب', '5135'];
                cities[123] = ['رزوه', '5136'];
                cities[124] = ['نهرخلج', '5137'];
                cities[125] = ['چاه غلامرضارحیمی', '5138'];
                cities[126] = ['اورگان', '5139'];
                cities[127] = ['گلدشت', '5140'];
                cities[128] = ['جوزدان', '5141'];
                cities[129] = ['کهریزسنگ', '5142'];
                cities[130] = ['نهضت آباد', '5143'];
                cities[131] = ['قلعسرخ', '5144'];
                cities[132] = ['اسلام ابادموگوئی', '5145'];
                cities[133] = ['مصیر', '5146'];
                cities[134] = ['برف انبار', '5147'];
                cities[135] = ['قمشلو', '5148'];
                cities[136] = ['قمبوان', '5149'];
                cities[137] = ['مهیار', '5150'];
                cities[138] = ['پیرزان', '5151'];
                cities[139] = ['منوچهرآباد', '5152'];
                cities[140] = ['شهرک شیمیائی رازی', '5153'];
                cities[141] = ['همگین', '5154'];
                cities[142] = ['موسی آباد', '5155'];
                cities[143] = ['کهرویه', '5156'];
                cities[144] = ['قصرچم', '5157'];
                cities[145] = ['اسلام آباد', '5158'];
                cities[146] = ['امین آباد', '5159'];
                cities[147] = ['مقصودبیک', '5160'];
                cities[148] = ['سولار', '5161'];
                cities[149] = ['منظریه', '5162'];
                cities[150] = ['گرموک', '5163'];
                cities[151] = ['مزرعه بانه', '5164'];
                cities[152] = ['هست', '5165'];
                cities[153] = ['ونک', '5166'];
                cities[154] = ['قبرکیفا', '5167'];
                cities[155] = ['کهنگان', '5168'];
                cities[156] = ['کمه', '5169'];
                cities[157] = ['مورک', '5170'];
                cities[158] = ['چهارراه', '5171'];
                cities[159] = ['دهنساء سفلی', '5172'];
                cities[160] = ['اغداش', '5173'];
                cities[161] = ['چشمه رحمان', '5174'];
                cities[162] = ['ورق', '5175'];
                cities[163] = ['سعادت آباد', '5176'];
                cities[164] = ['فتح آباد', '5177'];
                cities[165] = ['سنسن', '5178'];
                cities[166] = ['کامو', '5179'];
                cities[167] = ['دهریز', '5180'];
                cities[168] = ['رجق', '5181'];
                cities[169] = ['ابشیرین', '5182'];
                cities[170] = ['نشلج', '5183'];
                cities[171] = ['مشکات', '5184'];
                cities[172] = ['سفید شهر', '5185'];
                cities[173] = ['مزرعه صدر', '5186'];
                cities[174] = ['ابوزیدآباد', '5187'];
                cities[175] = ['کاغذی', '5188'];
                cities[176] = ['قهرود', '5189'];
                cities[177] = ['جوشقان و کامو', '5190'];
                cities[178] = ['برزک', '5191'];
                cities[179] = ['اسحق آباد', '5192'];
                cities[180] = ['وادقان', '5193'];
                cities[181] = ['اذران', '5194'];
                cities[182] = ['طرق', '5195'];
                cities[183] = ['اریسمان', '5196'];
                cities[184] = ['ابیانه', '5197'];
                cities[185] = ['اوره', '5198'];
                cities[186] = ['کامه', '5199'];
                cities[187] = ['ملازجان', '5200'];
                cities[188] = ['سعیدآباد', '5201'];
                cities[189] = ['مرغ', '5202'];
                cities[190] = ['قرغن', '5203'];
                cities[191] = ['کوچری', '5204'];
                cities[192] = ['کلوچان', '5205'];
                cities[193] = ['گلشهر', '5206'];
                cities[194] = ['وداغ', '5207'];
                cities[195] = ['زرنجان', '5208'];
                cities[196] = ['وانشان', '5209'];
                cities[197] = ['تیکن', '5210'];
                cities[198] = ['سنگ سفید', '5211'];
                cities[199] = ['رحمت آباد', '5212'];
                cities[200] = ['خمپیچ', '5213'];
                cities[201] = ['مهرآباد', '5214'];
                cities[202] = ['تیدجان', '5215'];
                cities[203] = ['خشک رود', '5216'];
                cities[204] = ['ویست', '5217'];
                cities[205] = ['سپاهان شهر', '5218'];
                cities[206] = ['شاهین شهر', '3552'];
                cities[207] = ['خمینی شهر', '3553'];
                cities[208] = ['نجف آباد', '3554'];
                cities[209] = ['شهرضا', '3555'];
                cities[210] = ['کاشان', '3556'];
                cities[211] = ['مورچه خورت', '3761'];
                cities[212] = ['دولت آباد', '3762'];
                cities[213] = ['میمه', '3763'];
                cities[214] = ['خور', '3764'];
                cities[215] = ['کوهپایه', '3765'];
                cities[216] = ['اردستان', '3766'];
                cities[217] = ['نائین', '3767'];
                cities[218] = ['درچه', '3768'];
                cities[219] = ['زواره', '3769'];
                cities[220] = ['فلاورجان', '3770'];
                cities[221] = ['قهد ریجان', '3771'];
                cities[222] = ['زرین شهر ـ لنجان', '3772'];
                cities[223] = ['مبارکه', '3773'];
                cities[224] = ['فولادشهر', '3774'];
                cities[225] = ['تیران', '3775'];
                cities[226] = ['دهق', '3776'];
                cities[227] = ['علویچه', '3777'];
                cities[228] = ['داران ـ فریدن', '3778'];
                cities[229] = ['چادگان', '3779'];
                cities[230] = ['ویلاشهر', '3780'];
                cities[231] = ['فریدون شهر', '3781'];
                cities[232] = ['اصفهان', '3386'];
                cities[233] = ['شهرک مجلسی', '2983'];
                cities[234] = ['دهاقان', '2984'];
                cities[235] = ['اسفرجان', '2985'];
                cities[236] = ['سمیرم', '2986'];
                cities[237] = ['حنا', '2987'];
                cities[238] = ['مهرگرد', '2988'];
                cities[239] = ['جوشقان استرک', '2989'];
                cities[240] = ['آران وبیدگل', '2990'];
                cities[241] = ['قمصر', '2991'];
                cities[242] = ['نطنز', '2992'];
                cities[243] = ['گلپایگان', '2993'];
                cities[244] = ['گوگد', '2994'];
                cities[245] = ['خوانسار', '2995'];
                break;

            //خراسان رضوی
            case 'RKH':
            case 'KV':
                cities[1] = ['گیفان بالا', '2832'];
                cities[2] = ['دررود', '3013'];
                cities[3] = ['طرقبه ـ بینالود', '3018'];
                cities[4] = ['چناران', '3019'];
                cities[5] = ['کلات', '3020'];
                cities[6] = ['سرخس', '3021'];
                cities[7] = ['فریمان', '3022'];
                cities[8] = ['مشهد', '3387'];
                cities[9] = ['قزاقی', '2893'];
                cities[10] = ['بام', '2894'];
                cities[11] = ['راهچمن', '2881'];
                cities[12] = ['انداده', '2882'];
                cities[13] = ['نقاب ـ جوین', '2883'];
                cities[14] = ['حکم اباد', '2884'];
                cities[15] = ['برغمد', '2885'];
                cities[16] = ['بلاش اباد', '2886'];
                cities[17] = ['نوده انقلاب', '2887'];
                cities[18] = ['رباط جز', '2888'];
                cities[19] = ['شامکان', '2889'];
                cities[20] = ['تندک', '2890'];
                cities[21] = ['شقان', '3024'];
                cities[22] = ['قوچان', '3025'];
                cities[23] = ['درگز', '3026'];
                cities[24] = ['فیض آباد ـ مه ولات', '3027'];
                cities[25] = ['رشتخوار', '3028'];
                cities[26] = ['کدکن', '3029'];
                cities[27] = ['خواف', '3030'];
                cities[28] = ['تربت جام', '3031'];
                cities[29] = ['صالح آباد', '3032'];
                cities[30] = ['تایباد', '3033'];
                cities[31] = ['داورزن', '3034'];
                cities[32] = ['جغتای', '3035'];
                cities[33] = ['ششتمد', '3036'];
                cities[34] = ['کاشمر', '3037'];
                cities[35] = ['بردسکن', '3038'];
                cities[36] = ['گناباد', '3039'];
                cities[37] = ['خرم ده غربی', '2825'];
                cities[38] = ['امیرآباد', '2827'];
                cities[39] = ['گریوان', '2828'];
                cities[40] = ['بدرانلو', '2829'];
                cities[41] = ['اینچه علیا', '2816'];
                cities[42] = ['امند', '2817'];
                cities[43] = ['کهنه جلگه', '2818'];
                cities[44] = ['یکه سعودعلیا', '2819'];
                cities[45] = ['راستقان', '2820'];
                cities[46] = ['غلامان', '2821'];
                cities[47] = ['اصغرآباد', '2822'];
                cities[48] = ['چمنبید', '2823'];
                cities[49] = ['قاسمخان', '2896'];
                cities[50] = ['رزق اباد', '2897'];
                cities[51] = ['سارمران', '2898'];
                cities[52] = ['روئین', '2899'];
                cities[53] = ['اوندر', '2900'];
                cities[54] = ['ریوش(کوهسرخ)', '2901'];
                cities[55] = ['دهنو', '2902'];
                cities[56] = ['فدافند', '2903'];
                cities[57] = ['خلیل آباد', '2904'];
                cities[58] = ['کندر', '2905'];
                cities[59] = ['بند قرائ', '2906'];
                cities[60] = ['کاسف', '2907'];
                cities[61] = ['کبودان', '2908'];
                cities[62] = ['شفیع اباد', '2909'];
                cities[63] = ['رکناباد', '2910'];
                cities[64] = ['شهرآباد', '2911'];
                cities[65] = ['انابد', '2912'];
                cities[66] = ['میرآباد مازول', '2774'];
                cities[67] = ['فرخک', '2775'];
                cities[68] = ['خرو', '2776'];
                cities[69] = ['قدمگاه', '2777'];
                cities[70] = ['اسحاق آباد', '2778'];
                cities[71] = ['خوجان', '2779'];
                cities[72] = ['عشق آباد', '2780'];
                cities[73] = ['اوارشک', '2781'];
                cities[74] = ['ملک آباد', '2782'];
                cities[75] = ['گورده', '2783'];
                cities[76] = ['شاندیز', '2784'];
                cities[77] = ['طوس سفلی', '2785'];
                cities[78] = ['قرقی سفلی', '2786'];
                cities[79] = ['کنویست', '2787'];
                cities[80] = ['رادکان', '2788'];
                cities[81] = ['سیدآباد', '2789'];
                cities[82] = ['گلبهار', '2790'];
                cities[83] = ['سلوگرد', '2791'];
                cities[84] = ['ارداک', '2792'];
                cities[85] = ['بقمچ', '2793'];
                cities[86] = ['گلمکان', '2794'];
                cities[87] = ['شهرک رضوی', '2795'];
                cities[88] = ['میامی', '2796'];
                cities[89] = ['چاهک', '2797'];
                cities[90] = ['شهر زو', '2798'];
                cities[91] = ['گوش', '2799'];
                cities[92] = ['نریمانی سفلی', '2800'];
                cities[93] = ['تقی آباد', '2801'];
                cities[94] = ['کچولی', '2802'];
                cities[95] = ['شیرتپه', '2803'];
                cities[96] = ['پس کمر', '2804'];
                cities[97] = ['مزداوند', '2805'];
                cities[98] = ['بزنگان', '2806'];
                cities[99] = ['گنبدلی', '2807'];
                cities[100] = ['کندکلی', '2808'];
                cities[101] = ['کته شمشیرسفلی', '2809'];
                cities[102] = ['سنگبست', '2810'];
                cities[103] = ['سفید سنگ', '2811'];
                cities[104] = ['قلندرآباد', '2812'];
                cities[105] = ['فرهادگرد', '2813'];
                cities[106] = ['زرکک', '2814'];
                cities[107] = ['کهنه اوغاز', '2835'];
                cities[108] = ['دوین', '2836'];
                cities[109] = ['گلیان', '2837'];
                cities[110] = ['زاورم', '2838'];
                cities[111] = ['زیارت', '2839'];
                cities[112] = ['رباط', '2840'];
                cities[113] = ['شهرکهنه', '2841'];
                cities[114] = ['قریه شرف', '2842'];
                cities[115] = ['نشتیفان', '2843'];
                cities[116] = ['سنگان', '2844'];
                cities[117] = ['مزن آباد', '2845'];
                cities[118] = ['قاسم آباد', '2846'];
                cities[119] = ['چمن آباد', '2847'];
                cities[120] = ['حسن آباد', '2848'];
                cities[121] = ['سلامی', '2849'];
                cities[122] = ['چشمه گل', '2850'];
                cities[123] = ['سمیع آباد', '2851'];
                cities[124] = ['نیل شهر', '2852'];
                cities[125] = ['احمدآباد صولت', '2853'];
                cities[126] = ['نصرآباد', '2854'];
                cities[127] = ['ابدال آباد', '2855'];
                cities[128] = ['کاریزنو', '2856'];
                cities[129] = ['درزاب علیا', '2857'];
                cities[130] = ['محموداباد', '2858'];
                cities[131] = ['یاقوتین جدید', '2859'];
                cities[132] = ['جنت اباد', '2860'];
                cities[133] = ['موسی اباد', '2861'];
                cities[134] = ['نبی تاک', '2862'];
                cities[135] = ['ازاده', '2863'];
                cities[136] = ['کاریز', '2864'];
                cities[137] = ['درفارون', '2865'];
                cities[138] = ['کرات', '2866'];
                cities[139] = ['مشهدریزه', '2867'];
                cities[140] = ['باخرز', '2868'];
                cities[141] = ['قلعه نو', '2869'];
                cities[142] = ['کوهسفید', '2870'];
                cities[143] = ['مهر', '2871'];
                cities[144] = ['رباط سرپوش', '2872'];
                cities[145] = ['مشکان', '2873'];
                cities[146] = ['نامن', '2874'];
                cities[147] = ['رودآب', '2875'];
                cities[148] = ['بنفج', '2876'];
                cities[149] = ['مزینان', '2877'];
                cities[150] = ['دستوران', '2878'];
                cities[151] = ['ازادوار', '2879'];
                cities[152] = ['نیشابور', '3559'];
                cities[153] = ['تربت حیدریه', '3561'];
                cities[154] = ['سبزوار', '3562'];
                cities[155] = ['چرمه', '5395'];
                cities[156] = ['ارسک', '5396'];
                cities[157] = ['رقه', '5397'];
                cities[158] = ['کرند', '5398'];
                cities[159] = ['اصفاک', '5399'];
                cities[160] = ['نیگان', '5400'];
                cities[161] = ['خانکوک', '5401'];
                cities[162] = ['شاهرخت', '5390'];
                cities[163] = ['دهک', '5384'];
                cities[164] = ['میغان', '5385'];
                cities[165] = ['طبین بالا', '5386'];
                cities[166] = ['بیهود', '5387'];
                cities[167] = ['افریر', '5388'];
                cities[168] = ['گزیک', '5377'];
                cities[169] = ['شاخن', '5378'];
                cities[170] = ['گازار', '5379'];
                cities[171] = ['چاهداشی', '5380'];
                cities[172] = ['چهار فرسخ', '5381'];
                cities[173] = ['توتسک', '5382'];
                cities[174] = ['چهکند', '5368'];
                cities[175] = ['القور', '5369'];
                cities[176] = ['درح', '5370'];
                cities[177] = ['القار', '5371'];
                cities[178] = ['طبس سینا', '5372'];
                cities[179] = ['برون', '5392'];
                cities[180] = ['مصعبی', '5393'];
                cities[181] = ['سلطان آباد', '5594'];
                cities[182] = ['رضویه', '5595'];
                cities[183] = ['همت آباد', '5596'];
                cities[184] = ['دیهوک', '5403'];
                cities[185] = ['کریت', '5404'];
                cities[186] = ['اسفندیار', '5405'];
                cities[187] = ['جوخواه', '5406'];
                cities[188] = ['پیرحاجات', '5407'];
                cities[189] = ['گزو', '5408'];
                cities[190] = ['سربیت', '5409'];
                cities[191] = ['مرزداران', '5410'];
                cities[192] = ['فیروزه ـ تخت جلگه', '5411'];
                cities[193] = ['شوراب', '5312'];
                cities[194] = ['گلبوی سفلی', '5313'];
                cities[195] = ['مبارکه', '5314'];
                cities[196] = ['چکنه', '5315'];
                cities[197] = ['برزنون', '5316'];
                cities[198] = ['فدیشه', '5317'];
                cities[199] = ['بار', '5318'];
                cities[200] = ['یلاک', '5319'];
                cities[201] = ['دیزادیز', '5320'];
                cities[202] = ['جعفرآبادعلیا', '5321'];
                cities[203] = ['شفیع', '5322'];
                cities[204] = ['دوغایی', '5323'];
                cities[205] = ['تیکانلو', '5325'];
                cities[206] = ['جوزان', '5326'];
                cities[207] = ['امام قلی', '5327'];
                cities[208] = ['باجگیران', '5328'];
                cities[209] = ['مایوان', '5329'];
                cities[210] = ['چریرسالت', '5330'];
                cities[211] = ['خرق', '5331'];
                cities[212] = ['حسن آبادلائن نو', '5332'];
                cities[213] = ['لطف آباد', '5333'];
                cities[214] = ['کبکان', '5334'];
                cities[215] = ['چاپشلو', '5335'];
                cities[216] = ['نوخندان', '5336'];
                cities[217] = ['زیندانلو', '5337'];
                cities[218] = ['محمدتقی', '5338'];
                cities[219] = ['سیوکی', '5339'];
                cities[220] = ['مهنه', '5340'];
                cities[221] = ['عبدل آباد', '5341'];
                cities[222] = ['شادمهر', '5342'];
                cities[223] = ['بایک', '5344'];
                cities[224] = ['چخماق', '5345'];
                cities[225] = ['قلعه آقاحسن', '5346'];
                cities[226] = ['زرغری', '5347'];
                cities[227] = ['جنگل', '5348'];
                cities[228] = ['باسفر', '5349'];
                cities[229] = ['دولت آباد ـ زاوه', '5350'];
                cities[230] = ['یک لنگی علیا', '5351'];
                cities[231] = ['کامه سفلی', '5352'];
                cities[232] = ['رودخانه', '5353'];
                cities[233] = ['رباط سنگ', '5354'];
                cities[234] = ['اسدآباد', '5355'];
                cities[235] = ['نسر', '5356'];
                cities[236] = ['درونه', '5357'];
                cities[237] = ['یونسی', '5358'];
                cities[238] = ['بیدخت', '5359'];
                cities[239] = ['گیسوبالا', '5360'];
                cities[240] = ['کاخک', '5361'];
                cities[241] = ['زیبد', '5362'];
                cities[242] = ['بجستان', '5363'];
                cities[243] = ['جزین', '5364'];
                cities[244] = ['ماژان', '5365'];
                cities[245] = ['روبیات', '5366'];
                break;

            //قزوین
            case 'GZN':
            case 'QZ':
                cities[1] = ['قزوین', '3512'];
                cities[2] = ['شهر صنعتی البرز', '3595'];
                cities[3] = ['اقبالیه', '3596'];
                cities[4] = ['الوند ـ البرز', '3597'];
                cities[5] = ['آبیک', '3598'];
                cities[6] = ['بوئین زهرا', '3599'];
                cities[7] = ['َآوج', '3600'];
                cities[8] = ['طالقان', '3601'];
                cities[9] = ['تاکستان', '3602'];
                cities[10] = ['محمدیه', '3603'];
                cities[11] = ['محمود آباد نمونه', '3876'];
                cities[12] = ['بیدستان', '3877'];
                cities[13] = ['الولک', '3878'];
                cities[14] = ['کاکوهستان', '3879'];
                cities[15] = ['فلار', '3880'];
                cities[16] = ['رجائی دشت', '3881'];
                cities[17] = ['معلم کلایه', '3882'];
                cities[18] = ['مینودشت', '3883'];
                cities[19] = ['زوارک', '3884'];
                cities[20] = ['صمغ آباد', '3885'];
                cities[21] = ['ناصرآباد', '3886'];
                cities[22] = ['رشتقون', '3887'];
                cities[23] = ['قشلاق', '3888'];
                cities[24] = ['خاکعلی', '3889'];
                cities[25] = ['لیا', '3890'];
                cities[26] = ['سگزآباد', '3891'];
                cities[27] = ['عصمت آباد', '3892'];
                cities[28] = ['خرم آباد', '3893'];
                cities[29] = ['اسفرورین', '3894'];
                cities[30] = ['شال', '3895'];
                cities[31] = ['دانسفهان', '3896'];
                cities[32] = ['قلعه هاشمخان', '3897'];
                cities[33] = ['گلنجین', '3898'];
                cities[34] = ['استلج', '3899'];
                cities[35] = ['آبگرم', '3900'];
                cities[36] = ['نیارج', '3901'];
                cities[37] = ['حصارولیعصر', '3902'];
                cities[38] = ['ماهین', '3903'];
                cities[39] = ['سیردان', '3904'];
                cities[40] = ['کبح', '3905'];
                cities[41] = ['سیاهپوش', '3906'];
                cities[42] = ['نیارک', '3907'];
                cities[43] = ['آقابابا', '3908'];
                cities[44] = ['خرم دشت', '3909'];
                cities[45] = ['نهاوند', '3910'];
                cities[46] = ['ضیاآباد', '3911'];
                cities[47] = ['حسین آباد', '3912'];
                cities[48] = ['رحیم آباد', '3913'];
                cities[49] = ['یحیی آباد', '3914'];
                cities[50] = ['نیکویه', '3915'];
                cities[51] = ['رازمیان', '3916'];
                cities[52] = ['کوهین', '3917'];
                cities[53] = ['ارداق', '5602'];
                cities[54] = ['نرجه', '5603'];
                break;

            //سمنان
            case 'SM':
            case 'SMN':
                cities[1] = ['خیرآباد', '3918'];
                cities[2] = ['میاندره', '3919'];
                cities[3] = ['رضاآباد', '3920'];
                cities[4] = ['زرطول', '3921'];
                cities[5] = ['عطاری', '3922'];
                cities[6] = ['اهوان', '3923'];
                cities[7] = ['مشیریه', '3924'];
                cities[8] = ['جام', '3925'];
                cities[9] = ['دوزهیر', '3926'];
                cities[10] = ['معدن نمک', '3927'];
                cities[11] = ['نظامی', '3928'];
                cities[12] = ['اسدآباد', '3929'];
                cities[13] = ['لاسجرد', '3930'];
                cities[14] = ['سیدآباد', '3931'];
                cities[15] = ['عبداله آبادپائین', '3932'];
                cities[16] = ['بیابانک', '3933'];
                cities[17] = ['مومن آباد', '3934'];
                cities[18] = ['درجزین', '3935'];
                cities[19] = ['دربند', '3936'];
                cities[20] = ['گلرودبار', '3937'];
                cities[21] = ['آبگرم', '3938'];
                cities[22] = ['افتر', '3939'];
                cities[23] = ['فولاد محله', '3940'];
                cities[24] = ['ده صوفیان', '3941'];
                cities[25] = ['هیکو', '3942'];
                cities[26] = ['چاشم', '3943'];
                cities[27] = ['کردوان', '3944'];
                cities[28] = ['مندولک', '3945'];
                cities[29] = ['داورآباد', '3946'];
                cities[30] = ['ارادان', '3947'];
                cities[31] = ['رامه پائین', '3948'];
                cities[32] = ['بنکوه', '3949'];
                cities[33] = ['کهن آباد', '3950'];
                cities[34] = ['چمن آبادکوروس', '3951'];
                cities[35] = ['کرک', '3952'];
                cities[36] = ['گلستانک', '3953'];
                cities[37] = ['لجران', '3954'];
                cities[38] = ['جودانه', '3955'];
                cities[39] = ['ابراهیم آباد بالا', '3956'];
                cities[40] = ['بکران', '3957'];
                cities[41] = ['کردآباد', '3958'];
                cities[42] = ['نردین', '3959'];
                cities[43] = ['سوداغلن', '3960'];
                cities[44] = ['فرومه', '3961'];
                cities[45] = ['ابرسیج', '3962'];
                cities[46] = ['میغان', '3963'];
                cities[47] = ['قلعه نوخرقان', '3964'];
                cities[48] = ['چهل دختر نظامی', '3965'];
                cities[49] = ['کلاته خیج', '3966'];
                cities[50] = ['نگارمن', '3967'];
                cities[51] = ['ده ملا', '3968'];
                cities[52] = ['رویان', '3969'];
                cities[53] = ['بوشت', '3970'];
                cities[54] = ['سطوه', '3971'];
                cities[55] = ['طرود', '3972'];
                cities[56] = ['مغان', '3973'];
                cities[57] = ['گیور', '3974'];
                cities[58] = ['دستجرد', '3975'];
                cities[59] = ['مسیح آباد', '3976'];
                cities[60] = ['احمدآباد', '3977'];
                cities[61] = ['زمان آباد', '3978'];
                cities[62] = ['سلم رود', '3979'];
                cities[63] = ['جزن', '3980'];
                cities[64] = ['برم', '3981'];
                cities[65] = ['محمدآباد', '3982'];
                cities[66] = ['معصوم آباد', '3983'];
                cities[67] = ['فرات', '3984'];
                cities[68] = ['علیان', '3985'];
                cities[69] = ['عمروان', '3986'];
                cities[70] = ['قوشه', '3987'];
                cities[71] = ['دروار', '3988'];
                cities[72] = ['آستانه', '3989'];
                cities[73] = ['دیباج', '3990'];
                cities[74] = ['طزره', '3991'];
                cities[75] = ['مهماندوست', '3992'];
                cities[76] = ['کلاته ملا', '3993'];
                cities[77] = ['قدرت آباد', '3994'];
                cities[78] = ['علا', '3604'];
                cities[79] = ['آبخوری', '3605'];
                cities[80] = ['سرخه', '3606'];
                cities[81] = ['مهدی شهر', '3607'];
                cities[82] = ['شهمیرزاد', '3608'];
                cities[83] = ['گرمسار', '3609'];
                cities[84] = ['ایوانکی', '3610'];
                cities[85] = ['میامی', '3611'];
                cities[86] = ['بسطام', '3612'];
                cities[87] = ['مجن', '3613'];
                cities[88] = ['بیارجمند', '3614'];
                cities[89] = ['دامغان', '3615'];
                cities[90] = ['امیریه', '3616'];
                cities[91] = ['سمنان', '3513'];
                cities[92] = ['شاهرود', '3514'];
                break;

            //قم
            case 'QHM':
            case 'QM':
                cities[1] = ['قنوات', '3617'];
                cities[2] = ['دستجرد', '3618'];
                cities[3] = ['امیر آباد گنجه', '3995'];
                cities[4] = ['قمرود', '3996'];
                cities[5] = ['کهک', '3997'];
                cities[6] = ['قلعه چم', '3998'];
                cities[7] = ['قاهان', '3999'];
                cities[8] = ['شهر جعفریه', '4000'];
                cities[9] = ['جنداب', '4001'];
                cities[10] = ['سلفچگان', '4002'];
                cities[11] = ['قم', '3515'];
                break;

            //مرکزی
            case 'MK':
            case 'MKZ':
                cities[1] = ['محلات', '3621'];
                cities[2] = ['دلیجان', '3622'];
                cities[3] = ['خنداب', '3623'];
                cities[4] = ['کمیجان', '3624'];
                cities[5] = ['شازند', '3625'];
                cities[6] = ['آستانه', '3626'];
                cities[7] = ['خمین', '3627'];
                cities[8] = ['رباط مراد', '3628'];
                cities[9] = ['غرق آباد', '3629'];
                cities[10] = ['مامونیه ـ زرندیه', '3630'];
                cities[11] = ['تفرش', '3631'];
                cities[12] = ['آشتیان', '3632'];
                cities[13] = ['سلطان آباد', '4016'];
                cities[14] = ['اصفهانک', '4017'];
                cities[15] = ['حسین آباد', '4018'];
                cities[16] = ['خشک رود', '4019'];
                cities[17] = ['حکیم آباد', '4020'];
                cities[18] = ['یحیی آباد', '4021'];
                cities[19] = ['صدرآباد', '4022'];
                cities[20] = ['قطب صنعتی', '4023'];
                cities[21] = ['نیمور', '4024'];
                cities[22] = ['نخجیروان', '4025'];
                cities[23] = ['باقرآباد', '4026'];
                cities[24] = ['بزیجان', '4027'];
                cities[25] = ['عیسی آباد', '4028'];
                cities[26] = ['خورهه', '4029'];
                cities[27] = ['دودهک', '4030'];
                cities[28] = ['بیجگان', '4031'];
                cities[29] = ['خاوه', '4032'];
                cities[30] = ['نراق', '4033'];
                cities[31] = ['سینقان', '4034'];
                cities[32] = ['هستیجان', '4035'];
                cities[33] = ['کرهرود', '4036'];
                cities[34] = ['قنات ناصری', '4037'];
                cities[35] = ['ساروق', '4038'];
                cities[36] = ['داودآباد', '4039'];
                cities[37] = ['معصومیه', '4040'];
                cities[38] = ['انجدان', '4041'];
                cities[39] = ['دینه کبود', '4042'];
                cities[40] = ['حصارخنداب', '4043'];
                cities[41] = ['چیزان', '4044'];
                cities[42] = ['جاروسیان', '4045'];
                cities[43] = ['ادشته', '4046'];
                cities[44] = ['استوه', '4047'];
                cities[45] = ['سنجان', '4048'];
                cities[46] = ['اناج', '4049'];
                cities[47] = ['وفس', '4050'];
                cities[48] = ['خسروبیک', '4051'];
                cities[49] = ['میلاجرد', '4052'];
                cities[50] = ['سقاور', '4053'];
                cities[51] = ['هزاوه', '4054'];
                cities[52] = ['قدمگاه', '4055'];
                cities[53] = ['هفته', '4056'];
                cities[54] = ['لنجرود', '4057'];
                cities[55] = ['توره', '4058'];
                cities[56] = ['کزاز', '4059'];
                cities[57] = ['کتیران بالا', '4060'];
                cities[58] = ['نهرمیان', '4061'];
                cities[59] = ['سرسختی بالا', '4062'];
                cities[60] = ['لوزدرعلیا', '4063'];
                cities[61] = ['خنادرهوسطی', '4064'];
                cities[62] = ['هندودر', '4065'];
                cities[63] = ['تواندشت علیا', '4066'];
                cities[64] = ['مالمیر', '4067'];
                cities[65] = ['چهارچریک', '4068'];
                cities[66] = ['خیس آباد', '4069'];
                cities[67] = ['چهارچشمه', '4070'];
                cities[68] = ['لکان', '4071'];
                cities[69] = ['قورچی باشی', '4072'];
                cities[70] = ['ورچه', '4073'];
                cities[71] = ['فرقهان', '4074'];
                cities[72] = ['امامزاده ورچه', '4075'];
                cities[73] = ['رباط کمنسان', '4076'];
                cities[74] = ['ریحان علیا', '4077'];
                cities[75] = ['مزنق', '4078'];
                cities[76] = ['خورآوند', '4079'];
                cities[77] = ['شیجان علیا', '4080'];
                cities[78] = ['گلدشت', '4081'];
                cities[79] = ['دهنو', '4082'];
                cities[80] = ['نوبران', '4083'];
                cities[81] = ['قلعک', '4084'];
                cities[82] = ['یلاباد', '4085'];
                cities[83] = ['رازقان', '4086'];
                cities[84] = ['الویر', '4087'];
                cities[85] = ['دوزج', '4088'];
                cities[86] = ['علیشار', '4089'];
                cities[87] = ['بالقلو', '4090'];
                cities[88] = ['زاویه', '4091'];
                cities[89] = ['چمران', '4092'];
                cities[90] = ['ماقان', '4093'];
                cities[91] = ['سامان', '4094'];
                cities[92] = ['دخان', '4095'];
                cities[93] = ['مراغه', '4096'];
                cities[94] = ['فرمهین', '4097'];
                cities[95] = ['شهراب', '4098'];
                cities[96] = ['زاغر', '4099'];
                cities[97] = ['کهک', '4100'];
                cities[98] = ['فشک', '4101'];
                cities[99] = ['آهنگران', '4102'];
                cities[100] = ['علیان آباد', '4103'];
                cities[101] = ['مزرعهنو', '4104'];
                cities[102] = ['صالح آباد', '4105'];
                cities[103] = ['سیاوشان', '4106'];
                cities[104] = ['آهو', '4107'];
                cities[105] = ['پرندک', '4108'];
                cities[106] = ['اراک', '3516'];
                cities[107] = ['ساوه', '3517'];
                cities[108] = ['شهرک مهاجران', '3635'];
                break;

            //زنجان
            case 'ZJN':
            case 'ZA':
                cities[1] = ['زنجان', '3521'];
                cities[2] = ['محمودآباد', '3196'];
                cities[3] = ['باشقشلاق', '3197'];
                cities[4] = ['گرماب', '3198'];
                cities[5] = ['زرین آباد ـ ایجرود', '3199'];
                cities[6] = ['کهلا', '3200'];
                cities[7] = ['گیلوان', '3201'];
                cities[8] = ['دستجرده', '3202'];
                cities[9] = ['سعیدآباد', '3203'];
                cities[10] = ['چورزق', '3204'];
                cities[11] = ['حلب', '3205'];
                cities[12] = ['درام', '3206'];
                cities[13] = [' آب بر ـ طارم', '3207'];
                cities[14] = ['زرین رود', '3208'];
                cities[15] = ['ماهنشان', '3650'];
                cities[16] = ['سلطانیه', '3651'];
                cities[17] = ['ابهر', '3652'];
                cities[18] = ['خرمدره', '3653'];
                cities[19] = ['قیدار', '3654'];
                cities[20] = ['همایون', '4222'];
                cities[21] = ['بوغداکندی', '4223'];
                cities[22] = ['اژدهاتو', '4224'];
                cities[23] = ['اسفجین', '4225'];
                cities[24] = ['ارمغان خانه', '4226'];
                cities[25] = ['قبله بلاغی', '4227'];
                cities[26] = ['پری', '4228'];
                cities[27] = ['اندآباد علیا', '4229'];
                cities[28] = ['قرهگل', '4230'];
                cities[29] = ['نیک پی', '4231'];
                cities[30] = ['دندی', '4232'];
                cities[31] = ['سونتو', '4233'];
                cities[32] = ['قلتوق', '4234'];
                cities[33] = ['گوزلدره سفلی', '4235'];
                cities[34] = ['سنبل آباد', '4236'];
                cities[35] = ['دره سجین', '4237'];
                cities[36] = ['دولت آباد', '4238'];
                cities[37] = ['کینهورس', '4239'];
                cities[38] = ['هیدج', '4240'];
                cities[39] = ['صائین قلعه', '4241'];
                cities[40] = ['اقبلاغ سفلی', '4242'];
                cities[41] = ['سهرورد', '4243'];
                cities[42] = ['کرسف', '4244'];
                cities[43] = ['سجاس', '4245'];
                break;

            // مازندران
            case 'MZN':
            case 'MN':
                cities[1] = ['شیرنگ علیا', '4340'];
                cities[2] = ['مارون کلاته', '4341'];
                cities[3] = ['مزرعه کتول', '4342'];
                cities[4] = ['حاجی کلاته', '4343'];
                cities[5] = ['بدراقنوری', '4344'];
                cities[6] = ['خولیندره', '4345'];
                cities[7] = ['گامیشلی', '4331'];
                cities[8] = ['قرنجیک', '4332'];
                cities[9] = ['قلعه محمود', '4333'];
                cities[10] = ['کفشگری', '4334'];
                cities[11] = ['بالاجاده', '4317'];
                cities[12] = ['میاندره', '4320'];
                cities[13] = ['ایلوار', '4321'];
                cities[14] = ['زلکلان', '4322'];
                cities[15] = ['یساقی', '4323'];
                cities[16] = ['بندپی', '4324'];
                cities[17] = ['مهتر کلا', '4325'];
                cities[18] = ['داوکان', '4326'];
                cities[19] = ['قره قاشلی', '4327'];
                cities[20] = ['پنج پیکر', '4328'];
                cities[21] = ['خواجه نفس', '4329'];
                cities[22] = ['گلوگاه ـ بابل', '5608'];
                cities[23] = ['ایزدشهر', '5609'];
                cities[24] = ['تقی آباد', '4336'];
                cities[25] = ['پیرواش', '4337'];
                cities[26] = ['جعفرآبادنامتلو', '4348'];
                cities[27] = ['شش آب', '4349'];
                cities[28] = ['کوچک خرطومه', '4350'];
                cities[29] = ['ایمرملاساری', '4351'];
                cities[30] = ['بیبی شیروان', '4352'];
                cities[31] = ['تنگراه', '4367'];
                cities[32] = ['صالح آباد چولی', '4368'];
                cities[33] = ['کیارام', '4369'];
                cities[34] = ['دوزین', '4370'];
                cities[35] = ['قلعه قافه', '4371'];
                cities[36] = ['کنگور', '4372'];
                cities[37] = ['بالایشیخکین گلین', '4373'];
                cities[38] = ['پیشکمر', '4374'];
                cities[39] = ['بیشک تپه', '4375'];
                cities[40] = ['مراوه تپه', '4376'];
                cities[41] = ['قرهگل شرقی', '4377'];
                cities[42] = ['عزیز آباد', '4378'];
                cities[43] = ['یانبلاغ', '4379'];
                cities[44] = ['زرگر محله', '4380'];
                cities[45] = ['مرزی کلا', '4381'];
                cities[46] = ['رودپی', '4382'];
                cities[47] = ['معدن قشلاقی', '4354'];
                cities[48] = ['فارسیان', '4355'];
                cities[49] = ['خوش ییلاق', '4356'];
                cities[50] = ['تاتارعلیا', '4357'];
                cities[51] = ['پشمک نیاده', '4358'];
                cities[52] = ['باغلی مارامه', '4359'];
                cities[53] = ['داشلی برون', '4360'];
                cities[54] = ['دیگچه', '4361'];
                cities[55] = ['حاجیقوشان', '4362'];
                cities[56] = ['سارجهگر', '4363'];
                cities[57] = ['کرند', '4364'];
                cities[58] = ['آمل', '3522'];
                cities[59] = ['بابل', '3523'];
                cities[60] = ['ساری', '3524'];
                cities[61] = ['معلم کلاء', '3209'];
                cities[62] = ['سرخرود', '3210'];
                cities[63] = ['وسطی کلاء', '3211'];
                cities[64] = ['رینه', '3212'];
                cities[65] = ['سوا', '3213'];
                cities[66] = ['بایجان', '3214'];
                cities[67] = ['گزنک', '3215'];
                cities[68] = ['چمستان', '3216'];
                cities[69] = ['بنفشه ده', '3217'];
                cities[70] = ['رئیس کلالاویج', '3218'];
                cities[71] = ['اوزه', '3219'];
                cities[72] = ['بلده', '3220'];
                cities[73] = ['تاکر', '3221'];
                cities[74] = ['گلنده رود', '3222'];
                cities[75] = ['چلندر', '3223'];
                cities[76] = ['صلاح الدین کلاء', '3224'];
                cities[77] = ['نارنجبن', '3225'];
                cities[78] = ['رویانشهر', '3226'];
                cities[79] = ['کجور', '3227'];
                cities[80] = ['پولکجور', '3228'];
                cities[81] = ['لشکنار', '3229'];
                cities[82] = ['هچیرود', '3230'];
                cities[83] = ['مرزن آباد', '3231'];
                cities[84] = ['کردیچال', '3232'];
                cities[85] = ['کلاردشت', '3233'];
                cities[86] = ['کلنو', '3234'];
                cities[87] = ['دلیر', '3235'];
                cities[88] = ['سیاه پیشه', '3236'];
                cities[89] = ['کلارآباد', '3237'];
                cities[90] = ['عباس آباد', '3238'];
                cities[91] = ['سرلنگا', '3239'];
                cities[92] = ['کترا', '3240'];
                cities[93] = ['گلعلی آباد', '3241'];
                cities[94] = ['میانکوه دوهزار', '3242'];
                cities[95] = ['مهران سه هزار', '3243'];
                cities[96] = ['نشتارود', '3244'];
                cities[97] = ['قلعه گردن', '3245'];
                cities[98] = ['خرم آباد', '3246'];
                cities[99] = ['شیرود', '3247'];
                cities[100] = ['سلیمان آباد', '3248'];
                cities[101] = ['کشکو', '3249'];
                cities[102] = ['لاکتراشان', '3250'];
                cities[103] = ['سادات محله', '3251'];
                cities[104] = ['کتالم', '3252'];
                cities[105] = ['اغوزکتی', '3253'];
                cities[106] = ['جواهرده', '3254'];
                cities[107] = ['جفت رودبار', '3255'];
                cities[108] = ['تهل', '3256'];
                cities[109] = ['خوشرودپی', '3257'];
                cities[110] = ['آهنگرکلا', '3258'];
                cities[111] = ['گاون کلا', '3259'];
                cities[112] = ['وقبله', '4246'];
                cities[113] = ['شورکش', '4247'];
                cities[114] = ['اینچهدان', '4248'];
                cities[115] = ['عرب خیل', '4249'];
                cities[116] = ['بهنمیر', '4250'];
                cities[117] = ['کاسگرمحله', '4251'];
                cities[118] = ['کله بست', '4252'];
                cities[119] = ['بیشه سر', '4253'];
                cities[120] = ['گنج افروز', '4254'];
                cities[121] = ['گتاب', '4255'];
                cities[122] = ['دابودشت', '4256'];
                cities[123] = ['درازکش', '4257'];
                cities[124] = ['گردرودبار', '4258'];
                cities[125] = ['شهیدآباد', '4259'];
                cities[126] = ['احمد چاله پس', '4260'];
                cities[127] = ['بالا جنید', '4261'];
                cities[128] = ['خطیر کلاء', '4262'];
                cities[129] = ['حاجی کلاء صنم', '4263'];
                cities[130] = ['واسکس', '4264'];
                cities[131] = ['قادیکلاء', '4265'];
                cities[132] = ['دیکنده', '4266'];
                cities[133] = ['کفشگرکلااوطه', '4267'];
                cities[134] = ['کیا کلا', '4268'];
                cities[135] = ['بالادسته', '4269'];
                cities[136] = ['بیزکی', '4270'];
                cities[137] = ['کوهی خیل', '4271'];
                cities[138] = ['سنگتاب', '4272'];
                cities[139] = ['رکابدارکلا', '4273'];
                cities[140] = ['شیر کلا', '4274'];
                cities[141] = ['آلاشت', '4275'];
                cities[142] = ['لغور', '4276'];
                cities[143] = ['اتو', '4277'];
                cities[144] = ['شیرگاه', '4278'];
                cities[145] = ['پالند', '4279'];
                cities[146] = ['چرات', '4280'];
                cities[147] = ['دهمیان', '4281'];
                cities[148] = ['خشکدره', '4282'];
                cities[149] = ['امافت', '4283'];
                cities[150] = ['دو آب', '4284'];
                cities[151] = ['ورسک', '4285'];
                cities[152] = ['کتی لته', '4286'];
                cities[153] = ['اروست', '4287'];
                cities[154] = ['فریم', '4288'];
                cities[155] = ['سنگده', '4289'];
                cities[156] = ['قادیکلا', '4290'];
                cities[157] = ['تاکام', '4291'];
                cities[158] = ['هولار', '4292'];
                cities[159] = ['اسبوکلا', '4293'];
                cities[160] = ['سورک', '4294'];
                cities[161] = ['اسلام آباد', '4295'];
                cities[162] = ['گهرباران', '4296'];
                cities[163] = ['فرخ آباد', '4297'];
                cities[164] = ['داراب کلاء', '4298'];
                cities[165] = ['ماچک پشت', '4299'];
                cities[166] = ['خورشید', '4300'];
                cities[167] = ['زاغمرز', '4301'];
                cities[168] = ['چلمردی', '4302'];
                cities[169] = ['رستم کلا', '4303'];
                cities[170] = ['پائین زرندین', '4304'];
                cities[171] = ['بارابسر', '4305'];
                cities[172] = ['تیر تاش', '4306'];
                cities[173] = ['خلیل شهر', '4307'];
                cities[174] = ['حسین آباد', '4308'];
                cities[175] = ['دامداری حسن ابوطا', '4309'];
                cities[176] = ['بشیرینه', '4310'];
                cities[177] = ['سفیدچاه', '4311'];
                cities[178] = ['دامداری مجریان', '4312'];
                cities[179] = ['محمودآباد', '3655'];
                cities[180] = ['نور', '3656'];
                cities[181] = ['نوشهر', '3657'];
                cities[182] = ['چالوس', '3658'];
                cities[183] = ['سلمانشهر', '3659'];
                cities[184] = ['تنکابن', '3660'];
                cities[185] = ['رامسر', '3661'];
                cities[186] = ['امیرکلا', '3662'];
                cities[187] = ['بابلسر', '3663'];
                cities[188] = ['فریدون کنار', '3664'];
                cities[189] = ['قائم شهر', '3665'];
                cities[190] = ['جویبار', '3666'];
                cities[191] = ['زیرآب', '3667'];
                cities[192] = ['پل سفید ـ سوادکوه', '3668'];
                cities[193] = ['کیاسر', '3669'];
                cities[194] = ['نکاء', '3670'];
                cities[195] = ['بهشهر', '3671'];
                cities[196] = ['گلوگاه', '3672'];
                break;

            //گلستان
            case 'GLS':
            case 'GO':
                cities[1] = ['گرگان', '3525'];
                cities[2] = ['بندر گز', '3673'];
                cities[3] = ['کردکوی', '3674'];
                cities[4] = ['بندرترکمن', '3675'];
                cities[5] = ['آق قلا', '3676'];
                cities[6] = ['علی آباد', '3677'];
                cities[7] = ['آزادشهر', '3678'];
                cities[8] = ['گنبدکاوس', '3679'];
                cities[9] = ['مینودشت', '3680'];
                cities[10] = ['کلاله', '3681'];
                cities[11] = ['خان ببین', '4346'];
                cities[12] = ['دلند', '4347'];
                cities[13] = ['سرخن کلاته', '4335'];
                cities[14] = ['نوده خاندوز', '4353'];
                cities[15] = ['گالیکش', '4365'];
                cities[16] = ['جلین', '4366'];
                cities[17] = ['نگین شهر', '4318'];
                cities[18] = ['سیمین شهر', '4319'];
                cities[19] = ['نوکنده', '4313'];
                cities[20] = ['اینچه برون', '4314'];
                cities[21] = ['مراوه تپه', '4315'];
                cities[22] = ['رامیان', '4316'];
                cities[23] = ['گمیش تپه', '4330'];
                cities[24] = ['انبار آلوم', '4338'];
                cities[25] = ['فاضل آباد', '4339'];
                break;

            //اردبیل
            case 'ADL':
            case 'AR':
                cities[1] = ['اردبیل', '3532'];
                cities[2] = ['نمین', '3700'];
                cities[3] = ['نیر', '3701'];
                cities[4] = ['گرمی', '3702'];
                cities[5] = ['مشکین شهر', '3703'];
                cities[6] = ['بیله سوار', '3704'];
                cities[7] = ['خلخال', '3705'];
                cities[8] = ['پارس آباد', '3706'];
                cities[9] = ['ابی بیگلو', '4514'];
                cities[10] = ['نانهکران', '4515'];
                cities[11] = ['عنبران', '4516'];
                cities[12] = ['گرده', '4517'];
                cities[13] = ['ثمرین', '4518'];
                cities[14] = ['اردی موسی', '4519'];
                cities[15] = ['سرعین', '4520'];
                cities[16] = ['کوارئیم', '4521'];
                cities[17] = ['اسلام آباد', '4522'];
                cities[18] = ['مهماندوست', '4523'];
                cities[19] = ['هیر', '4524'];
                cities[20] = ['بقرآباد', '4525'];
                cities[21] = ['بودالالو', '4526'];
                cities[22] = ['ارالوی بزرگ', '4527'];
                cities[23] = ['دیزج', '4528'];
                cities[24] = ['حمزه خانلو', '4529'];
                cities[25] = ['زهرا', '4530'];
                cities[26] = ['انی علیا', '4531'];
                cities[27] = ['قاسمکندی', '4532'];
                cities[28] = ['تازه کند انگوت', '4533'];
                cities[29] = ['قره اغاج پائین', '4534'];
                cities[30] = ['پریخان', '4535'];
                cities[31] = ['قصابه', '4536'];
                cities[32] = ['فخرآباد', '4537'];
                cities[33] = ['رضی', '4538'];
                cities[34] = ['قوشه سفلی', '4539'];
                cities[35] = ['مرادلو', '4540'];
                cities[36] = ['گنجوبه', '4541'];
                cities[37] = ['گوگ تپه', '4542'];
                cities[38] = ['انجیر لو', '4543'];
                cities[39] = ['جعفرآباد', '4544'];
                cities[40] = ['آغداش کلام', '4545'];
                cities[41] = ['خورخور سفلی', '4546'];
                cities[42] = ['شورگل', '4547'];
                cities[43] = ['نظرعلی بلاغی', '4548'];
                cities[44] = ['لنبر', '4549'];
                cities[45] = ['فیروزآباد', '4550'];
                cities[46] = ['گیوی ـ کوثر', '4551'];
                cities[47] = ['خلف لو', '4552'];
                cities[48] = ['هشتجین', '4553'];
                cities[49] = ['برندق', '4554'];
                cities[50] = ['کلور', '4555'];
                cities[51] = ['تازه کندقدیم', '4556'];
                cities[52] = ['گوشلو', '4557'];
                cities[53] = ['اققباق سفلی', '4558'];
                cities[54] = ['شهرک شهید غفاری', '4559'];
                cities[55] = ['اصلاندوز', '4560'];
                cities[56] = ['بلانعلیا', '4561'];
                cities[57] = ['لاهرود', '4562'];
                break;

            //آذربایجان غربی
            case 'WAZ':
            case 'AW':
                cities[1] = ['باراندوز', '4563'];
                cities[2] = ['دیزج دول', '4564'];
                cities[3] = ['ابگرم', '4565'];
                cities[4] = ['سرنق', '4566'];
                cities[5] = ['چهریق علیا', '4567'];
                cities[6] = ['داراب', '4568'];
                cities[7] = ['دلزی', '4569'];
                cities[8] = ['اغ برزه', '4570'];
                cities[9] = ['سنجی', '4571'];
                cities[10] = ['کیک آباد', '4572'];
                cities[11] = ['خاتون باغ', '4573'];
                cities[12] = ['حاجی حسن', '4574'];
                cities[13] = ['سوگلی تپه', '4575'];
                cities[14] = ['کلیجه', '4576'];
                cities[15] = ['حاجیکند', '4577'];
                cities[16] = ['باغچه', '4578'];
                cities[17] = ['خورخوره', '4579'];
                cities[18] = ['کاولان علیا', '4580'];
                cities[19] = ['سیاقول علیا', '4581'];
                cities[20] = ['اگریقاش', '4582'];
                cities[21] = ['اوزوندره علیا', '4583'];
                cities[22] = ['یکشوه', '4584'];
                cities[23] = ['جوانمرد', '4585'];
                cities[24] = ['اغتطر', '4586'];
                cities[25] = ['سیمینه', '4587'];
                cities[26] = ['رحیمخان', '4588'];
                cities[27] = ['گلتپه قورمیش', '4589'];
                cities[28] = ['سلماش', '4590'];
                cities[29] = ['اسلام آباد', '4591'];
                cities[30] = ['بیوران سفلی', '4592'];
                cities[31] = ['زمزیران', '4593'];
                cities[32] = ['ربط', '4594'];
                cities[33] = ['کشاورز (اقبال)', '4595'];
                cities[34] = ['ملا شهاب الدین', '4596'];
                cities[35] = ['للکلو', '4597'];
                cities[36] = ['بکتاش', '4598'];
                cities[37] = ['چهاربرج قدیم', '4599'];
                cities[38] = ['گوگ تپه خالصه', '4600'];
                cities[39] = ['تک آغاج', '4601'];
                cities[40] = ['هاچاسو', '4602'];
                cities[41] = ['هولاسو', '4603'];
                cities[42] = ['قوزلوی افشار', '4604'];
                cities[43] = ['محمودآباد', '4605'];
                cities[44] = ['الیچین', '4606'];
                cities[45] = ['حیدرباغی', '4607'];
                cities[46] = ['حمزه قاسم', '4608'];
                cities[47] = ['اوغولبیگ', '4609'];
                cities[48] = ['دورباش', '4610'];
                cities[49] = ['اقابیگ', '4611'];
                cities[50] = ['احمدآبادسفلی', '4612'];
                cities[51] = ['باروق', '4613'];
                cities[52] = ['سیلوانا', '3707'];
                cities[53] = ['قوشچی', '3708'];
                cities[54] = ['نقده', '3709'];
                cities[55] = ['ارومیه', '3533'];
                cities[56] = ['سیلوه', '3534'];
                cities[57] = ['خوی', '3535'];
                cities[58] = ['مهاباد', '3536'];
                cities[59] = ['اشنویه', '3057'];
                cities[60] = ['پیرانشهر', '3058'];
                cities[61] = ['جلدیان', '3059'];
                cities[62] = ['ایواوغلی', '3060'];
                cities[63] = ['دیزجدیز', '3061'];
                cities[64] = ['فیرورق', '3062'];
                cities[65] = ['قره ضیاء الدین ـ چایپاره', '3063'];
                cities[66] = ['ماکو', '3064'];
                cities[67] = ['سیه چشمه ـ چالدران', '3065'];
                cities[68] = ['سلماس', '3066'];
                cities[69] = ['تازه شهر', '3067'];
                cities[70] = ['گوگ تپه', '3068'];
                cities[71] = ['کتیکه', '3069'];
                cities[72] = ['بوکان', '3070'];
                cities[73] = ['سردشت', '3071'];
                cities[74] = ['میاندوآب', '3072'];
                cities[75] = ['شاهین دژ', '3073'];
                cities[76] = ['تکاب', '3074'];
                cities[77] = ['میاوق', '2913'];
                cities[78] = ['ایبلو', '2914'];
                cities[79] = ['دستجرد', '2915'];
                cities[80] = ['نوشین شهر', '2916'];
                cities[81] = ['طلا تپه', '2917'];
                cities[82] = ['راژان', '2918'];
                cities[83] = ['هاشم آباد', '2919'];
                cities[84] = ['دیزج', '2920'];
                cities[85] = ['زیوه', '2921'];
                cities[86] = ['توئی', '2922'];
                cities[87] = ['موانا', '2923'];
                cities[88] = ['قره باغ', '2924'];
                cities[89] = ['بهله', '2925'];
                cities[90] = ['امامکندی', '2926'];
                cities[91] = ['نازلو', '2927'];
                cities[92] = ['سرو', '2928'];
                cities[93] = ['کانسپی', '2929'];
                cities[94] = ['ممکان', '2930'];
                cities[95] = ['میرآباد', '2931'];
                cities[96] = ['حسنلو', '2932'];
                cities[97] = ['کهریز عجم', '2933'];
                cities[98] = ['محمد یار', '2934'];
                cities[99] = ['شیخ احمد', '2935'];
                cities[100] = ['بیگی مقلعه', '2936'];
                cities[101] = ['راهدانه', '2937'];
                cities[102] = ['شاهوانه', '2938'];
                cities[103] = ['نالوس', '2939'];
                cities[104] = ['ده شمس بزرگ', '2940'];
                cities[105] = ['گلاز', '2941'];
                cities[106] = ['لولکان', '2942'];
                cities[107] = ['سیاوان', '2943'];
                cities[108] = ['کلهکین', '2944'];
                cities[109] = ['شین آباد', '2945'];
                cities[110] = ['چیانه', '2946'];
                cities[111] = ['بیکوس', '2947'];
                cities[112] = ['هنگاباد', '2948'];
                cities[113] = ['گردکشانه', '2949'];
                cities[114] = ['پسوه', '2950'];
                cities[115] = ['ریگ آباد', '2951'];
                cities[116] = ['احمد غریب', '2952'];
                cities[117] = ['سیهباز', '2953'];
                cities[118] = ['بیله وار', '2954'];
                cities[119] = ['ولدیان', '2955'];
                cities[120] = ['قوروق', '2956'];
                cities[121] = ['هندوان', '2957'];
                cities[122] = ['بدلان', '2958'];
                cities[123] = ['بلسورسفلی', '2959'];
                cities[124] = ['زورآباد', '2960'];
                cities[125] = ['استران', '2961'];
                cities[126] = ['قطور', '2962'];
                cities[127] = ['شیرین بلاغی', '2963'];
                cities[128] = ['مراکان', '2964'];
                cities[129] = ['چورس', '2965'];
                cities[130] = ['قورول علیا', '2966'];
                cities[131] = ['بسطام', '2967'];
                cities[132] = ['قرهتپه', '2968'];
                cities[133] = ['ریحانلوی علیا', '2969'];
                cities[134] = ['زاویه سفلی', '2970'];
                cities[135] = ['آواجیق (کلیسا کندی)', '2971'];
                cities[136] = ['بازرگان', '2972'];
                cities[137] = ['قمقشلاق علیا', '2973'];
                cities[138] = ['یولاگلدی', '2974'];
                cities[139] = ['قرنقو', '2975'];
                cities[140] = ['شوط', '2976'];
                cities[141] = ['پلدشت', '2977'];
                cities[142] = ['نازک علیا', '2978'];
                cities[143] = ['حسنکندی', '2979'];
                cities[144] = ['وردان', '2980'];
                cities[145] = ['قرهقشلاق', '2981'];
                cities[146] = ['تمر', '2982'];
                break;

            //همدان
            case 'HDN':
            case 'HD':
                cities[1] = ['همدان', '3540'];
                cities[2] = ['بهار', '3088'];
                cities[3] = ['اسدآباد', '3089'];
                cities[4] = ['کبودرآهنگ', '3090'];
                cities[5] = ['فامنین', '3091'];
                cities[6] = ['ملایر', '3092'];
                cities[7] = ['تویسرکان', '3093'];
                cities[8] = ['نهاوند', '3094'];
                cities[9] = ['حسین آباد', '3126'];
                cities[10] = ['گنبد', '3127'];
                cities[11] = ['جورقان', '3128'];
                cities[12] = ['پادگان قهرمان', '3129'];
                cities[13] = ['همهکسی', '2705'];
                cities[14] = ['صالح آباد', '2706'];
                cities[15] = ['پرلوک', '2707'];
                cities[16] = ['عاشوری', '2708'];
                cities[17] = ['مهاجران', '2709'];
                cities[18] = ['ویرایی', '2710'];
                cities[19] = ['مریانج', '2711'];
                cities[20] = ['جنت آباد', '2712'];
                cities[21] = ['موسی آباد', '2713'];
                cities[22] = ['چنارسفلی', '2714'];
                cities[23] = ['چنارعلیا', '2715'];
                cities[24] = ['اجین', '2716'];
                cities[25] = ['طویلان سفلا', '2717'];
                cities[26] = ['کوریجان', '2718'];
                cities[27] = ['کوهین', '2719'];
                cities[28] = ['قهوردسفلی', '2720'];
                cities[29] = ['اکنلو', '2721'];
                cities[30] = ['شیرین سو', '2722'];
                cities[31] = ['گل تپه', '2723'];
                cities[32] = ['داقداق آباد', '2724'];
                cities[33] = ['قهاوند', '2725'];
                cities[34] = ['تجرک', '2726'];
                cities[35] = ['کوزره', '2727'];
                cities[36] = ['چانگرین', '2728'];
                cities[37] = ['دمق', '2729'];
                cities[38] = ['رزن', '2730'];
                cities[39] = ['قروه درجزین', '2731'];
                cities[40] = ['ازناو', '2732'];
                cities[41] = ['جوزان', '2733'];
                cities[42] = ['زنگنه', '2734'];
                cities[43] = ['سامن', '2735'];
                cities[44] = ['اورزمان', '2736'];
                cities[45] = ['جوکار', '2737'];
                cities[46] = ['اسلام آباد', '2738'];
                cities[47] = ['جعفریه', '2739'];
                cities[48] = ['سرکان', '2740'];
                cities[49] = ['میانده', '2741'];
                cities[50] = ['فرسنج', '2742'];
                cities[51] = ['ولاشجرد', '2743'];
                cities[52] = ['اشتران', '2744'];
                cities[53] = ['باباپیر', '2745'];
                cities[54] = ['جهان آباد', '2746'];
                cities[55] = ['باباقاسم', '2747'];
                cities[56] = ['بابارستم', '2748'];
                cities[57] = ['گیان', '2749'];
                cities[58] = ['دهفول', '2750'];
                cities[59] = ['فیروزان', '2751'];
                cities[60] = ['شهرک صنعتی', '2752'];
                cities[61] = ['پایگاه نوژه', '2753'];
                cities[62] = ['علیصدر', '2754'];
                cities[63] = ['زند', '2755'];
                cities[64] = ['ازندریان', '2756'];
                cities[65] = ['خزل', '2757'];
                cities[66] = ['لالجین', '4703'];
                cities[67] = ['دینارآباد', '4704'];
                break;

            //کردستان
            case 'KRD':
            case 'KD':
                cities[1] = ['شویشه', '5604'];
                cities[2] = ['شاهین', '3130'];
                cities[3] = ['طای', '3131'];
                cities[4] = ['گازرخانی', '3132'];
                cities[5] = ['نشورسفلی', '3133'];
                cities[6] = ['شیروانه', '3134'];
                cities[7] = ['خامسان', '3135'];
                cities[8] = ['موچش', '3136'];
                cities[9] = ['شریف آباد', '3137'];
                cities[10] = ['کوله', '3138'];
                cities[11] = ['هزارکانیان', '3139'];
                cities[12] = ['زرینه', '3140'];
                cities[13] = ['گورباباعلی', '3141'];
                cities[14] = ['گاوشله', '3142'];
                cities[15] = ['حزکه', '3143'];
                cities[16] = ['یاسوکند', '3144'];
                cities[17] = ['توپاغاج', '3145'];
                cities[18] = ['اغبلاغ طفامین', '3146'];
                cities[19] = ['باباشارنی', '3147'];
                cities[20] = ['خسروآباد', '3148'];
                cities[21] = ['جعفرآباد', '3149'];
                cities[22] = ['دلبران', '3150'];
                cities[23] = ['دزج', '3151'];
                cities[24] = ['کانی گنجی', '3152'];
                cities[25] = ['بلبان آباد', '3153'];
                cities[26] = ['دهگلان', '3154'];
                cities[27] = ['قروچای', '3155'];
                cities[28] = ['سریش آباد', '3156'];
                cities[29] = ['نی', '3157'];
                cities[30] = ['بردهرشه', '3158'];
                cities[31] = ['چناره', '3159'];
                cities[32] = ['پیرخفران', '3160'];
                cities[33] = ['بیساران', '3161'];
                cities[34] = ['سروآباد', '3162'];
                cities[35] = ['اورامانتخت', '3163'];
                cities[36] = ['سرا', '3164'];
                cities[37] = ['گلتپه', '3165'];
                cities[38] = ['تیلکو', '3166'];
                cities[39] = ['صاحب', '3167'];
                cities[40] = ['خورخوره', '3168'];
                cities[41] = ['کسنزان', '3169'];
                cities[42] = ['میرهده', '3170'];
                cities[43] = ['ننور', '3171'];
                cities[44] = ['بوئین سفلی', '3172'];
                cities[45] = ['َآرمرده', '3173'];
                cities[46] = ['بوالحسن', '3174'];
                cities[47] = ['کانی سور', '3175'];
                cities[48] = ['کوخان', '3176'];
                cities[49] = ['شوی', '3177'];
                cities[50] = ['کامیاران', '3095'];
                cities[51] = ['دیواندره', '3096'];
                cities[52] = ['بیجار', '3097'];
                cities[53] = ['قروه', '3098'];
                cities[54] = ['مریوان', '3099'];
                cities[55] = ['سقز', '3100'];
                cities[56] = ['بانه', '3101'];
                cities[57] = ['سنندج', '3541'];
                break;

            //کرمانشاه
            case 'KRH':
            case 'BK':
                cities[1] = ['تازه آباد ـ ثلاث باباجانی', '4705'];
                cities[2] = ['نسار دیره', '4706'];
                cities[3] = ['سرمست(گواور)', '4707'];
                cities[4] = ['تپهرش', '4708'];
                cities[5] = ['خسروی', '4709'];
                cities[6] = ['نفت شهر', '4710'];
                cities[7] = ['سومار', '4711'];
                cities[8] = ['گیلانغرب', '4712'];
                cities[9] = ['چله', '4713'];
                cities[10] = ['قیلان', '4714'];
                cities[11] = ['باینگان', '4715'];
                cities[12] = ['نوسود', '4716'];
                cities[13] = ['نودشه', '4717'];
                cities[14] = ['روانسر', '4718'];
                cities[15] = ['دولت آباد', '4719'];
                cities[16] = ['جوانرود', '4720'];
                cities[17] = ['میرآباد', '4721'];
                cities[18] = ['کرمانشاه', '3542'];
                cities[19] = ['هرسین', '3102'];
                cities[20] = ['کنگاور', '3103'];
                cities[21] = ['سنقر', '3104'];
                cities[22] = ['اسلام آباد غرب', '3105'];
                cities[23] = ['سرپل ذهاب', '3106'];
                cities[24] = ['قصرشیرین', '3107'];
                cities[25] = ['پاوه', '3108'];
                cities[26] = ['هفت اشیان', '3178'];
                cities[27] = ['هلشی', '3179'];
                cities[28] = ['دوردشت', '3180'];
                cities[29] = ['سنقرآباد', '3181'];
                cities[30] = ['بیستون', '3182'];
                cities[31] = ['جعفرآباد(گاکیه)', '3183'];
                cities[32] = ['مرزبانی', '3184'];
                cities[33] = ['فش', '3185'];
                cities[34] = ['فرامان', '3186'];
                cities[35] = ['سلطان آباد', '3187'];
                cities[36] = ['صحنه', '3188'];
                cities[37] = ['قزوینه', '3189'];
                cities[38] = ['دهلقین', '3190'];
                cities[39] = ['درکه', '3191'];
                cities[40] = ['باوله', '3192'];
                cities[41] = ['گردکانه علیا', '3193'];
                cities[42] = ['اگاه علیا', '3194'];
                cities[43] = ['سطر', '3195'];
                cities[44] = ['کیونان', '2758'];
                cities[45] = ['کرگسار', '2759'];
                cities[46] = ['کندوله', '2760'];
                cities[47] = ['زاوله علیا', '2761'];
                cities[48] = ['حمیل', '2762'];
                cities[49] = ['ریجاب', '2763'];
                cities[50] = ['کرندغرب ـ دالاهو', '2764'];
                cities[51] = ['گهواره', '2765'];
                cities[52] = ['کوزران', '2766'];
                cities[53] = ['قلعه شیان', '2767'];
                cities[54] = ['سرفیروز آباد', '2768'];
                cities[55] = ['رباط', '2769'];
                cities[56] = ['حسن آباد', '2770'];
                cities[57] = ['سراب ذهاب', '2771'];
                cities[58] = ['ترک ویس', '2772'];
                cities[59] = ['ازگله', '2773'];
                break;

            //لرستان
            case 'LRS':
            case 'LO':
                cities[1] = ['نورآباد ـ دلفان', '3109'];
                cities[2] = ['کوهدشت', '3110'];
                cities[3] = ['پل دختر', '3111'];
                cities[4] = ['الیگودرز', '3112'];
                cities[5] = ['ازنا', '3113'];
                cities[6] = ['دورود', '3114'];
                cities[7] = ['الشتر ـ سلسله', '3115'];
                cities[8] = ['خرم آباد', '3543'];
                cities[9] = ['بروجرد', '3544'];
                cities[10] = ['ماسور', '4722'];
                cities[11] = ['چغلوندی', '4723'];
                cities[12] = ['برخوردار', '4724'];
                cities[13] = ['فرهادآباد', '4725'];
                cities[14] = ['دمباغ', '4726'];
                cities[15] = ['کهریزوروشت', '4727'];
                cities[16] = ['چشمه کوزان', '4728'];
                cities[17] = ['هفت چشمه', '4729'];
                cities[18] = ['تقی آباد', '4730'];
                cities[19] = ['خوشناموند', '4731'];
                cities[20] = ['اشتره گل گل', '4732'];
                cities[21] = ['چقابل', '4733'];
                cities[22] = ['سوری', '4734'];
                cities[23] = ['کونانی', '4735'];
                cities[24] = ['گراب', '4736'];
                cities[25] = ['درب گنبد', '4737'];
                cities[26] = ['پاعلم', '4738'];
                cities[27] = ['واشیان نصیرتپه', '4739'];
                cities[28] = ['چشمک زیرتنگ', '4740'];
                cities[29] = ['افرینه', '4741'];
                cities[30] = ['معمولان', '4742'];
                cities[31] = ['میان راهان', '4743'];
                cities[32] = ['شوراب سفلی', '4744'];
                cities[33] = ['شاهپورآباد', '4745'];
                cities[34] = ['چمن سلطان', '4746'];
                cities[35] = ['کیزاندره', '4747'];
                cities[36] = ['بزنوید', '4748'];
                cities[37] = ['شول آباد', '4749'];
                cities[38] = ['حیه', '4750'];
                cities[39] = ['مرگسر', '4751'];
                cities[40] = ['مومن آباد', '4752'];
                cities[41] = ['رازان', '4753'];
                cities[42] = ['سیاه گوشی', '4754'];
                cities[43] = ['زاغه', '4755'];
                cities[44] = ['سراب دوره', '4756'];
                cities[45] = ['چاه ذوالفقار', '4757'];
                cities[46] = ['چمپلک', '4758'];
                cities[47] = ['ژان', '4759'];
                cities[48] = ['کاغه شمالی', '4760'];
                cities[49] = ['چالان چولان', '4761'];
                cities[50] = ['سپیددشت', '4762'];
                cities[51] = ['چمسنگر', '4763'];
                cities[52] = ['تنگ هفت', '4764'];
                cities[53] = ['حکومتی', '4765'];
                cities[54] = ['سیاهپوش', '4766'];
                cities[55] = ['ده رحیم', '4767'];
                cities[56] = ['فیروزآباد', '4768'];
                cities[57] = ['اشترینان', '4769'];
                cities[58] = ['بندیزه', '4770'];
                cities[59] = ['دره گرگ', '4771'];
                break;

            //بوشهر
            case 'BHR':
            case 'BU':
                cities[1] = ['بوشهر', '3547'];
                cities[2] = ['بندرگناوه', '3721'];
                cities[3] = ['خورموج ـ دشتی', '3722'];
                cities[4] = ['اهرم ـ تنگستان', '3723'];
                cities[5] = ['برازجان ـ دشتستان', '3724'];
                cities[6] = ['نخل تقی', '3725'];
                cities[7] = ['عالی شهر', '4886'];
                cities[8] = ['بندرریگ', '4887'];
                cities[9] = ['چهارروستائی', '4888'];
                cities[10] = ['شول', '4889'];
                cities[11] = ['بندردیلم', '4890'];
                cities[12] = ['امام حسن', '4891'];
                cities[13] = ['چغارک', '4892'];
                cities[14] = ['عسلویه', '4893'];
                cities[15] = ['بادوله', '4894'];
                cities[16] = ['شنبه', '4895'];
                cities[17] = ['کاکی', '4896'];
                cities[18] = ['جزیره خارک', '4897'];
                cities[19] = ['دلوار', '4898'];
                cities[20] = ['بنهگز', '4899'];
                cities[21] = ['آباد', '4900'];
                cities[22] = ['بردخون', '4901'];
                cities[23] = ['بندردیر', '4902'];
                cities[24] = ['ابدان', '4903'];
                cities[25] = ['ریز', '4904'];
                cities[26] = ['بندرکنگان', '4905'];
                cities[27] = ['جم', '4906'];
                cities[28] = ['آبگرم', '4907'];
                cities[29] = ['دالکی', '4908'];
                cities[30] = ['شبانکاره', '4909'];
                cities[31] = ['آبپخش', '4910'];
                cities[32] = ['سعدآباد', '4911'];
                cities[33] = ['وحدتیه', '4912'];
                cities[34] = ['تنگ ارم', '4913'];
                cities[35] = ['کلمه', '4914'];
                cities[36] = ['سیراف', '5620'];
                break;

            //کرمان
            case 'KRN':
            case 'KE':
                cities[1] = ['کرمان', '3548'];
                cities[2] = ['رفسنجان', '3549'];
                cities[3] = ['سیرجان', '3550'];
                cities[4] = ['ماهان', '3729'];
                cities[5] = ['گلباف', '3730'];
                cities[6] = ['راور', '3731'];
                cities[7] = ['بم', '3732'];
                cities[8] = ['بروات', '3733'];
                cities[9] = ['راین', '3734'];
                cities[10] = ['محمدآباد ـ ریگان', '3735'];
                cities[11] = ['سرچشمه', '3736'];
                cities[12] = ['انار', '3737'];
                cities[13] = ['شهربابک', '3738'];
                cities[14] = ['زرند', '3739'];
                cities[15] = ['کیان شهر', '3740'];
                cities[16] = ['کوهبنان', '3741'];
                cities[17] = ['چترود', '3742'];
                cities[18] = ['پاریز', '3743'];
                cities[19] = ['بردسیر', '3744'];
                cities[20] = ['بافت', '3745'];
                cities[21] = ['جیرفت', '3746'];
                cities[22] = ['عنبرآباد', '3747'];
                cities[23] = ['کهنوج', '3748'];
                cities[24] = ['منوجان', '3749'];
                cities[25] = ['محی آباد', '5605'];
                cities[26] = ['ده بالا', '4936'];
                cities[27] = ['حسین آبادخان', '4937'];
                cities[28] = ['جوپار', '4938'];
                cities[29] = ['باغین', '4939'];
                cities[30] = ['اختیارآباد', '4940'];
                cities[31] = ['زنگی آباد', '4941'];
                cities[32] = ['جوشان', '4942'];
                cities[33] = ['سیرچ', '4943'];
                cities[34] = ['اندوهجرد', '4944'];
                cities[35] = ['شهداد', '4945'];
                cities[36] = ['کشیت', '4946'];
                cities[37] = ['همت آباد', '4947'];
                cities[38] = ['باغهوتک', '4948'];
                cities[39] = ['خورند', '4949'];
                cities[40] = ['فیض آباد', '4950'];
                cities[41] = ['دریجان', '4951'];
                cities[42] = ['نرماشیر', '4952'];
                cities[43] = ['فهرج', '4953'];
                cities[44] = ['دهنوگنیگی', '4954'];
                cities[45] = ['برج معاذ', '4955'];
                cities[46] = ['قلعه خان', '4956'];
                cities[47] = ['نظام شهر', '4957'];
                cities[48] = ['خانه خاتون', '4958'];
                cities[49] = ['ابارق', '4959'];
                cities[50] = ['عبدالصمدیه', '4960'];
                cities[51] = ['گروه', '4961'];
                cities[52] = ['گزک', '4962'];
                cities[53] = ['حسین آباد', '4963'];
                cities[54] = ['دهنه عباسی', '4964'];
                cities[55] = ['تهرود', '4965'];
                cities[56] = ['میرآباد', '4966'];
                cities[57] = ['داوران', '4967'];
                cities[58] = ['خنامان', '4968'];
                cities[59] = ['کبوترخان', '4969'];
                cities[60] = ['هرمزآباد', '4970'];
                cities[61] = ['کشکوئیه', '4971'];
                cities[62] = ['گلشن', '4972'];
                cities[63] = ['فردوسیه', '4973'];
                cities[64] = ['بهجت آباد', '4974'];
                cities[65] = ['بهرمان', '4975'];
                cities[66] = ['جوادیه فلاح', '4976'];
                cities[67] = ['میمند', '4977'];
                cities[68] = ['برفه', '4978'];
                cities[69] = ['خورسند', '4979'];
                cities[70] = ['خبر', '4980'];
                cities[71] = ['کهرخ', '4981'];
                cities[72] = ['جوزم', '4982'];
                cities[73] = ['دهج', '4983'];
                cities[74] = ['دشتخاک', '4984'];
                cities[75] = ['برفوئیه', '4985'];
                cities[76] = ['حتکن', '4986'];
                cities[77] = ['ریحان', '4987'];
                cities[78] = ['جرجافک', '4988'];
                cities[79] = ['حصین', '4989'];
                cities[80] = ['یزدانشهر', '4990'];
                cities[81] = ['شعبجره', '4991'];
                cities[82] = ['ناچو', '4992'];
                cities[83] = ['سریز', '4993'];
                cities[84] = ['خانوک', '4994'];
                cities[85] = ['علی آبادسفلی', '4995'];
                cities[86] = ['جور', '4996'];
                cities[87] = ['هوتک', '4997'];
                cities[88] = ['کهنوج( مغزآباد)', '4998'];
                cities[89] = ['کاظم آباد', '4999'];
                cities[90] = ['هجدک', '5000'];
                cities[91] = ['حرجند', '5001'];
                cities[92] = ['نجف شهر', '5002'];
                cities[93] = ['بلورد', '5003'];
                cities[94] = ['ملک اباد', '5004'];
                cities[95] = ['حاجی آبادرضوان', '5005'];
                cities[96] = ['عمادآباد', '5006'];
                cities[97] = ['زیدآباد', '5007'];
                cities[98] = ['سعادت آباد', '5008'];
                cities[99] = ['دولت ابادتنگوئیه', '5009'];
                cities[100] = ['نگار', '5010'];
                cities[101] = ['گلزار', '5011'];
                cities[102] = ['لاله زار', '5012'];
                cities[103] = ['قلعه عسگر', '5013'];
                cities[104] = ['مومن آباد', '5014'];
                cities[105] = ['برین', '5015'];
                cities[106] = ['کمال آباد', '5016'];
                cities[107] = ['امیرآباد', '5017'];
                cities[108] = ['بزنجان', '5018'];
                cities[109] = ['رابر', '5019'];
                cities[110] = ['دهسرد(پتکان)', '5020'];
                cities[111] = ['ارزوئیه', '5021'];
                cities[112] = ['جبالبارز', '5022'];
                cities[113] = ['دولت اباداسفن', '5023'];
                cities[114] = ['بهرآسمان', '5024'];
                cities[115] = ['درب بهشت', '5025'];
                cities[116] = ['دولت ابادسکوچ', '5026'];
                cities[117] = ['گور', '5027'];
                cities[118] = ['رضی آباد', '5028'];
                cities[119] = ['هیحان علیا', '5029'];
                cities[120] = ['دهانه گمرکان', '5030'];
                cities[121] = ['قلعه گنج', '5031'];
                cities[122] = ['مردهک', '5032'];
                cities[123] = ['دوساری', '5033'];
                cities[124] = ['حسین آبادجدید', '5034'];
                cities[125] = ['بلوک', '5035'];
                cities[126] = ['رودبار', '5036'];
                cities[127] = ['نودژ', '5037'];
                cities[128] = ['فاریاب', '5038'];
                cities[129] = ['کیورآباد', '5039'];
                cities[130] = ['رائین قلعه', '5040'];
                cities[131] = ['سرخ قلعه', '5041'];
                cities[132] = ['رمشک', '5042'];
                cities[133] = ['حیدرآباد', '5043'];
                cities[134] = ['خیرآباد', '5044'];
                break;

            //هرمزگان
            case 'HRZ':
            case 'HG':
                cities[1] = ['بندرخمیر', '3750'];
                cities[2] = ['کیش', '3751'];
                cities[3] = ['قشم', '3752'];
                cities[4] = ['بستک', '3753'];
                cities[5] = ['بندر لنگه', '3754'];
                cities[6] = ['میناب', '3755'];
                cities[7] = ['دهبارز ـ رودان', '3756'];
                cities[8] = ['ایسین', '5045'];
                cities[9] = ['پل شرقی', '5046'];
                cities[10] = ['فین', '5047'];
                cities[11] = ['سیاهو', '5048'];
                cities[12] = ['فارغان', '5049'];
                cities[13] = ['باغات', '5050'];
                cities[14] = ['حاجی آباد', '5051'];
                cities[15] = ['خورگو', '5052'];
                cities[16] = ['شمیل', '5053'];
                cities[17] = ['حسن لنگی', '5054'];
                cities[18] = ['سیریک', '5055'];
                cities[19] = ['گونمردی', '5056'];
                cities[20] = ['گروک سفلی', '5057'];
                cities[21] = ['گوهرت', '5058'];
                cities[22] = ['درگهان', '5059'];
                cities[23] = ['سوزا', '5060'];
                cities[24] = ['هرمز', '5061'];
                cities[25] = ['جزیرهلارک', '5062'];
                cities[26] = ['جزیره هنگام', '5063'];
                cities[27] = ['جزیره سیری', '5064'];
                cities[28] = ['ابوموسی', '5065'];
                cities[29] = ['پدل', '5066'];
                cities[30] = ['کنگ', '5067'];
                cities[31] = ['دژگان', '5068'];
                cities[32] = ['رویدر', '5069'];
                cities[33] = ['دهنگ', '5070'];
                cities[34] = ['جناح', '5071'];
                cities[35] = ['کمشک', '5072'];
                cities[36] = ['گزیر', '5073'];
                cities[37] = ['مغویه', '5074'];
                cities[38] = ['چارک', '5075'];
                cities[39] = ['دشتی', '5076'];
                cities[40] = ['پارسیان', '5077'];
                cities[41] = ['جزیره لاوان', '5078'];
                cities[42] = ['جاسک', '5079'];
                cities[43] = ['بندر', '5080'];
                cities[44] = ['سندرک', '5081'];
                cities[45] = ['درپهن', '5082'];
                cities[46] = ['جگدان', '5083'];
                cities[47] = ['گوهران', '5084'];
                cities[48] = ['سردشت ـ بشاگرد', '5085'];
                cities[49] = ['گرهون', '5506'];
                cities[50] = ['جغین', '5507'];
                cities[51] = ['زیارت علی', '5508'];
                cities[52] = ['ماشنگی', '5509'];
                cities[53] = ['گوربند', '5510'];
                cities[54] = ['تیاب', '5511'];
                cities[55] = ['بندزک کهنه', '5512'];
                cities[56] = ['هشتبندی', '5513'];
                cities[57] = ['بندرعباس', '3551'];
                break;

            //چهارمحال و بختیاری
            case 'CHB':
            case 'CM':
                cities[1] = ['فرخ شهر', '2996'];
                cities[2] = ['دزک', '2997'];
                cities[3] = ['هفشجان', '2998'];
                cities[4] = ['هارونی', '2999'];
                cities[5] = ['سامان', '3000'];
                cities[6] = ['فارسان', '3001'];
                cities[7] = ['بروجن', '3002'];
                cities[8] = ['اردل', '3003'];
                cities[9] = ['لردگان', '3004'];
                cities[10] = ['شهرکرد', '3557'];
                cities[11] = ['کیان', '5219'];
                cities[12] = ['طاقانک', '5220'];
                cities[13] = ['خراجی', '5221'];
                cities[14] = ['دستنائ', '5222'];
                cities[15] = ['شلمزار ـ کیار', '5223'];
                cities[16] = ['گهرو', '5224'];
                cities[17] = ['سورشجان', '5225'];
                cities[18] = ['مرغملک', '5226'];
                cities[19] = ['سودجان', '5227'];
                cities[20] = ['چالشتر', '5228'];
                cities[21] = ['شورآب صغیر', '5229'];
                cities[22] = ['هوره', '5230'];
                cities[23] = ['مارکده', '5231'];
                cities[24] = ['نافچ', '5232'];
                cities[25] = ['وردنجان', '5233'];
                cities[26] = ['بن', '5234'];
                cities[27] = ['بردنجان', '5235'];
                cities[28] = ['باباحیدر', '5236'];
                cities[29] = ['میهه', '5237'];
                cities[30] = ['چلگرد ـ کوهرنگ', '5238'];
                cities[31] = ['شهریاری', '5239'];
                cities[32] = ['جونقان', '5240'];
                cities[33] = ['صمصامی', '5241'];
                cities[34] = ['تلورد', '5242'];
                cities[35] = ['نقنه', '5243'];
                cities[36] = ['فرادنبه', '5244'];
                cities[37] = ['سفیددشت', '5245'];
                cities[38] = ['بلداجی', '5246'];
                cities[39] = ['اورگان', '5247'];
                cities[40] = ['گندمان', '5248'];
                cities[41] = ['امام قیس', '5249'];
                cities[42] = ['ناغان', '5250'];
                cities[43] = ['دوپلان', '5251'];
                cities[44] = ['دورک', '5252'];
                cities[45] = ['سرخون', '5253'];
                cities[46] = ['عزیزآباد', '5254'];
                cities[47] = ['دشتک', '5255'];
                cities[48] = ['سرمور', '5256'];
                cities[49] = ['ارمندعلیا', '5257'];
                cities[50] = ['آلونی', '5258'];
                cities[51] = ['مال خلیفه', '5259'];
                cities[52] = ['چمنبید', '5260'];
                cities[53] = ['سردشت', '5261'];
                cities[54] = ['گرگر', '5262'];
                cities[55] = ['منجبرآفتاب', '5263'];
                break;

            //یزد
            case 'YZD':
            case 'YA':
                cities[1] = ['حمیدیا', '5610'];
                cities[2] = ['فراغه', '5264'];
                cities[3] = ['تیرجرد', '5265'];
                cities[4] = ['مهردشت', '5266'];
                cities[5] = ['اسفندآباد', '5267'];
                cities[6] = ['شاهدیه', '5268'];
                cities[7] = ['فهرج', '5269'];
                cities[8] = ['رستاق', '5270'];
                cities[9] = ['فجر', '5271'];
                cities[10] = ['ندوشن', '5272'];
                cities[11] = ['احمدآباد', '5273'];
                cities[12] = ['عقدائ', '5274'];
                cities[13] = ['نارستان', '5275'];
                cities[14] = ['زرین', '5276'];
                cities[15] = ['رباطات', '5277'];
                cities[16] = ['بفروئیه', '5278'];
                cities[17] = ['شهیدیه', '5279'];
                cities[18] = ['اسفیچ', '5280'];
                cities[19] = ['سبزدشت', '5281'];
                cities[20] = ['مبارکه', '5282'];
                cities[21] = ['بهاباد', '5283'];
                cities[22] = ['کوشک', '5284'];
                cities[23] = ['بنتان', '5285'];
                cities[24] = ['جلگه', '5286'];
                cities[25] = ['تنگ چنار', '5287'];
                cities[26] = ['میانکوه', '5288'];
                cities[27] = ['ارنان', '5289'];
                cities[28] = ['بهادران', '5290'];
                cities[29] = ['مروست', '5291'];
                cities[30] = ['فتح آباد', '5292'];
                cities[31] = ['پیشکوه', '5293'];
                cities[32] = ['نصرآباد', '5294'];
                cities[33] = ['علی آباد', '5295'];
                cities[34] = ['نیر', '5296'];
                cities[35] = ['شیرکوه', '5297'];
                cities[36] = ['بخگاریزات', '5298'];
                cities[37] = ['دهشیر', '5299'];
                cities[38] = ['محمد آباد', '5300'];
                cities[39] = ['خضر آباد', '5301'];
                cities[40] = ['رباط پشت بادام', '5302'];
                cities[41] = ['خرانق', '5303'];
                cities[42] = ['ساغند', '5304'];
                cities[43] = ['زارچ', '5305'];
                cities[44] = ['مهدی آباد', '5306'];
                cities[45] = ['احمدآبادمشیر', '5307'];
                cities[46] = ['شرب العین', '5308'];
                cities[47] = ['قوام آباد', '5309'];
                cities[48] = ['خویدک', '5310'];
                cities[49] = ['هرات ـ خاتم', '5311'];
                cities[50] = ['یزد', '3558'];
                cities[51] = ['اشکذر ـ صدوق', '3007'];
                cities[52] = ['اردکان', '3008'];
                cities[53] = ['میبد', '3009'];
                cities[54] = ['بافق', '3010'];
                cities[55] = ['مهریز', '3011'];
                cities[56] = ['تفت', '3012'];
                cities[57] = ['ابرکوه', '3005'];
                break;

            //سیستان و بلوچستان
            case 'SBN':
            case 'SB':
                cities[1] = ['نصرت آباد', '3046'];
                cities[2] = ['حاجی آباد', '3047'];
                cities[3] = ['میرجاوه', '3048'];
                cities[4] = ['دوست محمد ـ هیرمند', '3049'];
                cities[5] = ['زابل', '3050'];
                cities[6] = ['زهک', '3051'];
                cities[7] = ['خواجه احمد', '3052'];
                cities[8] = ['خاش', '3053'];
                cities[9] = ['سرباز', '3054'];
                cities[10] = ['بمپور', '3055'];
                cities[11] = ['سراوان', '3056'];
                cities[12] = ['سوران ـ سیب سوران', '3782'];
                cities[13] = ['چابهار', '3783'];
                cities[14] = ['کنارک', '3784'];
                cities[15] = ['نیک شهر', '3785'];
                cities[16] = ['زاهدان', '3564'];
                cities[17] = ['ایرانشهر', '3565'];
                cities[18] = ['نوک اباد', '5412'];
                cities[19] = ['حرمک', '5413'];
                cities[20] = ['پاسگاه تلسیاه', '5414'];
                cities[21] = ['محمدابادکورین', '5415'];
                cities[22] = ['گلوگاه', '5416'];
                cities[23] = ['گردجنگل', '5417'];
                cities[24] = ['میل هفتادودو', '5418'];
                cities[25] = ['انده', '5419'];
                cities[26] = ['تیمن', '5420'];
                cities[27] = ['لادیزعلیا', '5421'];
                cities[28] = ['کچهرود', '5422'];
                cities[29] = ['دیزوک', '5423'];
                cities[30] = ['قنات عیسی اباد', '5424'];
                cities[31] = ['سیادک', '5425'];
                cities[32] = ['خمک', '5426'];
                cities[33] = ['تحت عدالت', '5427'];
                cities[34] = ['برج میرگل', '5428'];
                cities[35] = ['جهان ابادعلیا', '5429'];
                cities[36] = ['پکک', '5430'];
                cities[37] = ['جانی اباد', '5431'];
                cities[38] = ['ادیمی', '5432'];
                cities[39] = ['تیموراباد', '5433'];
                cities[40] = ['دولت اباد', '5434'];
                cities[41] = ['لوتک', '5435'];
                cities[42] = ['سکوهه', '5436'];
                cities[43] = ['محمدآباد', '5437'];
                cities[44] = ['بنجار', '5438'];
                cities[45] = ['جزینک', '5439'];
                cities[46] = ['قلعه نو', '5440'];
                cities[47] = ['محمد شاهکرم', '5441'];
                cities[48] = ['سیاهسر', '5442'];
                cities[49] = ['ژالهای', '5443'];
                cities[50] = ['کرباسک', '5444'];
                cities[51] = ['نوراباد', '5445'];
                cities[52] = ['کارواندر', '5446'];
                cities[53] = ['ناصراباد', '5447'];
                cities[54] = ['بالاقلعه ایردگان', '5448'];
                cities[55] = ['کمن', '5449'];
                cities[56] = ['زیرگلدان', '5450'];
                cities[57] = ['بیت اباد', '5451'];
                cities[58] = ['گوهرکوه', '5452'];
                cities[59] = ['دهپابید', '5453'];
                cities[60] = ['ناذیل', '5454'];
                cities[61] = ['گوشه', '5455'];
                cities[62] = ['سنگان', '5456'];
                cities[63] = ['عشق آباد', '5457'];
                cities[64] = ['افضل اباد', '5458'];
                cities[65] = ['چانف', '5459'];
                cities[66] = ['اسماعیل کلک', '5460'];
                cities[67] = ['پارود', '5461'];
                cities[68] = ['راسک', '5462'];
                cities[69] = ['پیشین', '5463'];
                cities[70] = ['ایرفشان', '5464'];
                cities[71] = ['سرداب', '5465'];
                cities[72] = ['اسپکه', '5466'];
                cities[73] = ['پیپ', '5467'];
                cities[74] = ['بنت', '5468'];
                cities[75] = ['فنوج', '5469'];
                cities[76] = ['گلمورتی ـ دلگان', '5470'];
                cities[77] = ['هودیان', '5471'];
                cities[78] = ['بزمان', '5472'];
                cities[79] = ['کوشکوک ناهوک', '5473'];
                cities[80] = ['محمدی', '5474'];
                cities[81] = ['کلهگان(سردک)', '5475'];
                cities[82] = ['جالق', '5476'];
                cities[83] = ['سیرکان', '5477'];
                cities[84] = ['اسفندک', '5478'];
                cities[85] = ['کوهک', '5479'];
                cities[86] = ['گشت', '5480'];
                cities[87] = ['پسکو', '5481'];
                cities[88] = ['رگنتگ', '5482'];
                cities[89] = ['زابلی', '5483'];
                cities[90] = ['هیدوچ', '5484'];
                cities[91] = ['طیس', '5485'];
                cities[92] = ['تلنگ', '5486'];
                cities[93] = ['پلان', '5487'];
                cities[94] = ['نگور', '5488'];
                cities[95] = ['باهوکلات', '5489'];
                cities[96] = ['پسابندر', '5490'];
                cities[97] = ['پیرسهراب', '5491'];
                cities[98] = ['پایگاه کنارک', '5492'];
                cities[99] = ['کهیر هوتان', '5493'];
                cities[100] = ['شهدای کهیر', '5494'];
                cities[101] = ['زراباد', '5495'];
                cities[102] = ['مسکوتان', '5496'];
                cities[103] = ['کیتج', '5497'];
                cities[104] = ['دستگرد', '5498'];
                cities[105] = ['محنت', '5499'];
                cities[106] = ['چاهان', '5500'];
                cities[107] = ['هیمان', '5501'];
                cities[108] = ['قصرقند', '5502'];
                cities[109] = ['شگیم بالا', '5503'];
                cities[110] = ['کشیک', '5504'];
                cities[111] = ['ساربوک', '5505'];
                break;

            //ایلام
            case 'ILM':
            case 'IL':
                cities[1] = ['باکلکراب', '4772'];
                cities[2] = ['جعفرآباد', '4773'];
                cities[3] = ['شهرک شهید کشوری', '4774'];
                cities[4] = ['چوار', '4775'];
                cities[5] = ['حاجی بختیار', '4776'];
                cities[6] = ['چمن سیدمحمد', '4777'];
                cities[7] = ['شورابه ملک', '4778'];
                cities[8] = ['کلان', '4779'];
                cities[9] = ['زرنه', '4780'];
                cities[10] = ['توحید', '4781'];
                cities[11] = ['بلاوهتره سفلی', '4782'];
                cities[12] = ['لومار', '4783'];
                cities[13] = ['آسمان آباد', '4784'];
                cities[14] = ['قنات آباد', '4785'];
                cities[15] = ['شهرک سرنیک', '4786'];
                cities[16] = ['پیازآباد', '4787'];
                cities[17] = ['ایرج آباد', '4788'];
                cities[18] = ['ارمو', '4789'];
                cities[19] = ['چشمه شیرین', '4790'];
                cities[20] = ['بدره', '4791'];
                cities[21] = ['شهرک ولی عصر', '4792'];
                cities[22] = ['انجیرهنیشه کبد', '4793'];
                cities[23] = ['سراب باغ', '4794'];
                cities[24] = ['مورموری', '4795'];
                cities[25] = ['چمهندی', '4796'];
                cities[26] = ['موسیان', '4797'];
                cities[27] = ['بردی', '4798'];
                cities[28] = ['میمه', '4799'];
                cities[29] = ['پهله', '4800'];
                cities[30] = ['عین خوش', '4801'];
                cities[31] = ['دشت عباس', '4802'];
                cities[32] = ['شهرک اسلامیه', '4803'];
                cities[33] = ['صالح آباد', '4804'];
                cities[34] = ['ارکواز', '4805'];
                cities[35] = ['دولکبودخوشادل', '4806'];
                cities[36] = ['یاریاب', '4807'];
                cities[37] = ['ایلام', '3116'];
                cities[38] = ['ایوان', '3117'];
                cities[39] = ['سرابله ـ شیروان و چرداول', '3118'];
                cities[40] = ['دره شهر', '3119'];
                cities[41] = ['آبدانان', '3120'];
                cities[42] = ['دهلران', '3121'];
                cities[43] = ['مهران', '3122'];
                break;

            //کهگیلوییه و بویراحمد
            case 'KBD':
            case 'KB':
                cities[1] = ['دهدشت', '3726'];
                cities[2] = ['دوگنبد', '3727'];
                cities[3] = ['یاسوج', '3728'];
                cities[4] = ['سوق', '4915'];
                cities[5] = ['لنده', '4916'];
                cities[6] = ['لیکک', '4917'];
                cities[7] = ['چرام', '4918'];
                cities[8] = ['دیشموک', '4919'];
                cities[9] = ['قلعه رئیسی', '4920'];
                cities[10] = ['قلعه دختر', '4921'];
                cities[11] = ['باباکلان', '4922'];
                cities[12] = ['مظفرآباد', '4923'];
                cities[13] = ['دیل', '4924'];
                cities[14] = ['شاه بهرام', '4925'];
                cities[15] = ['چاه تلخاب علیا', '4926'];
                cities[16] = ['باشت', '4927'];
                cities[17] = ['سربیشه', '4928'];
                cities[18] = ['سپیدار', '4929'];
                cities[19] = ['نقارخانه', '4930'];
                cities[20] = ['گراب سفلی', '4931'];
                cities[21] = ['موشمی علیا', '4932'];
                cities[22] = ['میمند', '4933'];
                cities[23] = ['مارگون', '4934'];
                cities[24] = ['سیسخت', '4935'];
                cities[25] = ['مادوان', '5606'];
                break;

            //خراسان شمال
            case 'NKH':
            case 'KS':
                cities[1] = ['حصار گرمخانه', '5343'];
                cities[2] = ['فاروج', '5324'];
                cities[3] = ['بجنورد', '3560'];
                cities[4] = ['جاجرم', '2880'];
                cities[5] = ['قاضی', '2824'];
                cities[6] = ['پیش قلعه', '2830'];
                cities[7] = ['راز', '2831'];
                cities[8] = ['سنخواست', '2826'];
                cities[9] = ['شیروان', '2834'];
                cities[10] = ['صفی آباد', '2895'];
                cities[11] = ['اسفراین', '2892'];
                cities[12] = ['گرمه', '3023'];
                cities[13] = ['آشخانه ـ مانه و سلمقان', '3014'];
                cities[14] = ['شوقان', '3015'];
                cities[15] = ['درق', '3016'];
                cities[16] = ['لوجلی', '3017'];
                break;

            //خراسان جنوی
            case 'SKH':
            case 'KJ':
                cities[1] = ['سه قلعه', '5402'];
                cities[2] = ['قهستان', '5592'];
                cities[3] = ['اسلامیه', '5593'];
                cities[4] = ['زهان', '5391'];
                cities[5] = ['خوسف', '5367'];
                cities[6] = ['حاجی آباد', '5373'];
                cities[7] = ['نیمبلوک', '5374'];
                cities[8] = ['آیسک', '5375'];
                cities[9] = ['اسدیه ـ درمیان', '5376'];
                cities[10] = ['شوسف', '5383'];
                cities[11] = ['خضری', '5389'];
                cities[12] = ['سرایان', '5394'];
                cities[13] = ['بیرجند', '3563'];
                cities[14] = ['دشت بیاض', '2815'];
                cities[15] = ['اسفدن', '2833'];
                cities[16] = ['آرین شهر', '2891'];
                cities[17] = ['طبس', '3006'];
                cities[18] = ['مود', '3040'];
                cities[19] = ['سر بیشه', '3041'];
                cities[20] = ['نهبندان', '3042'];
                cities[21] = ['قائن ـ قائنات', '3043'];
                cities[22] = ['فردوس', '3044'];
                cities[23] = ['بشرویه', '3045'];
                break;

            //البرز
            case 'ABZ':
            case 'AL':
                cities[1] = ['کرج', '3351'];
                cities[2] = ['اشتهارد', '3821'];
                cities[3] = ['گلسار', '3850'];
                cities[4] = ['نظرآباد', '3587'];
                cities[5] = ['هشتگرد ـ ساوجبلاغ', '3591'];
                cities[14] = ['شهر جدید هشتگرد', '5618'];
                cities[6] = ['رباط کریم', '3620'];
                cities[7] = ['مشکین شهر', '5611'];
                cities[8] = ['محمدشهر', '5612'];
                cities[9] = ['ماهیدشت', '5613'];
                cities[10] = ['کمال شهر', '5614'];
                cities[11] = ['صفادشت', '5615'];
                cities[12] = ['فردوسیه', '5616'];
                cities[13] = ['چهارباغ', '5617'];
                break;

            default:
                cities[1] = ['لطفا استان خود را انتخاب کنید', '0'];
                break;
        }

        return cities.reduce((object, item) => ({...object, [item[0]]: item[0]}))
    },

    fill: (cityObject, stateKey) => {
        const cities = linkCities.cities(stateKey)
        if (!cities)
            return false

        linkHelper
            .selectFill(cityObject, cities)
    },

    fillByState: (stateSelector) => {
        const state = stateSelector instanceof jQuery ? stateSelector : jQuery(stateSelector)

        const citySelector = state.attr('data-city_field')
        const city = citySelector ? jQuery(`#${citySelector}`) : false

        if (!city)
            return false

        if (!state.val()) {
            return linkHelper
                .selectFill(city, 'ابتدا استان را انتخاب کنید')
        }

        return linkCities.fill(city, state.val())
    }
}

const linkNotice = {
    selector: () => jQuery('#le-notice'),
    init: function () {
        jQuery(document.body)
            .on('click', '#le-notice .le-close', this.close)
    },

    close: (event) => {
        linkNotice.selector().removeClass('show')
        setTimeout(() => linkNotice.selector().remove(), 300)
    },

    show: (status, content) => {
        const notice = linkNotice.html
            .replace('{{leNoticeContent}}', content)
            .replace('{{leNoticeStatus}}', status)

        jQuery('body')
            .append(notice)

        setTimeout(() => linkNotice.selector().addClass('show'), 100)
        setTimeout(() => jQuery(document).find('#le-notice .le-close').trigger('click'), 3000);
    },

    html: '<div id="le-notice" class="{{leNoticeStatus}}">\n' +
        '   <div class="le-notice-head">\n' +
        '            <button class="le-close">\n' +
        '                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\n' +
        '            </button>\n' +
        '        </div>\n' +
        '        <div class="le-notice-content">{{leNoticeContent}} </div>\n' +
        '</div>',

}

const linkHelper = {

    settings: link_express_object_data,

    isDeliveryPluginActive: 'is_wcdt_active' in link_express_object_data,

    isPwsActive: 'pws_active' in link_express_object_data,

    ajaxCall: (action, data, field) => {
        const args = {
            type: 'POST'
        }
        if (data instanceof FormData) {
            data.append('action', action)
            data.append('nonce', linkHelper.settings.ajax.nonce)
            args.processData = false
            args.contentType = false
            args.false = false
            args.enctype = 'multipart/form-data'
        } else {
            data.action = action
            data.nonce = linkHelper.settings.ajax.nonce
        }
        args.data = data

        return jQuery
            .ajax(ajaxurl, args)
            .always((result) => field.unblock())
    },

    showBlock: (elem) => {
        jQuery(elem).block({
            message: null, overlayCSS: {
                background: '#fff', opacity: 0.6
            }
        });
    },

    toEnglishDigits: (str) => {
        const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
        if (typeof str === 'string') {
            for (let i = 0; i < 10; i++) {
                str = str.replace(persianNumbers[i], i)
            }
        }
        return str;
    },

    persianDate: (date) => date.toLocale('en').toCalendar('persian').format('YYYY-MM-DD'),

    gregorianDate: (date) => date.toLocale('en').toCalendar('gregorian').format('YYYY-MM-DD'),

    initDatePicker: (element) => {
        const label = element.siblings('span.date_field_span');
        const defaultDate = label.attr('data-date');
        if (linkHelper.isDeliveryPluginActive) {

            if (defaultDate) {

                const dateLabel = new Date(element)
                label.html(linkHelper
                    .persianDate(new persianDate(dateLabel)))

            }
            label.persianDatepicker({
                format: 'YYYY-MM-DD', autoClose: true, onSelect: function (unix) {
                    const date = new persianDate(unix)
                    element.val(linkHelper.gregorianDate(date))
                    label.html(linkHelper.persianDate(date))
                }
            });
        } else {
            if (defaultDate) {
                const dateLabel = linkHelper.toEnglishDigits((new Date(defaultDate)).toLocaleDateString('fa-IR')).replace(/\//g, '-')

                label.html(dateLabel)
            }

            label.persianDatepicker({
                showGregorianDate: false, formatDate: "YYYY-MM-DD", onSelect: function () {
                    element.val(label.attr("data-gdate"));
                }
            });

        }
    },

    request: (action, args, blockSelector) => {

        const blocker = blockSelector instanceof jQuery ? blockSelector : jQuery(blockSelector)

        linkHelper.showBlock(blocker)

        return new Promise((resolve, reject) => {
            linkHelper.ajaxCall(action, args, blocker)
                .then(response => {
                    const {success, data} = response
                    if (!success) {
                        throw new Error(data)
                    }
                    resolve(data)
                })
                .catch((err) => {
                    console.log(err)
                    linkNotice.show('error', err.message !== undefined ? err.message : 'خطایی رخ داده است.')
                })
        })
    },

    capitalize: (word) => word.charAt(0).toUpperCase() + word.slice(1),

    selectFill: (field, data, mergeOptions, placeholder) => {

        if (data === undefined || !(data instanceof Object)) {
            placeholder = mergeOptions
            mergeOptions = data
            data = {}
        }

        if (placeholder === undefined && 'boolean' !== typeof mergeOptions) {
            placeholder = mergeOptions
            mergeOptions = false
        }

        placeholder = (placeholder === undefined || placeholder === true) ? 'انتخاب کنید' : placeholder

        mergeOptions = mergeOptions !== undefined ? mergeOptions : false

        data = !data ? {} : data

        if (!mergeOptions)
            field.find('option').remove()

        const option = (value, title) => jQuery('<option></option>').attr('value', value).text(title)


        if (placeholder)
            field.append(option('', placeholder))

        jQuery.each(data, (value, title) => field.append(option(value, title)))

        linkHelper.setSelected(field)
        // linkHelper.setNiceSelect(field)
    },

    setSelected: (field, defaultOption) => {
        defaultOption = defaultOption ? defaultOption : field.attr('data-default')

        const selected = () => {
            const dataKeys = [...field[0].options].map(item => item.value).filter(val => val)

            return (defaultOption && dataKeys.includes(defaultOption))
                ? defaultOption
                : dataKeys.length === 1 ? dataKeys[0] : ''
        }
        field.val(selected()).trigger('change')
    },

    snakeToCamel: (str) => {
        return str.replace(
            /(?!^)_(.)/g,
            (_, char) => char.toUpperCase()
        )
    },

    niceSelectObjects: {},

    setNiceSelect: (field) => {
        const fieldObject = field instanceof jQuery ? field : jQuery(field)

        const fieldWrapper = fieldObject.closest('.form-field')

        const niceChecker = fieldWrapper.length > 0 ? fieldWrapper : fieldObject

        if (!niceChecker.hasClass('is-nice'))
            return

        if (fieldWrapper.length > 0)
            fieldObject.addClass('wide')

        const options = niceChecker.hasClass('searchable')
            ? {
                searchable: true,
                searchtext: 'جستجو',
            }
            : {}

        options.selectedtext = 'مورد انتخاب شده'
        options.placeholder = 'انتخاب کنید'


        const fieldId = fieldObject.attr('id')
        const objects = linkHelper.niceSelectObjects
        if (fieldId in objects) {
            objects[fieldId].destroy()
            delete objects[fieldId]
        }

        linkHelper.niceSelectObjects[fieldId] = NiceSelect.bind(fieldObject[0], options)
    }
}

const linkModal = {
    selector: (find) => find ? jQuery(document).find('#le-modal').find(find) : jQuery(document).find('#le-modal'),

    init: function () {
        jQuery(document.body)
            .on('click', '#le-modal .le-close', this.close)
    },

    close: (event) => {
        event.preventDefault()

        linkModal.selector().removeClass('show')
        setTimeout(() => linkModal.selector().remove(), 300)

        const orderId = event.target.closest('button').dataset.order_id
        const container = jQuery(
            jQuery('body.woocommerce_page_wc-orders form[name="order"]').length > 0
                ? `div.postbox#link_express_actions .inside`
                : `tr#order-${orderId} td.link_express`
        )
        if( container.length === 0 )
            return false

        linkHelper
            .request('loadActions', {orderId}, container)
            .then(data => {
                container.html(data);
            })
    },

    show: (modalHead, modalContent, orderId, afterInitModal, beforeModal) => {

        if (!beforeModal)
            beforeModal = ''

        const popupContent = linkModal.html(orderId)
            .replace('{{leModalHead}}', modalHead)
            .replace('{{leModalContent}}', modalContent)
            .replace('{{beforeModalContent}}', beforeModal)

        jQuery('body').append(popupContent)

        if (afterInitModal !== undefined) {
            afterInitModal()
        }

        jQuery(document.body).trigger('wc-enhanced-select-init');


        setTimeout(function () {
            linkModal.selector().addClass('show');
        }, 100);

    },

    html: (orderId) => {
        return '<div id="le-modal">\n' +
            '    <div class="le-modal-form">\n' +
            '        <button class="le-close"  data-order_id="' + orderId + '">\n' +
            '            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\n' +
            '        </button>\n' +
            '        <h3>{{leModalHead}}</h3>\n' +
            '        {{beforeModalContent}}\n' +
            '        <div class="le-modal-content">{{leModalContent}} </div>\n' +
            '    </div>\n' +
            '</div>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    linkNotice.init()
    linkModal.init()
})
/* global link_express_object_data */

const link = {
    methods: () => linkModal.selector('.link-headings .method'),

    linkMethod: () => linkModal.selector('.link-headings .method.link'),

    otherMethod: () => linkModal.selector('.link-headings .method.other'),

    activeMethod: () => linkModal.selector('.link-headings .method.enable.active'),

    defaultMethod: (city) => {
        city = linkModal.selector('#city').val()

        const pType = linkModal.selector('#ptype').data('default')
        const activeMethod = link.canLinkActive(city) ? link.linkMethod() : link.otherMethod()

        if(!pType)
            return activeMethod

        const method = Object.entries(linkHelper.settings.p_type)
            .find((element) => element[1][pType] !== undefined)

        if(method === undefined)
            return activeMethod

        return link[linkHelper.snakeToCamel(`${method[0]}_method`)]()
    },

    init: function () {
        jQuery(document.body)
            .on(
                'click',
                'button.link-btn.has-action',
                event => {
                    const actionStr = jQuery(event.target.closest('button')).data('link-action')
                    const action = 'show' + linkHelper.capitalize(actionStr) + 'Modal'

                    if(typeof link[action] !== 'function') {
                        return false;
                    }

                    link[action](event)
                }
            )

            /**
             * api requests
             */
            .on('click', 'button.link-btn.action-TraceOrders', this.TraceOrders)
            .on('submit', 'form.form-submit__ready', this.linkAdd)
            .on('click', '#link-express-process-cancel-confirm', this.cancelOrder)
            .on('click', '#link-express-process-remove-confirm', this.removeOrder)

        jQuery(document.body)
            .on('click', '.link-headings button', this.changeMethod)
            .on('click', 'a.more-information', this.moreInfo)
            .on('change', '.form-submit__ready select[name="city"]', this.changeCity)
            .on('change', '.form-submit__ready select[name="state"]', this.changeState)
            .on('click', 'button#modal-dismiss', this.modalDismiss)

        this.onReady();
    },

    headings: () => '<div class="link-headings">' +
        '<button type="button" class="method link" name="method" value="link">ارسال با لینک</button>' +
        '<button type="button" class="method other" name="method" value="other">سایر روش‌ها</button>' +
        '</div>',

    showAddModal: (event) => {
        event.preventDefault()

        const orderId = event.target.dataset.order_id
        linkHelper
            .request('showAddModal', {orderId}, event.target)
            .then(data => {
                linkModal.show(
                    'ارسال درخواست به لینک اکسپرس',
                    data,
                    orderId,
                    () => {
                        linkCities.fillByState(linkModal.selector('#state'))
                        linkHelper.initDatePicker(linkModal.selector('#sendDate'))
                        linkModal.selector('select').map((key, select) => linkHelper.setNiceSelect(select))
                    },
                    link.headings()
                )
            })
    },

    showEditModal: (event) => {
        event.preventDefault()

        const orderId = event.target.dataset.order_id

        linkHelper
            .request('showEditModal', {orderId}, event.target)
            .then(data => {
                linkModal.show(
                    'ویرایش درخواست',
                    data,
                    orderId,
                    () => {
                        linkModal.selector('form').prepend(`<input type="hidden" name="request_edit" value="1">`)
                        linkCities.fillByState(linkModal.selector('#state'))
                        linkHelper.initDatePicker(linkModal.selector('#sendDate'))

                        const defaultMethod = link.defaultMethod()
                        if(defaultMethod.length) {
                            link.methods().removeClass('active')
                            defaultMethod.trigger('click')
                            linkHelper.setSelected(linkModal.selector('#ptype'))
                        }

                        linkModal.selector('select').map((key, select) => linkHelper.setNiceSelect(select))

                    },
                    link.headings()
                )
            })
    },

    showResendModal: (event) => {
        event.preventDefault()

        const orderId = event.target.closest('button').dataset.order_id

        linkHelper
            .request('showResendModal', {orderId}, event.target.closest('button'))
            .then(data => {
                linkModal.show(
                    'ثبت ارسال مجدد',
                    data,
                    orderId,
                    () => {
                        linkHelper.initDatePicker(linkModal.selector('#sendDate'))
                        linkModal.selector('select').map((key, select) => linkHelper.setNiceSelect(select))
                    },
                    link.headings()
                )
            })
    },

    showCancelModal: async (event) => {
        event.preventDefault()

        const orderId = event.target.dataset.order_id

        linkHelper
            .request('showCancelModal', {orderId}, event.target)
            .then(data => {
                linkModal.show('لغو درخواست', data, orderId)
            })
    },

    showTrackModal: async (event) => {
        event.preventDefault()

        const orderId = event.target.dataset.order_id

        linkHelper
            .request('showTrackModal', {orderId}, event.target)
            .then(data => {
                linkModal.show('رهگیری مرسوله', data, orderId)
            })
    },

    showRemoveModal: async (event) => {
        event.preventDefault()

        const orderId = event.target.dataset.order_id

        linkHelper
            .request('showRemoveModal', {orderId}, `#linkexpress-actions-${orderId}`)
            .then(data => {
                linkModal.show('حذف درخواست', data, orderId)
            })
    },

    linkAdd: (event) => {
        event.preventDefault()

        if (!link.formValidation(event))
            return false

        const form = jQuery(event.target).closest('form')
        const formData = new FormData(form[0])
        const action = () => {
            const val = form.find('input[name="request_edit"]').val()
            return (val && val.length > 0) ? 'linkEdit' : 'linkAdd'
        }

        linkHelper
            .request(action(), formData, form)
            .then(data => {
                linkNotice.show('success', data)
                link.modalDismiss()
            })
    },

    formValidation: (event) => {
        let isValid = true
        Object.values(event.target.elements).map((item) => {
            const object = jQuery(item)
            const validation = object.data('validation')

            if (!validation || !validation.length)
                return

            const label = object.closest('.form-field').find('label').text()

            const nodeType = object.prop('nodeName').toLowerCase()
            let value
            switch (nodeType) {
                case 'input':
                    value = object.val()
                    break
                case 'select':
                    value = object.find('option:selected').val()
                    break
                case 'textarea':
                    value = object.text()
                    break
            }

            if(validation.includes('required') && !value) {
                linkNotice.show('error', `${label} اجباری است`)
                isValid = false
            }
        })

        console.log(isValid)

        return isValid
    },

    TraceOrders: async (event) => {
        event.preventDefault()
        const button = jQuery(event.target).closest('button')
        linkHelper
            .request('TraceOrders', {}, button)
            .then((data) => {
                linkNotice.show('success', data)
            })
    },

    cancelOrder: async (event) => {
        event.preventDefault()

        const orderId = event.target.dataset.order_id
        const form = jQuery(event.target).closest('form')

        linkHelper
            .request('cancelOrder', {orderId}, form)
            .then((data) => {
                linkNotice.show('success', data)
                link.modalDismiss()
            })
    },

    removeOrder: async (event) => {
        event.preventDefault()

        const orderId = event.target.dataset.order_id
        const form = jQuery(event.target).closest('form')

        linkHelper
            .request('removeOrder', {orderId}, form)
            .then((data) => {
                linkNotice.show('success', data)
                link.modalDismiss()
            })
    },

    getActiveMethod: () => {
        const method = link.activeMethod()
        return method.length ? method.val() : ''
    },

    changeMethod: (event) => {
        const method = jQuery(event.target)

        if (!method.hasClass('enable'))
            return false

        if (method.hasClass('active'))
            return false

        method.siblings().removeClass('active')

        link.setMethod(method.val())
    },

    setMethod: (method) => {
        const methodSelector = link[linkHelper.snakeToCamel(`${method}_method`)]()
        if (!methodSelector.hasClass('enable')) {
            method = ''
        } else {
            methodSelector.addClass('active')
        }


        link.setPTypes(method)
    },

    moreInfo: (event) => {
        event.preventDefault()
        const button = jQuery(event.target)
        const fields = jQuery('.more-information__fields')

        if (!button.hasClass('active')) {
            button.addClass('active')
            fields.slideDown(300)
        } else {
            button.removeClass('active')
            fields.slideUp(300)
        }
    },

    canLinkActive: (city) => {
        return city in linkHelper.settings.supported_cities
    },

    setPTypes: (method) => {
        const types = method === 'link'
            ? linkHelper.settings.p_type['link']
            : linkHelper.settings.p_type['other']

        if (method === 'other') {
            link.otherMethodFieldsConditions()
        } else {
            link.linkMethodFieldsConditions()
        }

        linkHelper.selectFill(linkModal.selector('#ptype'), method === '' ? {} : types)
    },

    setShifts: (city) => {
        const shifts = city => {
            switch (city) {
                case 'تهران':
                case 'tehran':
                    return linkHelper.settings.shifts.tehran
                case '':
                    return false
                default:
                    return linkHelper.settings.shifts.other
            }
        }

        const placeholder = city === '' ? 'شهر را انتخاب کنید' : false
        linkHelper.selectFill(linkModal.selector('#shift'), shifts(city), placeholder)
    },

    changeCity: (event) => {
        const city = jQuery(event.target).find('option:selected').val()

        link.handleHeadings(city)
        link.setShifts(city)
        link.setPTypes(link.getActiveMethod())
    },

    changeState: () => linkCities.fillByState(linkModal.selector().find('#state')),

    modalDismiss: (event) => {
        if (event)
            event.preventDefault()

        linkModal.selector('.le-close').trigger('click')
    },

    handleHeadings: (city) => {
        if (!city) {
            link.methods().removeClass('enable')
            return
        }

        link.otherMethod().addClass('enable')
        if (link.canLinkActive(city))
            link.linkMethod().addClass('enable')


        if (link.activeMethod().length)
            return

        if (link.canLinkActive(city)) {
            link.linkMethod().addClass('active')
            link.linkMethodFieldsConditions()
        } else {
            link.otherMethod().addClass('active')
            link.otherMethodFieldsConditions()
        }
    },

    linkMethodFieldsConditions: () => {
        linkModal.selector('#ptype').closest('.form-field').addClass('hidden').find('select').data('validation', [])
        linkModal.selector('#weight').closest('.form-field').addClass('hidden').find('input').data('validation', [])

        linkModal.selector('#deliveryType').closest('.form-field').removeClass('hidden');
        linkModal.selector('#companyName').closest('.form-field').removeClass('hidden');
        linkModal.selector('#amount').closest('.form-field').removeClass('hidden');
        linkModal.selector('#return').closest('.form-field').removeClass('hidden');
        linkModal.selector('#shift').closest('.form-field').removeClass('hidden');

    },

    otherMethodFieldsConditions: () => {
        linkModal.selector('#ptype').closest('.form-field').removeClass('hidden').find('select').data('validation', ['required'])
        linkModal.selector('#weight').closest('.form-field').removeClass('hidden').find('input').data('validation', ['required'])

        linkModal.selector('#deliveryType').closest('.form-field').addClass('hidden');
        linkModal.selector('#companyName').closest('.form-field').addClass('hidden');
        linkModal.selector('#amount').closest('.form-field').addClass('hidden');
        linkModal.selector('#return').closest('.form-field').addClass('hidden');
        linkModal.selector('#shift').closest('.form-field').addClass('hidden');
    },

    onReady: () => {
        jQuery(document.body).find('select.is-nice').each((key, field) => {
            linkHelper.setNiceSelect(jQuery(field))
        });
    }
}

jQuery(function ($) {

    // link_express_object_data(linkHelper.settings) is required to continue, ensure the object exists
    if (typeof linkHelper.settings === 'undefined')
        return false

    link.init()

})