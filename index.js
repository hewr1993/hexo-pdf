hexo.extend.console.register( 'pdf', 'pdf generator', function(args, callback) {
   if (args._.length <= 0) {
	   console.log("Usage: hexo pdf [post.md]");
	   return;
   }
   var postname = args._[0];
   var baseDir = hexo.base_dir + "source/_posts/";
   if (!(hexo.render.isRenderable(baseDir + postname))) {
	   console.log("Something went wrong, please check the post.");
	   return;
   }
   hexo.render.render(path, [layout, 'post', 'page', 'index'], post);
   return;
   var fs = require('fs');
   hexo.call('generate', function(err){
      if (err) return callback(err);
      console.log('['+'info'.green+'] Now gzipping files ...');
      var start = Date.now();
      var traverseFileSystem = function (currentPath) {
         var files = fs.readdirSync(currentPath);
         for (var i in files) {
            var currentFile = currentPath + '/' + files[i];
            var stats = fs.statSync(currentFile);
            if (stats.isFile()) {
               if(currentFile.match(/\.(ico|html|js|css|json|xml|ttf|eot|ott|woff|svg)$/)) {
                  var gzip = zlib.createGzip();
                  var inp = fs.createReadStream(currentFile);
                  var out = fs.createWriteStream(currentFile+'.gz');
                  inp.pipe(gzip).pipe(out);
                  console.log('['+'create'.green+'] '+currentFile+'.gz');
               }
            }
           else if (stats.isDirectory()) {
                  traverseFileSystem(currentFile);
                }
          }
        };
      traverseFileSystem(baseDir+'public');
   });
});
