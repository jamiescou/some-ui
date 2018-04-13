import { Entity } from 'draft-js';
import Link from './link';

const findLinkEntities = (contentBlock, callback) => (
    contentBlock.findEntityRanges(
        character => {
            if (!character) {
                return false;
            }
            const entityKey = character.getEntity();
            return entityKey && Entity.get(entityKey).getType() === 'LINK';
        },
        callback
    )
);

const getDecorator = () => ({
    strategy: findLinkEntities,
    component: Link
});

export default getDecorator;
