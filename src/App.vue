<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="less">
* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
}

html,
body,
#app {
    height: 100vh;
}

body {
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #c1c1c1;
        border-left: 1px solid #c1c1c1;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        background-color: #fbfcfc;
        border: 1px solid transparent;
        border-left: 1px solid #ededed;
        border-radius: 10px;
    }
}

.user-select {
    -webkit-user-select: text;
    -moz-user-select: text;
    -o-user-select: text;
    user-select: text;

    & * {
        -webkit-user-select: text;
        -moz-user-select: text;
        -o-user-select: text;
        user-select: text;
    }
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}
</style>
