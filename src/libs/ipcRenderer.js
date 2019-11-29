const {ipcRenderer} = window.require('electron');

export const onReceiveMsg = (func, callback) => {
    ipcRenderer.on(func, (event, params) => {
        ViewUI.Spin.hide();
        callback(event, params);
    });
};

const sendAsyncMsg = (func, params) => {
    ViewUI.Spin.show({
        render: (h) => {
            return h('div', [
                h('Icon', {
                    'class': 'demo-spin-icon-load',
                    props: {
                        type: 'ios-loading',
                        size: 18
                    }
                }),
                h('div', 'Loading')
            ])
        }
    });
    ipcRenderer.send(func, params);
};
