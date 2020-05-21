import {
    dialog
} from 'electron';

export default {
    /**
     * 选择文件
     * @param {*} params 参数
     * @param {*} win 窗体
     */
    async openDialog({
        title = '请选择文件',
        filters = [{
            name: '文件'
        }],
        properties = ['openFile']
    }, win) {
        const result = await dialog.showOpenDialog(win, {
            title,
            filters,
            properties
        });
        if (result.canceled) {
            return {
                selected: false
            };
        } else {
            return {
                selected: true,
                filePath: result.filePaths[0]
            };
        }
    }
}
