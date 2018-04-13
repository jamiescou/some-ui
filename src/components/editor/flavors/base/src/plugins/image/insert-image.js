import { Entity, AtomicBlockUtils } from 'draft-js';

/**
 * 插入图片
 */
export default function insertImage(editorState, src) {
    const entityKey = Entity.create('IMAGE', 'IMMUTABLE', {src});
    return AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
    );
}
