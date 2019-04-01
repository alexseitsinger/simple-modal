const documentExists = typeof document !== "undefined" ? true : null

const windowExists = typeof window !== "undefined" ? true : null

export function getTopOffset(el) {
	const cs = getComputedStyle(el)
	if (!cs || cs.top === "auto") {
		return 0
	}
	return Math.abs(Number.parseInt(cs.top))
}

export function getYOffset() {
	if (!windowExists) {
		return 0
	}
	return Math.abs(Number.parseInt(window.pageYOffset))
}

export const defaultFixedStyle = {
	position: "fixed",
	width: "100%",
	maxWidth: "auto"
}

export function getFixedStyle(el) {
	var style = defaultFixedStyle
	const maxWidth = getMaxWidth(el)
	if (maxWidth > 0) {
		style = {
			...style,
			maxWidth: maxWidth + "px"
		}
	}
	return style
}

function getMaxWidth(el) {
	const parentCs = getComputedStyle(el.parentNode)
	var maxWidth = parseInt(parentCs.width)
	getSiblings(el).forEach((sib) => {
		if (isFixed(sib) || isAbsolute(sib)) {
			const sibCs = getComputedStyle(sib)
			maxWidth -= parseInt(sibCs.width)
		}
	})
	return maxWidth
}

function toCamelCase(string) {
	return string.replace(/(\w)(\w*)/g, (g0, g1, g2) => {
		return g1.toUpperCase() + g2.toLowerCase()
	})
}

function toHyphenCase(string) {
	return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

function getSiblings(el, filter) {
	const sibs = []
	var currentEl = el.parentNode.firstChild
	do {
		if (currentEl.nodeType === 3) {
			continue
		}
		if (currentEl !== el) {
			sibs.push(currentEl)
		}
	} while ((currentEl = currentEl.nextSibling))
	return sibs
}

function getComputedStyle(el) {
	if (!windowExists) {
		return
	}
	return window.getComputedStyle(el)
}

export function isFixed(el) {
	const cs = getComputedStyle(el)
	if (cs.position && cs.position === "fixed") {
		return true
	}
}

export function isAbsolute(el) {
	const cs = getComputedStyle(el)
	if (cs.position && cs.position === "absolute") {
		return true
	}
}

export function addStyle(element, style) {
	for (var key in style) {
		if (style.hasOwnProperty(key)) {
			element.style[key] = style[key]
		}
	}
}

export function removeStyle(element, style) {
	Object.keys(style).forEach((key) => {
		const name = toHyphenCase(key)
		element.style.removeProperty(name)
	})
}

export function getElements(selector) {
	if (!documentExists) {
		return []
	}
	return document.querySelectorAll(selector)
}

export function getElement(selector) {
	if (!documentExists) {
		return
	}
	return document.querySelector(selector)
}

export function isEscapeKey(keyCode) {
	const escapeKeyCode = 27
	if (keyCode === escapeKeyCode) {
		return true
	}
}

export function addEventListener(name, callback) {
	if (!documentExists) {
		return
	}
	document.addEventListener(name, callback, false)
}

export function removeEventListener(name, callback) {
	if (!documentExists) {
		return
	}
	document.removeEventListener(name, callback, false)
}

export function scrollTo(position) {
	if (!windowExists) {
		return
	}
	window.scrollTo(0, position)
}
