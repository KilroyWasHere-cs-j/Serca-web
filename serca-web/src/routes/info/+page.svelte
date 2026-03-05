<script lang="ts">
	// ---------------------------------------------
	// Information / Docs Page
	// - Same "clean cards + rounded-2xl + soft borders" aesthetic
	//   as your updated home + search page.
	// - Adds clear comments
	// - Uses your existing steps + aiStages to render a simple diagram
	//   (no external libs, pure HTML/SVG).
	// ---------------------------------------------

	import Navbar from '../../components/Navbar.svelte';

	// High-level pipeline steps (laid out on a simple coordinate plane)
	const steps = [
		{ id: 'seed', label: 'Seed URLs', x: 50, y: 50 },
		{ id: 'scraper', label: 'Web Scraper', x: 250, y: 50 },
		{ id: 'subdomains', label: 'Extract Subdomains', x: 250, y: 150 },
		{ id: 'to-scraper', label: 'Subdomains → Scraper', x: 450, y: 100 },
		{ id: 'ai', label: 'AI Pipeline', x: 650, y: 100 },
		{ id: 'db', label: 'Update Database', x: 850, y: 100 }
	];

	// AI pipeline stages shown as "callouts" around the AI node
	const aiStages = [
		{ label: 'OCR', dx: 0, dy: -60 },
		{ label: 'YOLOv5', dx: 0, dy: -30 },
		{ label: 'BLIP', dx: 0, dy: 0 },
		{ label: 'Image Features', dx: 0, dy: 30 }
	];

	// Basic dimensions for the diagram surface
	const CANVAS_W = 980;
	const CANVAS_H = 240;

	// Small helper for finding a step by id (used for edges)
	const step = (id: string) => steps.find((s) => s.id === id)!;

	// Define the main edges between steps
	// (You can add/remove edges without changing the rendering logic.)
	const edges = [
		{ from: 'seed', to: 'scraper' },
		{ from: 'scraper', to: 'subdomains' },
		{ from: 'subdomains', to: 'to-scraper' },
		{ from: 'to-scraper', to: 'ai' },
		{ from: 'ai', to: 'db' }
	];
</script>

<Navbar />

<!--
	Page shell:
	- consistent max width
	- rounded-2xl cards
	- subtle backgrounds
	- minimal custom CSS
-->
<main class="mx-auto w-full max-w-5xl px-4 pb-10 pt-8 font-sans text-gray-900">
	<!-- Header / Hero -->
	<section class="rounded-2xl border border-gray-300 bg-blue-50 p-6 text-center shadow-sm">
		<h1 class="text-3xl font-bold text-blue-900">Information</h1>
		<p class="mt-2 text-sm text-gray-700 italic">"It's like documentation, but less informative"</p>
	</section>

	<!-- Table of Contents -->
	<section class="mt-6 rounded-2xl border border-yellow-400 bg-yellow-100 p-5 shadow-sm">
		<h2 class="mb-2 text-xl font-bold text-teal-800">🧭 Table of Contents</h2>
		<ul class="list-inside list-disc space-y-1 text-blue-700">
			<li><a href="#overview" class="hover:underline">Overview</a></li>
			<li><a href="#architecture" class="hover:underline">Process</a></li>
			<li><a href="#pricing" class="hover:underline">Pricing</a></li>
			<li><a href="#api" class="hover:underline">API</a></li>
		</ul>
	</section>

	<!-- Overview -->
	<section id="overview" class="mt-8 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
		<h2 class="mb-2 text-2xl font-bold text-purple-800">💾 Overview</h2>
		<p class="text-gray-800">
			This page covers information to help users understand Serca beyond the basic level. It also covers service
			behavior, architecture concepts, and how the pipeline works end-to-end.
		</p>
	</section>

	<!-- Architecture / Process -->
	<section id="architecture" class="mt-8 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
		<h2 class="mb-2 text-2xl font-bold text-purple-800">🛠️ Architecture Overview</h2>
		<p class="text-gray-800">
			At a high level, Serca starts from a set of seed URLs, discovers related pages/subdomains, scrapes and extracts
			content, runs an AI pipeline to generate metadata, and finally updates the database for searching.
		</p>

		<!-- Diagram Card -->
		<div class="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
			<h3 class="text-base font-bold text-gray-900">Serca pipeline (concept)</h3>
			<p class="mt-1 text-sm text-gray-700">
				This is a simplified diagram. It shows the data flow and the AI stage components at a glance.
			</p>

			<!--
				Simple inline SVG:
				- circles/boxes for nodes
				- arrows for edges
				- AI sub-stages as smaller chips near the AI node
			-->
			<div class="mt-4 overflow-x-auto">
				<svg
					viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
					class="h-[240px] w-[980px] min-w-[980px]"
					role="img"
					aria-label="Serca pipeline diagram"
				>
					<defs>
						<!-- Arrow marker for edges -->
						<marker
							id="arrow"
							viewBox="0 0 10 10"
							refX="10"
							refY="5"
							markerWidth="8"
							markerHeight="8"
							orient="auto-start-reverse"
						>
							<path d="M 0 0 L 10 5 L 0 10 z" />
						</marker>
					</defs>

					<!-- Edges -->
					{#each edges as e}
						{#key `${e.from}-${e.to}`}
							<line
								x1={step(e.from).x + 70}
								y1={step(e.from).y + 24}
								x2={step(e.to).x - 10}
								y2={step(e.to).y + 24}
								class="diagram-edge"
								marker-end="url(#arrow)"
							/>
						{/key}
					{/each}

					<!-- Nodes -->
					{#each steps as s (s.id)}
						<g>
							<!-- Node box -->
							<rect x={s.x} y={s.y} width="160" height="48" rx="14" class="diagram-node" />

							<!-- Node label -->
							<text x={s.x + 80} y={s.y + 30} text-anchor="middle" class="diagram-text">
								{s.label}
							</text>
						</g>
					{/each}

					<!-- AI sub-stages near the AI node -->
					{#each aiStages as st (st.label)}
						<g>
							<rect
								x={step('ai').x + 190}
								y={step('ai').y + 12 + st.dy}
								width="150"
								height="28"
								rx="12"
								class="diagram-chip"
							/>
							<text
								x={step('ai').x + 265}
								y={step('ai').y + 31 + st.dy}
								text-anchor="middle"
								class="diagram-chip-text"
							>
								{st.label}
							</text>

							<!-- Connector line from AI node to chip -->
							<line
								x1={step('ai').x + 160}
								y1={step('ai').y + 24}
								x2={step('ai').x + 190}
								y2={step('ai').y + 26 + st.dy}
								class="diagram-edge-light"
							/>
						</g>
					{/each}
				</svg>
			</div>

			<!-- Short legend / explanation -->
			<div class="mt-4 grid gap-3 md:grid-cols-2">
				<div class="rounded-xl border border-gray-200 bg-white p-3">
					<p class="text-sm font-bold text-gray-900">Scraping + discovery</p>
					<p class="mt-1 text-sm text-gray-700">
						Starting from seed URLs, Serca discovers additional pages and subdomains, then scrapes content and
						metadata for analysis.
					</p>
				</div>

				<div class="rounded-xl border border-gray-200 bg-white p-3">
					<p class="text-sm font-bold text-gray-900">AI enrichment</p>
					<p class="mt-1 text-sm text-gray-700">
						The AI pipeline extracts text (OCR), detects objects (YOLO), generates captions (BLIP), and computes
						image features for stronger matching.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing -->
	<section id="pricing" class="mt-8 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
		<h2 class="mb-2 text-2xl font-bold text-purple-800">💳 Pricing</h2>

		<div class="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800">
			<p>
				Serca will offer a free tier and paid tiers. The free tier is designed to be useful and safe; higher tiers
				enable larger query limits and additional capabilities.
			</p>
			<p class="mt-3">
				Exact pricing may change as infrastructure costs and indexing scale. The goal is predictable billing and
				clear limits.
			</p>
		</div>
	</section>

	<!-- API -->
	<section id="api" class="mt-8 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
		<h2 class="mb-2 text-2xl font-bold text-purple-800">📦 API</h2>
		<p class="text-gray-800">
			Right now, Serca’s API is for backend/internal use while the platform stabilizes. A public API is planned once
			rate limiting, authentication, and documentation are ready.
		</p>

		<!-- Optional: placeholder "API coming soon" card -->
		<div class="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
			<p class="font-bold text-gray-900">Coming soon</p>
			<ul class="mt-2 list-inside list-disc space-y-1">
				<li>API keys + usage dashboard</li>
				<li>Rate limiting + tier-based quotas</li>
				<li>Public docs + examples</li>
			</ul>
		</div>
	</section>

	<!-- Final Note -->
	<p class="mt-10 text-center font-serif text-base text-gray-600 italic">SQL is magic...</p>
</main>

<style>
	/* Tailwind handles most styling; this is only for the SVG diagram. */

	.diagram-node {
		fill: white;
		stroke: #cbd5e1; /* gray-300 */
		stroke-width: 1.5;
	}

	.diagram-text {
		fill: #0f172a; /* slate-900 */
		font-size: 13px;
		font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
	}

	.diagram-edge {
		stroke: #334155; /* slate-700 */
		stroke-width: 2;
	}

	.diagram-edge-light {
		stroke: #94a3b8; /* slate-400 */
		stroke-width: 1.5;
	}

	.diagram-chip {
		fill: #eff6ff; /* blue-50 */
		stroke: #93c5fd; /* blue-300 */
		stroke-width: 1.25;
	}

	.diagram-chip-text {
		fill: #1e40af; /* blue-800 */
		font-size: 12px;
		font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
	}

	/* Arrow fill color */
	marker path {
		fill: #334155; /* slate-700 */
	}
</style>