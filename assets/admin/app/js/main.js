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