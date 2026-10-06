/**
 * Sift ingest pipeline. Inline SVG, no dependencies.
 * Colours read from the site tokens, so it follows the theme if a light mode lands later.
 *
 * The band above the stages shows surviving inventory. It is drawn to scale:
 * full height before the rubric, 15% of that height after it.
 */
export function PipelineDiagram() {
  const stages = [
    {
      x: 40,
      name: 'Sources',
      lines: ['6 scrapers', 'Dice, RA, Luma, Fever,', 'NYC museums, Eventbrite'],
    },
    {
      x: 232,
      name: 'Discover',
      lines: ['Claude Sonnet', 'pop-ups, sample sales,', 'gallery openings'],
    },
    {
      x: 424,
      name: 'Reject',
      lines: ['LLM rubric', 'tourist traps, spam,', "children's events"],
      accent: true,
    },
    {
      x: 616,
      name: 'Score',
      lines: ['gpt-4o-mini', 'vibe 1–10', 'under 5 never loads'],
    },
    {
      x: 808,
      name: 'Rank',
      lines: ['per-user signals', 'category, tag,', 'borough, price'],
    },
  ]

  return (
    <figure className="diagram">
      <svg
        viewBox="0 0 1000 300"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Sift ingest pipeline: six scrapers and an LLM discovery pass feed a rejection rubric that removes roughly 85 percent of incoming events, after which survivors are scored and ranked."
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {/* surviving-inventory band, to scale */}
        <path
          d="M 40 22 L 424 22 L 566 61 L 960 61 L 960 74 L 566 74 L 424 113 L 40 113 Z"
          fill="var(--acc)"
          fillOpacity="0.10"
          stroke="var(--accdim)"
          strokeWidth="1"
        />

        {/* rejection annotation */}
        <line x1="495" y1="40" x2="495" y2="96" stroke="var(--acc)" strokeWidth="1" strokeDasharray="2 3" />
        <text
          x="505"
          y="36"
          fill="var(--acc)"
          fontFamily="var(--font-mono), monospace"
          fontSize="11"
          letterSpacing="0.08em"
        >
          ~85% removed
        </text>

        {/* band endpoint labels */}
        <text
          x="48"
          y="70"
          fill="var(--ink3)"
          fontFamily="var(--font-mono), monospace"
          fontSize="10"
          letterSpacing="0.12em"
          dominantBaseline="middle"
        >
          EVERYTHING
        </text>
        <text
          x="952"
          y="68"
          textAnchor="end"
          fill="var(--ink3)"
          fontFamily="var(--font-mono), monospace"
          fontSize="10"
          letterSpacing="0.12em"
          dominantBaseline="middle"
        >
          THE DECK
        </text>

        {/* stage rail */}
        <line x1="40" y1="150" x2="960" y2="150" stroke="var(--rule)" strokeWidth="1" />

        {stages.map((s) => (
          <g key={s.name}>
            <line
              x1={s.x}
              y1="143"
              x2={s.x}
              y2="157"
              stroke={s.accent ? 'var(--acc)' : 'var(--ink3)'}
              strokeWidth="1"
            />
            <text
              x={s.x}
              y="184"
              fill={s.accent ? 'var(--acc)' : 'var(--ink)'}
              fontFamily="var(--font-mono), monospace"
              fontSize="12"
              letterSpacing="0.14em"
            >
              {s.name.toUpperCase()}
            </text>
            {s.lines.map((line, i) => (
              <text
                key={line}
                x={s.x}
                y={212 + i * 18}
                fill={i === 0 ? 'var(--ink2)' : 'var(--ink3)'}
                fontFamily="var(--font-body), sans-serif"
                fontSize="12.5"
              >
                {line}
              </text>
            ))}
          </g>
        ))}

        {/* cadence note */}
        <text
          x="40"
          y="280"
          fill="var(--ink3)"
          fontFamily="var(--font-mono), monospace"
          fontSize="10.5"
          letterSpacing="0.1em"
        >
          REFRESHED EVERY THREE DAYS VIA GITHUB ACTIONS
        </text>
      </svg>

      <figcaption>
        The band is drawn to scale. Everything upstream of the rubric is inventory an aggregator
        would ship; roughly 15% of it survives to the deck.
      </figcaption>
    </figure>
  )
}
