/**
 * 存放示例
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { ModalTrigger, Modal, ModalHeader, ModalBody, ModalFoot } from './index';
import { Button } from '../buttons/index';
import { DropDownTrigger, DropDownList, DropDown, DropDownItem } from '../dropdown';
const ModelDefault = (
    <ModalTrigger>
        <Button className="mcds-button__brand">Modal</Button>
        <Modal className="mcds-modal__w-820 mcds-modal__auto">
            <ModalHeader>
                <i className="mcds-modal__close mcds-icon__close-line-20 close" />
                <p className="mcds-modal__title">新建</p>
            </ModalHeader>
            <ModalBody>
                <p>This component is essentially 2 ARIA listboxes side by side, so we follow the [ARIA practices guide]</p>
            </ModalBody>

            <ModalFoot>
                <div className="mcds-layout__column mcds-layout__right">
                    <Button className="mcds-button__neutral mcds-btn__right close">
                        Cancel
                    </Button>
                    <Button className="mcds-button__brand close">
                        Save
                    </Button>
                </div>
            </ModalFoot>
        </Modal>
    </ModalTrigger>
);

class ModelStateClose extends React.Component {
    constructor() {
        super();
        this.state = { active: false };
    }
    test() {
        this.setState({active: !this.state.active});
    }
    render() {
        return (
            <div>
                <button>123</button>
                <DropDownTrigger target="body" autoCloseTag="ccc" placement="bottom-left">
                    <DropDownItem>删除</DropDownItem>
                    <DropDown className="mcds-dropdown__min-no">
                        <DropDownList>
                            <ModalTrigger>
                                <DropDownItem className="ccc">删除</DropDownItem>
                                <Modal className="mcds-modal__w-820">
                                    <ModalHeader>
                                        <i className="mcds-modal__close mcds-icon__close-line-20 close" />
                                        <p className="mcds-modal__title">新建</p>
                                    </ModalHeader>
                                    <ModalBody>
                                        <p>This component is essentially 2 ARIA listboxes side by side, so we follow the [ARIA practices guide]</p>
                                    </ModalBody>

                                    <ModalFoot>
                                        <div className="mcds-layout__column mcds-layout__right">
                                            <Button className="mcds-button__neutral mcds-btn__right close">
                                                Cancel
                                            </Button>
                                            <Button className="mcds-button__brand close">
                                                Save
                                            </Button>
                                        </div>
                                    </ModalFoot>
                                </Modal>
                            </ModalTrigger>
                        </DropDownList>
                    </DropDown>
                </DropDownTrigger>
                <Button className="mcds-button__brand" onClick={this.test.bind(this)}>Modal</Button>
                <Modal show={this.state.active}>
                    <ModalHeader>
                        <i className="mcds-modal__close mcds-icon__close-line-20" onClick={this.test.bind(this)} />
                        <p className="mcds-modal__title">header</p>
                    </ModalHeader>
                    <ModalBody>
                        <p>This component is essentially 2 ARIA listboxes side by side, so we follow the [ARIA practices guide]</p>
                    </ModalBody>

                    <ModalFoot>
                        <div className="mcds-layout__column mcds-layout__right">
                            <Button className="mcds-button__neutral mcds-btn__right" onClick={this.test.bind(this)}>
                                Cancel
                            </Button>
                            <Button className="mcds-button__brand" onClick={this.test.bind(this)}>
                                Save
                            </Button>
                        </div>
                    </ModalFoot>
                </Modal>
            </div>
        );
    }
}


const ModelCode = `
class ModelStateClose extends React.Component {
    ...
    constructor() {
        super();
        this.state = { active: false };
    }
    test() {
        this.setState({active: !this.state.active});
    }
    render() {
        return (
            <div>
                <Button className="mcds-button__brand" onClick={this.test.bind(this)}>Modal</Button>
                <Modal show={this.state.active} className="mcds-modal__content">
                    <ModalHeader>
                        <i className="mcds-modal__close mcds-icon__close-medium-14" onClick={this.test.bind(this)} />
                        <p className="mcds-modal__title">header</p>
                    </ModalHeader>
                    <ModalBody>
                        <p>This component is essentially 2 ARIA listboxes side by side, so we follow the [ARIA practices guide]</p>
                    </ModalBody>

                    <ModalFoot>
                        <Button className="mcds-button__neutral mcds-btn__right" onClick={this.test.bind(this)}>
                            Cancel
                        </Button>
                        <Button className="mcds-button__brand" onClick={this.test.bind(this)}>
                            Save
                        </Button>
                    </ModalFoot>
                </Modal>
            </div>
        );
    }
}`;



export default [
    {
        id: 'ModalTrigger',
        element: ModelDefault,
        intro: <ReactMarkdown className="markdown" source={'#### ModalTrigger\r\n* ModalTrigger 第一个元素用来触发Modal 第二个元素为Modal\r\n* 宽度有两种:mcds-modal__w-520 mcds-modal__w-820\r\n* 全屏居中: mcds-modal__auto\r\n* 如果想点击按钮关闭Modal 只需给该按钮添加close样式即可，其他按钮同理\r\n* 如果不想通过增加class样式来关闭Modal 也可以通过操作active来关闭'} />
    },
    {
        id: 'ModelStateClose',
        element: <ModelStateClose />,
        code: ModelCode,
        intro: <ReactMarkdown className="markdown" source={'#### Modal\r\n* modal支持传入以下参数 show = null, trigger = null, closeOnEsc = true, onOpen, onClose, 如果是通过trigger触发,最后在onClose回调加入setState\r\n* 宽度有两种:mcds-modal__w-520 mcds-modal__w-820\r\n* 如果想点击按钮关闭Modal 只需给该按钮添加close样式即可，其他按钮同理\r\n* 如果不想通过增加class样式来关闭Modal 也可以通过操作active来关闭'} />
    }
];
