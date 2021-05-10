/**
 * 读取路径信息
 * @param {string} path 路径
 */
export declare const getStat: (path: string) => Promise<unknown>;
/**
 * 创建路径
 * @param {string} dir 路径
 */
export declare const mkdir: (dir: string) => Promise<unknown>;
/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
export declare const dirExists: (dir: string) => Promise<unknown>;
