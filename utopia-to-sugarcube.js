/**
 * Converts Utopia CSS clamp() output to Sugarcube fluidDimension JSON.
 *
 * 1. Go to https://utopia.fyi/type/calculator and configure your type scale.
 *    Save the generated CSS to src/design-tokens/utopia-type.css
 *    Run: node utopia-to-sugarcube.js < src/design-tokens/base/utopia-type.css > src/design-tokens/base/size.json
 *
 * 2. Go to https://utopia.fyi/space/calculator and configure your space scale.
 *    Save the generated CSS to src/design-tokens/utopia-space.css
 *    Run: node utopia-to-sugarcube.js < src/design-tokens/base/utopia-space.css > src/design-tokens/base/space.json
 *
 * The script auto-detects --step-* (type) vs --space-* (space) from the input
 * and outputs the correct Sugarcube token structure for each.
 *
 * After generating, you may want to manually add tokens that aren't part of
 * Utopia's output, e.g. a body alias or a zero spacing value:
 *
 *   size.json  →  "body": { "$value": "{size.step.0}" }
 *   space.json →  "0": { "$value": { "min": { "value": 0, "unit": "rem" }, "max": { "value": 0, "unit": "rem" } } }
 */

const chunks = [];
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => chunks.push(chunk));
process.stdin.on('end', () => {
	const css = chunks.join('');
	const pattern =
		/--(step|space)-([\w-]+):\s*clamp\(\s*([\d.]+)(rem|px)\s*,\s*[^,]+,\s*([\d.]+)(rem|px)\s*\)/g;

	const tokens = {};
	let kind = null;
	let match;

	while ((match = pattern.exec(css)) !== null) {
		const [, prefix, key, min, minUnit, max, maxUnit] = match;
		kind ??= prefix;
		tokens[key] = {
			$value: {
				min: { value: parseFloat(min), unit: minUnit },
				max: { value: parseFloat(max), unit: maxUnit },
			},
		};
	}

	if (!kind) {
		console.error('No --step-* or --space-* clamp() properties found.');
		process.exit(1);
	}

	const output =
		kind === 'step'
			? { size: { $type: 'fluidDimension', step: tokens } }
			: { space: { $type: 'fluidDimension', ...tokens } };

	console.log(JSON.stringify(output, null, '\t'));
});
