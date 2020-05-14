const files = require.context('./', false, /(?<!index|tools)(\.js)$/);
const Methods = {};

files.keys().forEach(key => {
    Methods[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default Methods;
