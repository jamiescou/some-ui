export default function blockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'header-four') {
        return 'DraftEditor-alignLeft';
    }
    if (type === 'header-five') {
        return 'DraftEditor-alignCenter';
    }
    if (type === 'header-six') {
        return 'DraftEditor-alignRight';
    }
}
