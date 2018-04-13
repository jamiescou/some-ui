/**
 * 存放示例
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import  {Phone} from './index';
const phoneCode = `
    class PhoneDemo extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        className: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.string,
        error: PropTypes.bool
    }
    constructor(props) {
        super(props);
    }
    handleChange(val){
        // let { onChange } = this.props;
        // onChange(val);
    }

    render() {
        let dictionary = {CN: '中国', RU: '俄罗斯', US: '美国'};
        let country = 'CN';
        let countries = ['CN', 'US', 'RU'];
        let { error = false, value, onChange } = this.props;
        return (
                <Phone
                    error={error}
                    dictionary={dictionary}
                    international={false}
                    onChange={::this.handleChange}
                    country={country}
                    countries={countries}
                    nativeExpanded={false}
                    value={value} />
        );
    }
}
`;
class PhoneDemo extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        className: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.string,
        error: PropTypes.bool,
        active: PropTypes.bool
    }
    constructor(props) {
        super(props);
    }

    render() {
        let dictionary = {CN: '中国', RU: '俄罗斯', US: '美国'};
        let country = 'CN';
        let countries = ['CN', 'US', 'RU'];
        let { error=true, active=true, value } = this.props;
        return (
            <Phone
                error={error}
                active={active}
                dictionary={dictionary}
                international={false}
                onChange={()=>{}}
                country={country}
                countries={countries}
                nativeExpanded={false}
                value={value} />
        );
    }
}
export default [
    {
        id: 'PhoneDemo',
        element: <PhoneDemo />,
        intro: <ReactMarkdown className="markdown" source={phoneCode} />
    }
];
