
import React from 'react';
import ReactMarkdown from 'react-markdown';

import  {
    Input,
    DisabledInput,
    ReadOnlyInput,
    ReadOnlyFixedText,
    FixedInput,
    InputSearch,
    InputRequird,

    TextArea,
    DisabledTextArea,
    ReadOnlyTextArea,
    TextAreaRequired,

    Radio,
    RadioGroup,
    RequiredRadioGroup,
    AlternateRadio,
    AlternateGroup,
    AlternateCheckboxGroup,
    AlternateCheckbox,

    Checkbox,
    CheckboxGroup,
    RequiredCheckboxGroup,
    CheckboxToggle,
    CheckboxAddButton,

    Select,
    ComboxSelect,
    FromMultiSelect
} from '../form/index';

import { ButtonSmallIcon } from './../button-icon/index';

const SelectDefault = (
    <div>
        <Select error={true} label="下拉菜单" value={123} onChange={(v) => { console.log(`下拉菜单value-${v}`); } }>
            <option value={123} className="closed close">A</option>
            <option value={456}>B</option>
            <option value={789}>C</option>
        </Select>
        <Select error={true} label="上拉菜单" value={789} onChange={(v) => { console.log(`下拉菜单value-${v}`); } }>
            <option>123</option>
            <option>456</option>
            <option>789</option>
        </Select>
    </div>
);


const ComboxSelectDefault = (
    <div>
        <ComboxSelect error={true} label="下拉菜单" value={123} onChange={(v) => { console.log(`下拉菜单value-${v}`); } }>
            <option value={123} className="closed close">Jack</option>
            <option value={456}>Lucy</option>
            <option value={789}>Tom</option>
        </ComboxSelect>
    </div>
);

const CheckboxAddButtonExa = (
    <CheckboxAddButton
        label="add checkbox"
        name="addButton"
        id="addButton"
        callback={ (val) => console.log('checked', val) } />
);

const CheckboxGroupExa = (
    <CheckboxGroup groupLable="checkbox Group">
        <Checkbox id="checkboxGroup1" label="Lable Checkbox" name="checkboxGroup1" checked />
        <Checkbox id="checkboxGroup2" label="Indeterminate Checkbox" name="checkboxGroup2" checked indeterminate />
        <Checkbox id="checkboxGroup3" label="Lable Checkbox" name="checkboxGroup3" />
    </CheckboxGroup>
);

const RequiredCheckboxGroupExa = (
    <RequiredCheckboxGroup groupLable="checkbox Group" errorMsg="This is required" >
        <Checkbox id="checkboxGroup4" label="Lable Checkbox" name="checkboxGroup4" />
        <Checkbox id="checkboxGroup5" label="Lable Checkbox disabled" name="checkboxGroup5" disabled />
        <Checkbox id="checkboxGroup6" label="Indeterminate Checkbox" name="checkboxGroup6" indeterminate />
    </RequiredCheckboxGroup>
);

const AlternateCheckboxGroupExa = (
    <AlternateCheckboxGroup label="Scheduled Day(s)">
        <AlternateCheckbox id="monday3" name="checkbox" disabled="true" value="Mon123">Mon</AlternateCheckbox>
        <AlternateCheckbox id="tuesday3" name="checkbox" disabled="true" value="Tue">Tue</AlternateCheckbox>
        <AlternateCheckbox id="wednesday3" name="checkbox" disabled="true" value="Wed">Wed</AlternateCheckbox>
        <AlternateCheckbox id="thursday3" name="checkbox" disabled="true" value="Thu">Thu</AlternateCheckbox>
        <AlternateCheckbox id="friday3" name="checkbox" disabled="true" value="Fri">Fri</AlternateCheckbox>
    </AlternateCheckboxGroup>
);

const AlternateCheckboxExa = (
    <AlternateCheckboxGroup label="Scheduled Day(s)">
        <AlternateCheckbox id="monday2" name="checkbox" checked="true" value="Mon" callback={ (val) => console.log(val) }>Mon</AlternateCheckbox>
        <AlternateCheckbox id="tuesday2" name="checkbox" checked="true" value="Tue" callback={ (val) => console.log(val) }>Tue</AlternateCheckbox>
        <AlternateCheckbox id="wednesday2" name="checkbox" checked="true" value="Wed" callback={ (val) => console.log(val) }>Wed</AlternateCheckbox>
        <AlternateCheckbox id="thursday2" name="checkbox" value="Thu" callback={ (val) => console.log(val) }>Thu</AlternateCheckbox>
        <AlternateCheckbox id="friday2" name="checkbox" value="Fri">Fri</AlternateCheckbox>
    </AlternateCheckboxGroup>
);

const AlternateGroupExa = (
    <AlternateGroup label="Scheduled Day(s)">
        <AlternateRadio name="radio" callback={ (val) => console.log(val) }>Mon</AlternateRadio>
        <AlternateRadio name="radio">Tue</AlternateRadio>
        <AlternateRadio name="radio">Wed</AlternateRadio>
        <AlternateRadio name="radio">Thu</AlternateRadio>
        <AlternateRadio id="friday" name="radio">Fri</AlternateRadio>
    </AlternateGroup>
);

const AlternateRadioDisableExa = (
    <AlternateGroup label="Scheduled Day(s)">
        <AlternateRadio name="radio" disabled="true">Mon</AlternateRadio>
        <AlternateRadio name="radio" disabled="true">Tue</AlternateRadio>
        <AlternateRadio name="radio" disabled="true">Wed</AlternateRadio>
        <AlternateRadio name="radio" disabled="true">Thu</AlternateRadio>
        <AlternateRadio name="radio" disabled="true">Fri</AlternateRadio>
    </AlternateGroup>
);

const RequiredRadioExa = (
    <RequiredRadioGroup groupLable="Radio Group" errorMsg="目前没太想明白">
        <Radio
            id="Label1"
            label="Radio Label"
            name="requiredName"
            defaultValue="value1"
            onChange={(val) => { console.log(val); }} checked />
        <Radio
            id="Label2"
            label="Radio Label"
            name="requiredName"
            defaultValue="value2"
            onChange={(val) => { console.log(val); }} />
    </RequiredRadioGroup>
);

const RadioGroupDisableExa = (
    <RadioGroup groupLable="Radio Group">
        <Radio label="Radio Label" name="name" disabled />
        <Radio label="Radio Label" name="name" disabled />
    </RadioGroup>
);

const RadioGroupExa = (
    <RadioGroup groupLable="Radio Group">
        <Radio id="Label3" label="Radio Label" name="name" checked={true} />
        <Radio id="Label4" label="Radio Label" name="name" />
    </RadioGroup>
);

const InputRequirdExa = (
    <InputRequird
        error={false}
        id="InputRequird1"
        icon="mcds-mg__right mcds-icon__warning-line"
        label="label Input"
        required="required"
        errorMsg="函数返回true显示"
        validReg="/\d+/"
        validFun={ (val) => /\d+/.test(val) }
        onChange={(val) => { console.log(val); }}
        placeholder="Placeholder text" />
);

const InputRequirdCode =`<InputRequird
    id="InputRequird1"
    icon="mcds-mg__right mcds-icon__warning-line"
    label="label Input"
    required="required"
    errorMsg="函数返回true显示"
    validReg="/\d+/"
    validFun={ (val) => /\d+/.test(val) }
    placeholder="Placeholder text" />
`;


const TextAreaRequiredExa = (
    <TextAreaRequired
        error={true}
        id="TextAreaRequired"
        label="textarea label"
        name="textarea"
        placeholder="placeholder"
        errorMsg="函数返回true显示"
        validFun={ (val) => /\d+/.test(val) } />
);


const FormHorizontal = (
    <div className="mcds-form__horizontal mcds-form__width">
        <Input
            error={false}
            className="mcds-inline"
            label="label Input333"
            id="Input"
            name="user"
            placeholder="Placeholder text" />
        <TextArea error={true} className="mcds-inline mcds-top" label="textarea label" name="textarea" placeholder="placeholder" />
        <CheckboxGroup className="mcds-inline mcds-top" groupLable="checkbox Group">
            <Checkbox id="checkboxGroup1" label="Lable Checkbox" name="checkboxGroup1" checked />
            <Checkbox id="checkboxGroup2" label="Lable Checkbox" name="checkboxGroup2" checked />
            <Checkbox id="checkboxGroup3" label="Lable Checkbox" name="checkboxGroup3" />
        </CheckboxGroup>
        <RadioGroup className="mcds-inline mcds-top" groupLable="Radio Group">
            <Radio id="Label5" label="Radio Label" name="name" />
            <Radio id="Label6" label="Radio Label" name="name" />
        </RadioGroup>
    </div>
);

const FromMultiSelectExa = (
    <div className="mcds-grid">
        <FromMultiSelect label="First Category">
            <li className="mcds-picklist__item">Option One</li>
            <li className="mcds-picklist__item mcds-picklist__active">Option Tow</li>
            <li className="mcds-picklist__item">Option Three</li>
        </FromMultiSelect>
        <div className="mcds-grid mcds-picklist__vertical">
            <ButtonSmallIcon className="mcds-picklist__icon-color" icon="mcds-icon__triangle-solid-14 mcds-icon__rotate-90" />
            <ButtonSmallIcon className="mcds-m__t-13 mcds-picklist__icon-color" icon="mcds-icon__triangle-solid-14 mcds-icon__rotate-270" />
        </div>
        <FromMultiSelect label="Two Category">
            <li className="mcds-picklist__item">Option One</li>
            <li className="mcds-picklist__item">Option Three</li>
        </FromMultiSelect>
    </div>
);

const CheckboxDeomCode = `
class CheckboxDeom extends React.Component {
    render() {
        return (
            <div>   
                <Checkbox checked label="Lable Checkbox" />
                <Checkbox indeterminate label="Lable Checkbox Indeterminate" />
            </div>
            
        )
    }
}`;


class CheckboxDeom extends React.Component {

    render() {
        return (
            <div>
                <Checkbox checked label="Lable Checkbox" />
                <Checkbox indeterminate label="Lable Checkbox Indeterminate" />
            </div>
        );
    }
}

const InputDemo = (
    <div>
        <Input
            error={false}
            active={true}
            label="label Input111"
            name="user"
            iconRight={<span>123</span>}
            placeholder="Placeholder text"
            value="demo" />
        <Input
            error={false}
            active={true}
            label="label Input111"
            name="user"
            placeholder="Placeholder text" />
        <Input
            error={false}
            active={false}
            label="label Input222"
            iconLeft="mcds-icon__data-line-20"
            iconRight={<span className="mcds-icon__time-line-20" />}
            name="user" placeholder="Placeholder text" />
    </div>
);

// export default Forms;
export default [
    {
        id: 'Label Input',
        intro: <ReactMarkdown className="markdown" source={'##### Input参数\r\n\r\n- 一切等同于html原生inpu\r\n- iconLeft [string, element]\r\n- iconRight [string, element]\r\n- label [string] label名称'} />,
        element: InputDemo
    },
    {
        id: 'InputReadOnly',
        element: <DisabledInput error={true} label="label Input" name="userName" placeholder="Placeholder text" />
    },
    {
        id: 'InputReadOnlyBottom',
        element: <ReadOnlyInput error={true} label="label Input" value="Read Only" name="InputReadOnlyBottom" />
    },
    {
        id: 'InputRequird',
        element: InputRequirdExa,
        code: InputRequirdCode
    },
    {
        id: 'ReadOnlyFixedTextCode',
        element: <ReadOnlyFixedText error={true} label="label Input" value="Read Only" left="$" right="%" />
    },
    {
        id: 'InputSearchRight',
        element: <InputSearch
            onClick={(val) => { console.log('callback111', val); }}
            error={true}
            label="label Input"
            placeholder="Placeholder text"
            search="right"
            searchCallback={ (val) => { console.log('callback', val); } } />,
        code: '<InputSearch label="label Input" placeholder="Placeholder text" search="right" />',
        intro: <ReactMarkdown className="markdown" source={'#### InputSearch\r\n* iconClass 默认为 mcds-icon__search-line-20 可传其他icon\r\n* search 两个值 控制icon在哪边显示 left为左 right 为右\r\n* 如果search 和 clear同时存在 那么 search=\"left\" clear=\"right\r\n* searchCallback search icon 点击回调\r\n'} />
    },
    {
        id: 'InputSearchLeft',
        element: <InputSearch error={true} label="label Input" placeholder="Placeholder text" search="left" />,
        code: '<InputSearch label="label Input" placeholder="Placeholder text" search="left" />'
    },
    {
        id: 'InputSearchSide',
        element: <InputSearch error={true} label="label Input" placeholder="Placeholder text" search="left" clear="right" />,
        code: '<InputSearch label="label Input" placeholder="Placeholder text" search="left" clear="right" />'
    },
    {
        id: 'FixedInput',
        element: <FixedInput error={true} label="label Input" placeholder="Placeholder text" left="$" right="%" />
    },

    {
        id: 'TextArea',
        element: <TextArea error={true} label="textarea label" onChange={ (val) => { console.log(val); } } name="textarea" placeholder="placeholder" />
    },
    {
        id: 'DisabledTextArea',
        element: <DisabledTextArea error={true} label="textarea label" name="textarea" placeholder="placeholder" />
    },
    {
        id: 'ReadOnlyTextArea',
        element: <ReadOnlyTextArea error={true} label="textarea label" name="textarea" placeholder="Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna." />
    },
    {
        id: 'TextAreaRequired',
        element: TextAreaRequiredExa
    },
    {
        id: 'FormHorizontal',
        element: FormHorizontal
    },
    {
        id: 'Select',
        element: SelectDefault,
        intro: <ReactMarkdown className="markdown" source={'##### Select\r\n\r\n###### Select默认是下拉菜单,同时也支持上拉\r\n\r\n```\r\n<Select className=\"mcds-select__top\">\r\n\t...\r\n</Select>\r\n```'} />
    },
    {
        id: 'ComboxSelect',
        element: ComboxSelectDefault,
        intro: <ReactMarkdown className="markdown" source={'##### ComboxSelectDefault\r\n\r\n###### ComboxSelectDefault默认是下拉菜单,同时也支持上拉\r\n\r\n```\r\n<ComboxSelectDefault className=\"mcds-select__top\">\r\n\t...\r\n</ComboxSelectDefault>\r\n```'} />
    },
    {
        id: 'checkboxAddButton',
        element: CheckboxAddButtonExa,
        intro: <ReactMarkdown className="markdown" source={'#### CheckboxAddButton\r\n* 需要传id\r\n* checked disabled 为bool值 分别为选中和禁用\r\n* callback 为回调,参数为选中与否,返回值为true/false'} />
    },
    {
        id: 'CheckboxGroup',
        element: CheckboxGroupExa
    },
    {
        id: 'CheckboxRequired',
        element: RequiredCheckboxGroupExa
    },
    {
        id: 'CheckboxRequired',
        element: <Checkbox id="checkbox2" data-label="Lable Checkbox" name="checkbox1" required errorMsg="This is required" />
    },
    {
        id: 'Checkbox',
        // element: <Checkbox id="checkbox1" label="Lable Checkbox" name="checkbox1" onClick={(e) => console.log(e.target.checked)} />
        element: <CheckboxDeom />,
        code: CheckboxDeomCode
    },
    {
        id: 'CheckboxToggle',
        element: <CheckboxToggle callback={ (val) => console.log(val) } className="mcds-checkbox__toggle" lable="checkbox toggle" checked />
    },
    {
        id: 'ToggleDisabled',
        element: <CheckboxToggle className="mcds-checkbox__toggle" lable="checkbox toggle" disabled />
    },
    {
        id: 'smallToggle',
        element: <CheckboxToggle className="mcds-small-checkbox__toggle" lable="checkbox toggle" />
    },
    {
        id: 'smallDisabledToggle',
        element: <CheckboxToggle className="mcds-small-checkbox__toggle" lable="checkbox toggle" disabled />
    },
    {
        id: 'AlternateCheckbox',
        element: AlternateCheckboxExa,
        intro: <ReactMarkdown className="markdown" source={'#### AlternateCheckbox/AlternateRadio\r\n* checked disabled \"true\"/\"false\" 分别为选中和禁用\r\n* callback 为回调，参数为选中与否，返回值为true/false'} />

    },
    {
        id: 'AlternateDisable',
        element: AlternateCheckboxGroupExa
    },
    {
        id: 'AlternateGroup',
        element: AlternateGroupExa
    },
    {
        id: 'AlternateRadioDisable',
        element: AlternateRadioDisableExa
    },
    {
        id: 'RequiredRadio',
        element: RequiredRadioExa
    },
    {
        id: 'RadioGroupDisable',
        element: RadioGroupDisableExa
    },
    {
        id: 'RadioGroup',
        element: RadioGroupExa
    },
    {
        id: 'FromMultiSelectExa',
        element: FromMultiSelectExa
    }

];
