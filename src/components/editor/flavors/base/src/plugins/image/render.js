import Media from './media';

function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false
        };
    }
    return null;
}

export default mediaBlockRenderer;
