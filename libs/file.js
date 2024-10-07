(function(){
    const File = java.io.File;
    const {
        Files,
        Paths,
        StandardCopyOption,
        StandardOpenOption
    } = java.nio.file;
    const javaString = java.lang.String;
    let javaScope = new JavaImporter(java.io, java.lang, java.lang.reflect, java.util.Vector);

    function deleteFiles(fileName) {
        let file = new File(fileName);
        if (!file.exists()) {
            //log("删除文件失败：" + fileName + "文件不存在");
            return false;
        } else {
            if (file.isFile()) {
                return deleteFile(fileName);
            } else {
                return deleteDirectory(fileName);
            }

        }

    }
    /**
     * 删除单个文件
     *
     * @param fileName
     *            被删除文件的文件名
     * @return 单个文件删除成功返回true,否则返回false
     */
    function deleteFile(fileName) {
        let file = new File(fileName);
        if (file.isFile() && file.exists()) {
            file.delete();
            //log("删除单个文件" + fileName + "成功！");
            return true;
        } else {
            //log("删除单个文件" + fileName + "失败！");
            return false;
        }

    }
    /**
     * 删除目录（文件夹）以及目录下的文件
     *
     * @param dir
     *            被删除目录的文件路径
     * @return 目录删除成功返回true,否则返回false
     */
    function deleteDirectory(dir) {
        // 如果dir不以文件分隔符结尾，自动添加文件分隔符
        if (!dir.endsWith(File.separator)) {
            dir = dir + File.separator;
        }
        let dirFile = new File(dir);
        // 如果dir对应的文件不存在，或者不是一个目录，则退出
        if (!dirFile.exists() || !dirFile.isDirectory()) {
            //log("删除目录失败" + dir + "目录不存在！");
            return false;
        }
        let flag = true;
        // 删除文件夹下的所有文件(包括子目录)
        let files = dirFile.listFiles();
        for (let i = 0; i < files.length; i++) {
            // 删除子文件
            if (files[i].isFile()) {
                flag = deleteFile(files[i].getAbsolutePath());
                if (!flag) {
                    break;
                }
            } else { // 删除子目录
                flag = deleteDirectory(files[i].getAbsolutePath());
                if (!flag) {
                    break;
                }
            }
        }
        if (!flag) {
            //log("删除目录失败");
            return false;
        }
        // 删除当前目录
        if (dirFile.delete()) {
            //log("删除目录" + dir + "成功！");
            return true;
        } else {
            //log("删除目录" + dir + "失败！");
            return false;
        }
    }
    //copy单个文件
    function copyFile(source, target, isCover){
        let sourcePath = Paths.get(source);
        let targetPath = Paths.get(target);
        let isExist = Files.exists(targetPath);
        if(Files.isDirectory(sourcePath)||(isExist&&!isCover)||(isExist&&Files.isDirectory(targetPath))){
            return false;
        }
        try{
            if(!isExist){
                Files.createDirectories(targetPath.getParent());
            }
            if(isCover === true){
                Files.copy(sourcePath, targetPath, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.COPY_ATTRIBUTES);
                return true;
            } else {
                Files.copy(sourcePath, targetPath, StandardCopyOption.COPY_ATTRIBUTES);
                return true;
            }
        } catch(e) {
            return false;
        }
    }

    /**
     *
     * @param source 源文件夹
     * @param target 目标文件夹
     * @param pattern 0：格式化目标文件夹在复制  1：不格式化但覆盖目标文件夹里重复的文件 2：跳过已经有的文件
     * @returns {boolean|*|boolean}
     */
    function copyDirs(source, target, pattern){
        pattern = pattern || 0;
        let sourceDir = new File(source);
        let targetDir = new File(target);
        if(pattern === 0&&targetDir.exists()&&targetDir.isDirectory()){
            if(!deleteFiles(target)) return false;
        }
        if(targetDir.isFile()&&targetDir.exists()){
            if(pattern === 0){
                if(!deleteFiles(target)) return false;
            }else{
                return false;
            }
        }
        let copy;
        if(pattern===0||pattern===1){
            copy=(source, target)=>copyFile(source, target, true);
        }else if(pattern===2){
            copy=(source, target)=>copyFile(source, target, false);
        }else{
            return false;
        }
        return copyDir(sourceDir, targetDir, copy);
    }
    function copyDir(sourceDir, targetDir, copy){
        let files = sourceDir.listFiles();
        if(files == null) return false;
        for(let file of files){
            let file1 = new File(targetDir, file.getName());
            if(file.isFile()){
                return copy(file.toString(),file1.toString());
            } else {
                file1.mkdir();
                return copyDir(file,file1, copy);
            }
        }
    }
    function forEachs(options){
        let v = Object.assign({
            baseDir: "",
            targetDepth: 5,
            isIgnoreDir: true,
            callback: null
        }, options);
        if(!v.baseDir || typeof v.callback!=="function"){
            throw new Error("参数错误");
        }
        v.baseDir=new File(v.baseDir);
        forEach(v.baseDir,v.targetDepth,v.isIgnoreDir,v.callback);
    }
    function forEach(baseDir, targetDepth, isIgnoreDir, callback, depth) {
        depth = depth || 0;
        if (!baseDir.exists() || !baseDir.isDirectory() || depth >= targetDepth) {
            return;
        }
        let files = baseDir.listFiles();
        if(files == null){
            return;
        }
        for (let file of files) {
            let isDirectory = file.isDirectory();
            if ((!isIgnoreDir&&isDirectory)||!isDirectory) {
                callback({
                    name: String(file.getName()),
                    path: String(file.getPath()),
                    isDirectory: isDirectory
                });
            }
            if (isDirectory) {
                forEach(file, targetDepth, isIgnoreDir, callback, depth + 1);
            }
        }
    }
    function getFileTime(path) {
        let file = new File(path);
        let lastModified = file.lastModified();
        let date = new Date(lastModified);
        return date.getTime();
    }

    function getName(path) {
        return new File(path).getName() + "";
    }

    function getFilePath(path, type, expand) {
        type = type || "file";
        if (!["file", "dir"].includes(type)) throw new Error("类型错误");
        let fileType = type === "file" ? "isFile" : "isDirectory";
        let file = new File(path);
        let array = file.listFiles() || [];
        let pathList = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i][fileType]()) {
                pathList.push({
                    name: array[i].getName() + "",
                    path: array[i].getPath() + ""
                });
            }
        }
        if (expand) {
            pathList = pathList.filter(it => it.name.endsWith(expand));
        }
        return pathList;
    }

    function renameFile(fromPath, name, isCover) {
        isCover=isCover||false;
        let fromFile = new File(fromPath);
        let toFile = new File(fromFile.getParent() + "/" + name);

        try {

            if (!fromFile.exists()) {
                return false;
            }
            if(String(fromFile.toString())===String(toFile.toString())){
                return false;
            }
            if (toFile.exists()) {
                if (isCover&&!deleteFiles(toPath)) {
                    return false;
                } else if(!isCover){
                    return false;
                }
            }
            Files.move(fromFile.toPath(), toFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            return toFile.toString();
        } catch (e) {
            log(e.toString());
            return false;
        }
    }

    function moveFiles(fromPath, toPath) {
        let fromFile = new File(fromPath);
        let toFile = new File(toPath);
        try {
            if (!fromFile.exists()) {
                return false;
            }
            if (toFile.exists()) {
                if (!deleteFiles(toPath)) {
                    return false;
                }
            }
            Files.move(fromFile.toPath(), toFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            return true;
        } catch (e) {
            log(e.toString());
            return false;
        }
    }

    function fileWrite(path, content) {
        writeFile("file://" + path, content)
    }

    function fileWriteAppend(path, content) {
        let file = new File(path);
        let paths = file.toPath();
        if (file.exists()) {
            Files.write(paths, new javaString(content).getBytes(), StandardOpenOption.APPEND);
        } else {
            writeFile("file://" + path, content);
        }
    }

    function getTotalSizeOfFilesInDir(file) {
        if (file.isFile()) {
            return file.length();
        }
        let children = file.listFiles();
        let total = 0;
        if (children != null) {
            for (let child of children) {
                total += getTotalSizeOfFilesInDir(child);
            }
        }
        return total;
    }

    function getFileSize(filePath) {
        //Byte
        let size = getTotalSizeOfFilesInDir(new File(filePath));
        if (size < 0) {
            return null;
        }
        let unitForm = ["Byte", "KB", "MB", "GB", "TB"];
        for (let i = 0, len = unitForm.length; i < len; i++) {
            if (size > 1024) {
                size /= 1024;
                continue;
            } else {
                return Math.ceil(size) + unitForm[i];
            }
        }
        return "ERROR:数值过大";
    }

    function fileRule(filesInput, fileOut, intercept) {
        with(javaScope) {
            const BUFFER_SIZE = 0x300000;
            let tmpFile = new File(filesInput);
            if(!(tmpFile.exists()&&tmpFile.isFile())){
                return false;
            }
            let outFile = new File(fileOut);

            let tis = new FileInputStream(tmpFile);
            let os = new BufferedOutputStream(new FileOutputStream(outFile));
            let len = 0;
            let bys = Array.newInstance(Byte.TYPE, BUFFER_SIZE);
            while ((len = tis.read(bys)) != -1) {
                let nbys = intercept(new String(bys,0,len));
                os.write(nbys, 0, nbys.length);
            }
            tmpFile.delete();
            tis.close();
            os.close();
            return true;
        }
    }
    function readFile(path) {
        try {
            let paths = Paths.get(path);
            if (!Files.exists(paths)) return "";
            return String(new javaString(Files.readAllBytes(paths)));
        } catch {
            return "";
        }
    }
    return {
        getFileTime: (path) => getFileTime(path),
        getFilePath: (path, type, expand) => getFilePath(path, type, expand),
        deleteFiles: (path) => deleteFiles(path),
        renameFile: (path, name, isCover) => renameFile(path, name, isCover),
        moveFiles: (fromPath, toPath) => moveFiles(fromPath, toPath),
        fileWrite: (path, content) => fileWrite(path, content),
        fileWriteAppend: (path, content) => fileWriteAppend(path, content),
        getName: (path) => getName(path),
        getFileSize: (filePath) => getFileSize(filePath),
        fileRule: (filesInput, fileOut, intercept) => fileRule(filesInput, fileOut, intercept),
        copyFile: (source, target, isCover) => copyFile(source, target, isCover),
        copyDirs: (source, target, pattern) => copyDirs(source, target, pattern),
        forEachs: (options) => forEachs(options),
        readFile: (path) => readFile(path)
    }
})()