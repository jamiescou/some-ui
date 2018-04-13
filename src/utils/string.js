const upFirstLetter = str => {
    let _str = str.toLowerCase();
    _str = _str.replace(/\b\w+\b/g, word => word.substring(0, 1).toUpperCase() + word.substring(1));
    return _str;
};
export default {
    upFirstLetter
};
