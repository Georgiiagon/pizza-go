export let AppNotify = {};
import { Notification } from 'element-ui';

AppNotify.install = function (Vue, options) {
    Vue.prototype.$appNotify = {
        success: function (value) {
            if (typeof value === 'string') {
                value = [value];
            }

            if (!Array.isArray(value)) {
                console.error('Notify: Bad content');
                return false;
            }

            value.forEach(function (text) {
                if (typeof text !== 'string') {
                    console.error('Notify: Bad content');
                    return false;
                }

                _.defer(function() {
					Notification.success({
						title: 'Success',
						message: text,
					});
				});
            });

            return true;
        },
        error: function (value) {
            if (typeof value === 'string') {
                value = [value];
            }

            else if (typeof value === 'object') {
                let list = [];

                for (let key in value.errors) {
                    list.push(value.errors[key][0]);
                }

                if (list.length <= 0 && value.message) {
                    list.push(value.message);
                }

                value = list;
            }

            value.forEach(function (text) {
                if (typeof text !== 'string') {
                    console.error('Notify: Bad content');
                    return false;
                }

				_.defer(function() {
					Notification.error({
						title: 'Error',
						message: text,
					});
				});
            });

            return true;
        }
    }
};
