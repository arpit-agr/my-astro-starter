/**
 * Copies custom properties from [data-theme="dark"] into
 * a @media (prefers-color-scheme: dark) { :root { … } } block
 * inside @layer global.
 *
 * The original [data-theme="dark"] attribute selector rule is preserved.
 */
export default function darkModeMedia() {
	return {
		postcssPlugin: 'postcss-dark-mode-media',
		OnceExit(root, { AtRule, Rule }) {
			root.walkRules(/\[data-theme=["']dark["']\]/, (rule) => {
				const rootRule = new Rule({ selector: ':root' });
				rule.walkDecls((decl) => rootRule.append(decl.clone()));

				const mediaQuery = new AtRule({
					name: 'media',
					params: '(prefers-color-scheme: dark)',
				});
				mediaQuery.append(rootRule);

				rule.parent.insertAfter(rule, mediaQuery);
			});
		},
	};
}
darkModeMedia.postcss = true;
