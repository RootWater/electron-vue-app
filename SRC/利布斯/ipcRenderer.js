import ViewUI from 'view-design'

const {
    ipcRenderer
} = window.require('electron');
let timer = null; // 计时器

/**
 * 等待时使用遮罩层
 * @param {*} delay 延迟ms
 */
const useSpin = (delay = 100) => {
    timer = setTimeout(() => {
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
    }, delay);
}
/**
 * 渲染通讯类
 */
class IpcRenderer {
    constructor(options) {
        options = typeof options === 'object' ? options : {
            moduleName: options
        };
        const {
            moduleName = 'common', notUseSpin = [], spinDelay = 200
        } = options;
        this.moduleName = moduleName; // 当前模块名
        this.notUseSpin = notUseSpin; // 不使用加载遮罩的方法数组
        this.spinDelay = spinDelay; // 加载遮罩的延迟时间
    }
    send(method = '', params) {
        if (timer) {
            return;
        }
        if (!this.notUseSpin.includes(method)) {
            useSpin(this.delay);
        }
        ipcRenderer.send('async-msg', {
            moduleName: this.moduleName,
            method,
            params
        });
    }
    on(method = '', callback) {
        ipcRenderer.on(`${this.moduleName}-${method}`, (event, params) => {
            clearTimeout(timer);
            ViewUI.Spin.hide();
            callback && callback(event, params);
        });
    }
}

export default IpcRenderer
