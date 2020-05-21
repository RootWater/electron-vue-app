import {
    Notice
} from 'view-design';
/**
 * 自定义提示
 * @param {*} param0 state: 结果状态, successMsg: 成功的提示消息, errorMsg: 失败的提示消息, successCallback: 成功回调, errorCallback: 失败回调
 */
export function customNotice({
    state = true,
    successMsg = '成功',
    errorMsg = '失败',
    successCallback,
    errorCallback
}) {
    const noticeConfig = {
        type: state ? 'success' : 'error',
        title: '系统提示',
        desc: state ? successMsg : errorMsg
    };
    if (state) {
        successCallback && successCallback();
    } else {
        errorCallback && errorCallback();
    }
    Notice[noticeConfig.type](noticeConfig);
}
