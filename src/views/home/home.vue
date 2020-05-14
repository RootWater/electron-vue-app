<template>
    <div class="home">
        <img alt="Vue logo"
             src="../../assets/images/logo.png">
    </div>
</template>

<script>
import IpcRenderer from "@/libs/ipcRenderer";
const ipc = new IpcRenderer("home");

export default {
    name: "home",
    methods: {
        trySend() {
            ipc.on('logMsg', (e, params) => {
                console.log(params);
            });
            ipc.send("logMsg", 1);
        }
    },
    created() {
        this.trySend();
    }
};
</script>

<style lang="less">
</style>
