import {processArgvType} from "../model/Argv";
import * as path from "path";
import  * as dirTool from './dirTool';
import dayjs from "dayjs";
const fs = require('fs');
const archiver = require('archiver');



const getArgvData=(dataArray:Array<any>)=>{
        console.log("命令行:> txwzip-cli name=fileName  dir=./dd/  out=publish version=正式")
        let processArgv:any={};
        for (let i in dataArray){
            let a=dataArray[i];
            if(a.indexOf('=')>-1){
                processArgv[a.substring(0,a.indexOf("="))]=a.substring(a.indexOf("=")+1);
            }
        };
        return processArgv
}

const zip=(processArgv:processArgvType)=>{

    if(!processArgv.name){
        console.error("请输入压缩后文件名，格式：txwzip-cli name=fileName  dir=./dd/  out=publish version=正式");
        return
    }

    if(!processArgv.dir){
        console.error("请输入要压缩的目录，格式：txwzip-cli name=fileName  dir=./dd/  out=publish version=正式");
        return
    }

    if(!processArgv.out){
        console.error("请输入要输出到目录，格式：txwzip-cli name=fileName  dir=./dd/  out=publish version=正式");
        return

    }

    const resolve = (dir:any) => path.join(process.cwd(), dir);

    //const publishPath = resolve("publish");

    const publishPath = resolve(processArgv.out);
    const compressDir = resolve(processArgv.dir);

    dirTool.dirExists(publishPath)
        .then((r:any) => {
            console.log("publish dir is  existed"+ r);
            console.log("compress dir is "+compressDir)
            console.log("publish dir is "+ publishPath);

            const version=processArgv.version?processArgv.version:'';
            const zipName = (() => `${publishPath}/${processArgv.name+dayjs().format("YYYY年MM月DD日HH时mm分ss秒")}-` + version + '.zip')();
            const output = fs.createWriteStream(zipName);
                  output.on('close', function () {
                console.log(archive.pointer() + ' total bytes');
                console.log('archiver has been finalized and the output file descriptor has closed.');
            });
                  output.on('end', function () {
                console.log('Data has been drained');
            });

            const archive = archiver('zip', {
                zlib: {level: 9} // Sets the compression level.
            });
                  archive.on('error', function (err:any) {
                throw err;
            });
                  archive.pipe(output); // pipe archive data to the file
            // append files from a sub-directory, putting its contents at the root of archive
            // archive.directory(resolve("/dist/"), false);
                  archive.directory(compressDir, false);
                  archive.on('warning', function (err:any) {
                if (err.code === 'ENOENT') {
                    // log warning
                } else {
                    // throw error
                    throw err;
                }
            });
                  archive.finalize();

        })
        .catch((err:any) => {
            console.log(err);
        });

}

export const execZip=()=>{
    let agrvs=process.argv
    zip(getArgvData(agrvs))
}











