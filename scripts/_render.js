var ejs = require('ejs');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var upFirst = str => {
    var str = str.toLowerCase();
    str = str.replace(/\b\w+\b/g, word =>
    word.substring(0,1).toUpperCase()+word.substring(1));
    return str.replace('-','');
};

fs.readdir(path.join(__dirname, '../src/components'), (err, fd) => {
    // => [Error: EISDIR: illegal operation on a directory, open <directory>]
    var dirsArray = [];
    var reg= /^[.]/;
    _.map(fd,v => {
        if (!reg.test(v)){
            var url = path.join(__dirname, `../src/components/${v}/index.example.jsx`);
            var exists = fs.existsSync(url);
            if (exists) {
                dirsArray.push({
                    name: upFirst(v),
                    url: `../../src/components/${v}`,
                    element: `<${upFirst(v)} />`,
                    files: v
                });
            }
        }
    });

    ejs.renderFile(path.join(__dirname, '../site/layout/_main.ejs'), {components:dirsArray}, null, function(err, str){
        fs.writeFile(path.join(__dirname, '../site/layout/main.jsx'), str, (err) => {
            if (err) throw err;
            console.log('It\'s main saved!');
        });
    });

    ejs.renderFile(path.join(__dirname, '../site/layout/_sidebar.ejs'), {components:dirsArray}, null, function(err, str){
        fs.writeFile(path.join(__dirname, '../site/layout/sidebar.jsx'), str, (err) => {
            if (err) throw err;
            console.log('It\'s sidebar saved!');
        });
    });

    ejs.renderFile(path.join(__dirname, '../src/components/_index.ejs'), {components:dirsArray}, null, function(err, str){
        fs.writeFile(path.join(__dirname, '../src/components/index.js'), str, (err) => {
            if (err) throw err;
            console.log('It\'s components saved!');
        });
    });
})
fs.readdir(path.join(__dirname, '../src/base-components'), (err, fd) => {
    // => [Error: EISDIR: illegal operation on a directory, open <directory>]
    var dirsArray = [];
    var reg= /^[.]/;
    _.map(fd,v => {
        if (!reg.test(v)){
            var url = path.join(__dirname, `../src/base-components/${v}/index.jsx`);
            var exists = fs.existsSync(url);
            if (exists) {
                dirsArray.push({
                    name: upFirst(v),
                    url: `../../src/components/${v}`,
                    element: `<${upFirst(v)} />`,
                    files: v
                });
            }
        }
    });

    ejs.renderFile(path.join(__dirname, '../src/base-components/_index.ejs'), {components:dirsArray}, null, function(err, str){
        fs.writeFile(path.join(__dirname, '../src/base-components/index.js'), str, (err) => {
            if (err) throw err;
            console.log('It\'s base-components saved!');
        });
    });
});

