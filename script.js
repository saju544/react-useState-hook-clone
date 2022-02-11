let component1Click = null
let component2Click = null
let currentRenderingComponent = null
let isComponentRendered = false
let index = 0
const componentCacheMap = new Map()

function component1() {
	const [count, setCount] = useState(0)
	const [name, setName] = useState("saju")
	component1Click = function () {
		setCount(count + 1)
		setName(name + 1)
	}
	console.log(
		`component1 is rendering and count is ${count} and name: ${name}`
	)
	return `<h1>Hello World👋</h1>`
}
function component2() {
	const [count, setCount] = useState(5)
	const [name, setName] = useState("kaju")
	component2Click = function () {
		setCount(count + 1)
		setName(name + 1)
	}
	console.log(
		`component2 is rendering and count is ${count} and name: ${name}`
	)
	return `<h1>Hello World👋</h1>`
}

function useState(initialValue) {
	const component = currentRenderingComponent
	if (isComponentRendered) {
		if (index >= componentCacheMap.get(component).length) {
			index = 0
		}
		initialValue = componentCacheMap.get(component)[index]
	} else {
		componentCacheMap.get(component)[index] = initialValue
	}
	const i = index

	function setState(value) {
		let index = i
		componentCacheMap.get(component)[index] = value
		isComponentRendered = true
		currentRenderingComponent = component
		component()
	}

	index = index + 1

	return [initialValue, setState]
}

function renderComponent(component) {
	isComponentRendered = false
	index = 0
	currentRenderingComponent = component
	componentCacheMap.set(component, [])
	component()
}

renderComponent(component1)
renderComponent(component2)

component1Click()
component1Click()
component2Click()
