# electron-vue-app

## 项目介绍
```
用于快速创建基于VueCli3的Electron桌面程序。
```

### 项目依赖安装
```
npm install
```

### 运行开发环境
```
npm run e:d
```

### 运行打包
```
npm run e:b
```

### 安装软件
```
npm run postinstall
```

### 卸载软件
```
npm run postuninstall
```

### 使用方式
```
// 在ipcMain中创建js文件，一个文件为一个模块，里面所有方法为当前模块方法，建议均使用同步方法
// 项目已采用自动化模块加载，创建文件后只需编写业务逻辑，其他无需进行其他操作即可引用
export default {
    logMsg(params) {
        console.log(params);
    }
}

// 在页面组件中通过注册ipcRenderer进行通信，项目中对ipcRenderer进行了二次封装，更好的使用和统一的错误管理
// 具体的使用方法可参考libs中的ipcRenderer进行查阅
<script>
import IpcRenderer from "@/libs/ipcRenderer";

const ipc = new IpcRenderer("home");

export default {
    name: "home",
    methods: {
        trySend() {
            ipc.once("logMsg", null, data => {
                console.log(data);
            });
        }
    },
    created() {
        this.trySend();
    }
};
</script>
```
