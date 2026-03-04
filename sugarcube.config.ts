import { defineConfig } from '@sugarcube-sh/cli';

export default defineConfig({
	resolver: 'src/design-tokens/tokens.resolver.json',
	output: {
		components: 'src/styles/blocks',
	},
	transforms: {
		fluid: {
			min: 320,
			max: 1200,
		},
		colorFallbackStrategy: 'polyfill',
	},
	utilities: {
		padding: {
			source: 'space.*',
			prefix: 'p',
			directions: ['top', 'right', 'bottom', 'left', 'x', 'y', 'full', 'all'],
		},
		margin: {
			source: 'space.*',
			prefix: 'm',
			directions: ['top', 'right', 'bottom', 'left', 'x', 'y', 'full', 'all'],
		},
		'--flow-space': {
			source: 'space.*',
			prefix: 'flow-space',
		},
		'--region-space': {
			source: 'space.*',
			prefix: 'region-space',
		},
		'--cluster-gap': {
			source: 'space.*',
			prefix: 'cluster-gap',
		},
		'--switcher-gap': {
			source: 'space.*',
			prefix: 'switcher-gap',
		},
		'--grid-gap': {
			source: 'space.*',
			prefix: 'grid-gap',
		},
		'--wrapper-max-width': {
			source: 'container.*',
			prefix: 'wrapper-max-width',
		},
		gap: {
			source: 'space.*',
			prefix: 'gap',
		},
		color: {
			source: 'color.*',
			prefix: 'text',
			stripDuplicates: true,
		},
		'background-color': {
			source: 'color.*',
			prefix: 'bg',
		},
		'font-size': {
			source: 'text.*',
		},
		'font-weight': {
			source: 'font.weight.*',
			prefix: 'font-weight',
		},
		'letter-spacing': {
			source: 'tracking.*',
		},
		'border-radius': {
			source: 'radius.*',
			prefix: 'rounded',
		},
	},
});
