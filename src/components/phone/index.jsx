import { createElement } from 'react';
import metadata from 'libphonenumber-js/metadata.min.json';
import Input from './src/input';
function Phone(props){
    let properties = Object.keys(props).reduce(function(reduced, property){
        reduced[property] = props[property];
        return reduced;
    }, { metadata: metadata });
    return createElement(Input, properties);
}
export default { Phone } ;

