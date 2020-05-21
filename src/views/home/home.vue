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

<style lang="less">
</style>
