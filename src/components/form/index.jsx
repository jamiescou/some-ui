/**
 * https://www.lightningdesignsystem.com/components/forms/
 * 1. 输入框
 * 2. 文本输入区域框
 * 3. 单选项
 * 4. 单选组
 * 5. 复选项
 * 6. 切换开关
 * 7. 复选组
 * 8. 单选选择器
 * 9. 多选选择器
 * 10. 水平垂直排布表单
 * 11. 标准排布表单
 * 12. 单行排布表单
 * 13. 混合排布表单
 * 14. 表单标签提示
 * 15. 表单固定底部
 * 16. 两栏表单
 */
import { Input, DisabledInput, ReadOnlyInput, ReadOnlyFixedText, FixedInput } from './flavors/input/index';
import InputSearch from './flavors/input-search/index';
import InputRequird from './flavors/input-required/index';

import { TextArea, DisabledTextArea, ReadOnlyTextArea } from './flavors/textarea/index';
import TextAreaRequired from './flavors/textarea-required/index';

import { Radio, RadioGroup, RequiredRadioGroup } from './flavors/radio/index';
import { AlternateRadio, AlternateGroup } from './flavors/radio-group-alternate/index';

import { AlternateCheckbox, AlternateCheckboxGroup } from './flavors/checkbox-group-alertnate/index';
import CheckboxToggle from './flavors/checkbox-toggle/index';
import { Checkbox, CheckboxGroup, RequiredCheckboxGroup } from './flavors/checkbox/index';
import CheckboxAddButton from './flavors/checkbox-add-button/index';


import Select from './flavors/select/index';
import ComboxSelect from './flavors/combox-select/index';
import { FromMultiSelect } from './flavors/form-multi-select/index';

export default {
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
    Checkbox,
    CheckboxGroup,
    RequiredCheckboxGroup,
    CheckboxToggle,
    AlternateCheckbox,
    AlternateCheckboxGroup,
    CheckboxAddButton,
    Select,
    ComboxSelect,
    FromMultiSelect
};

