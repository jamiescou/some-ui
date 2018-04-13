# carbon
Meiqia Fontend Lighting UI Components

# components 编写方式
简单想了一下.我们要写的组件是为了尽可能的复用,因此components用<b>无状态函数式组件</b>这种写法较为合试,将大量的无状态组件交给用户去自行组合从而生成应用.

无状态函数式组件的写法是 

```
function HelloComponent(props, /* context */){
  return <div>Hello {props.name}</div>
}
```

无状态函数式组件的特点:

  
1.  组件不会被实例化，整体渲染性能得到提升
2.  组件不能访问this对象
3.  组件无法访问生命周期的方法
4.  代码可读性较好.

无状态组件的编程思路,这里以一个Modal为例,结构可以分为

- Portal
- Modal
	- ModalHeader
	- ModaLBody
	- ModalFooter

```
const Modal = props => 
	<div class='modal'>
		{props.children}
	</div>
const ModalHeader = ...;
const ModalBody = ...;
const ModalFooter = ...;
const Portal = ...;
//在用户层面,用法可以调用以下组合方式进行操作.
<Portal>
	<Modal>
		<ModalHeader>
			<h3>i am a header</h3>
			<icon onclick={closefunc}></icon>
		</ModalHeader>
		<ModalBody>
			<p>i am the body</p>
		</ModalBody>
		<ModalFooter>
			<button>save</button>
		</ModalFOoter>
	</Modal>
</Portal>

```
组件更多的体现的是样式上的展示,而并非逻辑.这就是基础组件要做的事情,可以在组件上预留一些接口,但是这些接口在实现的时候要考虑是否是必须的.这些接口,是否会影响这些基础组件的<b>可拓展性.可组合性.</b>这才是我们要写基础组件的意义.
 
 
# style 命名规范

### 为什么要制定命名规范?

统一命名规范,便于团队协作开发是代码风格统一,减少沟通成本,使项目能更方便的维护

### BEM

BEM的意思就是块（block）、元素（element）、修饰符（modifier），是由Yandex团队提出的一种CSS Class 命名方法。

BEM的命名规矩很容易记：block-name__element-name--modifier-name，也就是模块名 + 元素名 + 修饰器名。

BEM解决这一问题的思路在于，由于项目开发中，每个组件都是唯一无二的，其名字也是独一无二的，组件内部元素的名字都加上组件名，并用元素的名字作为选择器，自然组件内的样式就不会与组件外的样式冲突了。

    .block{}
    .block__element{}
    .block--modifier{}
    
### Meiqia UI 规范

参考 BEM
举例子，如果你想要造一个房子，那么整个整个房子的 class就是 .house
那么这个房子的门就是 .house__door ，窗户就是 .house__window
如果这是一个灰房子，那么房子的这个这个时候 class 就应该是 .house--gray
如果这个房子有个粉色的门，那么这时候应该是 .house__door--pink

比如我们想要一块文字显示的小一些，那么他的 class 可以为 .slds-text-body--small，大一些的可以是 .slds-text-heading--large

为了让我们的组件可以跟其他的组件能够兼容使用，我们需要给自己的组件加上一个前缀的命名空间，比如暂定为 .mcds-，（Meiqia CRM Design System）,比如我们定义一个按钮样式，这时应该是 .mcds-button 而不是 .button

