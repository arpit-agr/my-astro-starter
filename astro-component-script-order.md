# Astro Component Script Order

Astro doesn't enforce a specific ordering convention for the component script (frontmatter), but the community follows a consistent pattern that groups related concerns and respects dependency order.

## Convention

```astro
---
// 1. Framework/library imports
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';

// 2. Component imports
import Layout from '../layouts/Layout.astro';
import Card from '../components/Card.astro';

// 3. Helper/utility imports
import { formatDate } from '../utils/dates';

// 4. Types & interfaces (TypeScript)
interface Props {
  title: string;
  date: Date;
}

// 5. Props destructuring
const { title, date } = Astro.props;

// 6. Data fetching
const posts = await getCollection('blog');

// 7. Data transformations / derived variables
const sortedPosts = posts.sort((a, b) => b.data.date - a.data.date);
---
```

## Guiding Principle

**Imports → Types → Props → Data → Logic**

Each section only depends on what came before it, so the file reads naturally top-to-bottom.

## Import Order

Within the imports section, order by source:

1. Astro built-ins (`astro:content`, `astro:assets`)
2. Third-party packages
3. Local components (`.astro`, `.jsx`, etc.)
4. Local utilities and helpers
