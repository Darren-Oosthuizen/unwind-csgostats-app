module.exports = {
    target: 'node',
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],// other stuff
        fallback: {
            assert:  require.resolve("assert/"),
            timers: require.resolve("timers-browserify"),
            process: require.resolve("process/browser"),
        }
    }
};

