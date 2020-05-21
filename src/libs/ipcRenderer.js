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
                    h(ViewUI.Icon, {
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
 * 清除计时器
 */
const clearTimer = () => {
    clearTimeout(timer);
    timer = null;
}
/**
 * 渲染通讯类
 */
class IpcRenderer {
    constructor(options) {
        options = typeof options === 'object' ? options : {
            moduleName: options || 'common'
        };
        const {
            moduleName = 'common', notUseSpin = [], spinDelay = 100
        } = options;
        this.moduleName = moduleName; // 当前模块名
        this.notUseSpin = notUseSpin; // 不用加载遮罩的方法数组
        this.spinDelay = spinDelay; // 加载遮罩的延迟时间
    }
    /**
     * 给主进程发送消息执行某方法
     * @param {*} method 需要执行的方法名
     * @param {*} params 需要执行的方法参数
     * @param {*} moduleName 模块名
     */
    send(method = '', params, moduleName) {
        if (timer) {
            return;
        }
        if (!this.notUseSpin.includes(method)) {
            useSpin(this.delay);
        }
        ipcRenderer.send('async-msg', {
            moduleName: moduleName || this.moduleName,
            method,
            params
        });
    }
    /**
     * 监听主进程消息
     * @param {*} method 监听主进程响应的方法名
     * @param {*} callback 响应回调
     * @param {*} moduleName 模块名
     * @param {*} once 是否只监听一次回调
     */
    on(method = '', callback, { moduleName = '', once = true, errorCallback }) {
        ipcRenderer[once ? 'once' : 'on'](`${moduleName || this.moduleName}-${method}`, (event, {
            success,
            data,
            error
        }) => {
            clearTimer(timer);
            ViewUI.Spin.hide();
            if (success) {
                callback && callback(data, error);
            } else {
                ViewUI.Notice.error({
                    title: '系统消息',
                    render: (h) => (
                        <section>
                            <div class="ivu-notice-desc">{error.module}</div>
                            <div class="ivu-notice-desc">{error.method}</div>
                            <div class="ivu-notice-desc">{error.message}</div>
                        </section>
                    )
                });
                errorCallback && errorCallback(error);
            }
        });
    }
    /**
     * 一次执行发送和监听两个函数，用于简写代码
     * @param {*} method 需要执行和监听的方法名
     * @param {*} params 需要执行的方法参数
     * @param {*} callback 监听回调
     * @param {*} moduleName 模块名
     * @param {*} once 是否只监听一次回调
     */
    once(method = '', params, callback, { moduleName = '', once }) {
        this.on(method, callback, { moduleName, once });
        this.send(method, params, moduleName);
    }
    /**
     * 监听来自主进程的消息
     * @param {*} method 需要执行和监听的方法名
     * @param {*} callback 监听回调
     * @param {*} moduleName 模块名
     * @param {*} once 是否只监听一次回调
     */
    winOn(method, callback, { moduleName, once = false }) {
        ipcRenderer[once ? 'once' : 'on'](`${moduleName || this.moduleName}-${method}`, (event, data) => {
            callback && callback(data);
        });
    }
}

export default IpcRenderer
