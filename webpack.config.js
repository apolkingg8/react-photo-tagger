

module.exports = {
    entry: './src/Wrap',
    output: {
        filename: "./react-photo-tagger.js",
        sourceMapFilename: "./react-photo-tagger.map.js",
        library: 'ReactPhotoTagger',
        libraryTarget: 'umd'
    },
    externals: [
        {
            "react": {
                root: "React",
                commonjs2: "react",
                commonjs: "react",
                amd: "react"
            }
        }
    ],
    module: {
        loaders: [

        ]
    }
};