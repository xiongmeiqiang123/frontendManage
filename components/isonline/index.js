import {startsWith} from 'lodash'

export const isProduction = process.env.NODE_ENV === 'production'
export const isLocal = window.location.href.match('localhost')
const _isPreview = window.location.href.match('preview');
const isProd =  isProduction && !isLocal;
export default isProd;

export function joinPath(page='', hash) {
    if(!startsWith(page, '/')){
        page = '/' + page
    }
    // return isProd ? `/mqsas${page}/index.html#${hash}`:`${page}#${hash}`;
    return `/mqsas${page}/index.html#${hash}`;
}


//本地  /${moduleName} + hash
// 线上　/mqsas/${moduleName}/index.html + hash

export function getModuleNameFromUrl(url= window.location.pathname) {
    let regex = /(\/mqsas)?(.*)(\/index.html)?/
    if(url.match('index.html')) {
        regex = /(\/mqsas)?(.*)(\/index.html)/
    }
    return regex.exec(url)[2]
}

export function getPathnameFromUrl() {
    let hash = window.location.hash
    // console.log("hash", hash)
    hash = hash.match(/(.*)\?(.*)(_k=.*)?/);
    // console.log(hash,'hash');
    if(hash) {
        return window.location.pathname + hash[1]
    }else {
        return undefined;
    }
}


export const isPreview = isProduction && _isPreview;
