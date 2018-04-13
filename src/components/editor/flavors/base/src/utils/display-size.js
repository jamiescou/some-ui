/**
 * 格式化输出文件大小
 * @param  {[int]} bytes [文件大小 单位为字节]
 * @param decimals 保留小数点位数
 * @return {[string]}      [文件大小]
 */
export default function displaySize(bytes, decimals = 0) {
    if (!bytes) {
        return '0 B';
    }
    let k = 1000; // 二进制时用 1024
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}
