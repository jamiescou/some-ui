import { OrderedSet, is } from 'immutable';

const getEntityRanges = (text, charMetaList) => {
    let charEntity = null;
    let prevCharEntity = null;
    let ranges = [];
    let rangeStart = 0;
    for (let i = 0, len = text.length; i < len; i++) {
        prevCharEntity = charEntity;
        let meta = charMetaList.get(i);
        charEntity = meta ? meta.getEntity() : null;
        if (i > 0 && charEntity !== prevCharEntity) {
            ranges.push([
                prevCharEntity,
                getStyleRange(
                    text.slice(rangeStart, i),
                    charMetaList.slice(rangeStart, i)
                )
            ]);
            rangeStart = i;
        }
    }
    ranges.push([
        charEntity,
        getStyleRange(text.slice(rangeStart), charMetaList.slice(rangeStart))
    ]);
    return ranges;
};

const getStyleRange = (text, charMetaList) => {
    let charStyle = new OrderedSet();
    let prevCharStyle = new OrderedSet();
    let ranges = [];
    let rangeStart = 0;
    for (let i = 0, len = text.length; i < len; i++) {
        prevCharStyle = charStyle;
        let meta = charMetaList.get(i);
        charStyle = meta ? meta.getStyle() : new OrderedSet();
        if (i > 0 && !is(charStyle, prevCharStyle)) {
            ranges.push([text.slice(rangeStart, i), prevCharStyle]);
            rangeStart = i;
        }
    }
    ranges.push([text.slice(rangeStart), charStyle]);
    return ranges;
};

export default getEntityRanges;
