<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="less">
    html,
    body,
    #app {
        height: 100vh;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
