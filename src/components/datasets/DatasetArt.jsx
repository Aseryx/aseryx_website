/**
 * A line drawing of what a dataset holds, for its card and profile until the
 * owner shares sample media. Each one draws the card's own caption (one
 * moment from all 9 angles, one gong recorded three ways...) in the ink it
 * inherits, with coral on the part the caption is about. It illustrates, it
 * is not a sample: the caption beside it says what the sample will be, so
 * the drawing is hidden from screen readers.
 *
 *   <DatasetArt kind="gong" className="absolute inset-6 text-ink-secondary" />
 */

// Lines stay 1.5px however large the drawing is scaled (card or profile banner)
const LINES = '[&_*]:[vector-effect:non-scaling-stroke]';

const Accent = ({ children }) => <g className="text-brand">{children}</g>;

/** An arched opening (window or door) standing on its sill */
const arch = (x, y, w, h) => `M${x} ${y + h}V${y + w / 2}A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2}V${y + h}Z`;

const ART = {
  // One moment from all 9 angles in a grid: the same car, seen from each camera
  driving: () =>
    [0, 1, 2].flatMap((r) =>
      [0, 1, 2].map((c) => {
        const x = 42 + c * 82;
        const y = 20 + r * 50;
        const shift = (c - 1) * 6;
        const vx = x + 36 + (c - 1) * 12;
        const hy = y + 12 + r * 4;
        const bx = x + 36 + shift;
        return (
          <g key={`${r}${c}`}>
            <rect x={x} y={y} width="72" height="40" rx="3" />
            <path d={`M${x} ${hy}H${x + 72}M${vx} ${hy}L${x + 14 + shift} ${y + 40}M${vx} ${hy}L${x + 58 + shift} ${y + 40}`} />
            <path d={`M${vx} ${hy + 4}L${bx} ${y + 40}`} strokeDasharray="3 3" opacity=".6" />
            <Accent>
              <circle cx={vx + (bx - vx) * 0.55} cy={hy + (y + 40 - hy) * 0.55} r="2.5" fill="currentColor" stroke="none" />
            </Accent>
          </g>
        );
      }),
    ),

  // A product render: modelled objects and the materials on them
  render: () => (
    <>
      <path d="M128 50L160 68L128 86L96 68Z M96 68V108L128 126L160 108V68 M128 86V126" />
      <path d="M100 84L124 97.5 M100 94L124 107.5 M100 104L124 117.5" opacity=".5" />
      <circle cx="200" cy="100" r="26" />
      <ellipse cx="200" cy="100" rx="26" ry="8" />
      <ellipse cx="200" cy="100" rx="9" ry="26" />
      <ellipse cx="128" cy="140" rx="44" ry="6" opacity=".4" />
      <ellipse cx="200" cy="140" rx="30" ry="5" opacity=".4" />
      <rect x="248" y="58" width="16" height="16" rx="3" />
      <rect x="248" y="82" width="16" height="16" rx="3" strokeDasharray="2 3" />
      <Accent>
        <rect x="248" y="106" width="16" height="16" rx="3" fill="currentColor" stroke="none" />
      </Accent>
    </>
  ),

  // Skeleton playback of one take: the joints tracked, frame after frame
  motion: () => {
    const figure = (dx, opacity, joints) => (
      <g key={dx} transform={`translate(${dx} 0)`} opacity={opacity}>
        <circle cx="196" cy="46" r="8" />
        <path d="M194 60L186 100 M194 60L176 78L166 94 M194 60L210 74L222 64 M186 100L206 118L200 144 M186 100L176 124L160 140" />
        {joints && (
          <Accent>
            {[[194, 60], [186, 100], [176, 78], [166, 94], [210, 74], [222, 64], [206, 118], [200, 144], [176, 124], [160, 140]].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" fill="currentColor" stroke="none" />
            ))}
          </Accent>
        )}
      </g>
    );
    return (
      <>
        {figure(-88, 0.15)}
        {figure(-44, 0.3)}
        {figure(0, 1, true)}
        <path d="M60 164H260" opacity=".4" />
        <Accent>
          <path d="M60 164H196" />
          <circle cx="196" cy="164" r="3.5" fill="currentColor" stroke="none" />
        </Accent>
      </>
    );
  },

  // Ground and drone views, labelled by landscape type
  landscape: () => (
    <>
      <rect x="40" y="32" width="112" height="96" rx="3" />
      <path d="M40 76Q66 62 96 72T152 66 M40 90Q80 80 112 88T152 84 M52 128L92 96 M78 128L96 96 M104 128L100 96 M130 128L104 96" />
      <path d="M126 70V61" />
      <circle cx="126" cy="55" r="6" />
      <rect x="168" y="32" width="112" height="96" rx="3" />
      <path d="M168 70L280 62 M206 32L214 128 M246 32L240 128 M214 98L280 104" />
      <path d="M168 112C196 102 222 122 250 110S276 96 280 98" opacity=".6" />
      <Accent>
        <rect x="48" y="112" width="30" height="9" rx="4.5" fill="currentColor" stroke="none" />
        <rect x="176" y="40" width="30" height="9" rx="4.5" fill="currentColor" stroke="none" />
      </Accent>
    </>
  ),

  // One product matched across retailers by its barcode
  retail: () => {
    const bars = [2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 1];
    let x = 64;
    return (
      <>
        <path d="M52 52H132V140H52Z M52 52L68 38H148L132 52 M132 140L148 126V38" />
        <g fill="currentColor" stroke="none">
          {bars.map((w, i) => {
            const bar = <rect key={i} x={x} y="98" width={w} height="28" />;
            x += w + 2;
            return bar;
          })}
        </g>
        {[40, 78, 116].map((y) => (
          <g key={y}>
            <rect x="196" y={y} width="92" height="26" rx="4" />
            <rect x="202" y={y + 5} width="16" height="16" rx="2" />
            <path d={`M224 ${y + 9}H276 M224 ${y + 17}H256`} opacity=".6" />
          </g>
        ))}
        <Accent>
          <path d="M150 112C174 112 172 53 196 53 M150 112C174 112 172 91 196 91 M150 112C174 112 172 129 196 129" />
        </Accent>
      </>
    );
  },

  // One finished model beside its raw photo set (a generic figure, no one real)
  scan: () => (
    <>
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2].map((c) => {
          const x = 36 + c * 28;
          const y = 44 + r * 28;
          return (
            <g key={`${r}${c}`}>
              <rect x={x} y={y} width="22" height="22" rx="2" />
              <circle cx={x + 11} cy={y + 9} r="3.5" />
              <path d={`M${x + 4} ${y + 20}Q${x + 11} ${y + 12} ${x + 18} ${y + 20}`} />
            </g>
          );
        }),
      )}
      <path d="M126 86H160 M154 80L160 86L154 92" />
      <ellipse cx="212" cy="66" rx="20" ry="25" />
      <ellipse cx="212" cy="66" rx="9" ry="25" opacity=".6" />
      <path d="M193 58Q212 63 231 58 M192 72Q212 77 232 72 M196 84Q212 88 228 84" opacity=".6" />
      <path d="M204 90V100 M220 90V100 M176 132C178 108 192 100 212 100S246 108 248 132 M190 106L186 132 M212 100V132 M234 106L238 132 M176 132H248" />
      <Accent>
        <ellipse cx="212" cy="140" rx="46" ry="8" />
      </Accent>
    </>
  ),

  // One shift from the wearer's point of view: hands at a valve, recording
  pov: () => (
    <>
      <rect x="52" y="24" width="216" height="112" rx="8" />
      <path d="M52 70H140 M52 88H140 M200 70H268 M200 88H268 M140 64V94 M200 64V94" />
      <circle cx="170" cy="79" r="24" />
      <circle cx="170" cy="79" r="5" />
      <path d="M170 55V74 M170 84V103 M146 79H165 M175 79H194" />
      <path d="M92 136L148 100 M248 136L192 100" strokeWidth="9" opacity=".85" />
      <path d="M52 158H268" opacity=".4" />
      <path d="M52 154V162 M79 154V162 M106 154V162 M133 154V162 M160 154V162 M187 154V162 M214 154V162 M241 154V162 M268 154V162" opacity=".4" />
      <Accent>
        <circle cx="68" cy="38" r="4" fill="currentColor" stroke="none" />
        <path d="M52 158H160" />
        <circle cx="160" cy="158" r="3.5" fill="currentColor" stroke="none" />
      </Accent>
    </>
  ),

  // One sentence spoken eight ways: the same words, eight pitch contours
  voice: () => {
    const amps = [[6, 4, 5, 3, 6], [3, 7, 2, 6, 4], [8, 3, 6, 4, 2], [2, 5, 8, 3, 7], [5, 6, 3, 7, 4], [7, 2, 5, 5, 3], [4, 8, 4, 2, 6], [6, 5, 7, 4, 5]];
    const contour = ([a, b, c, d, e], y) => `M60 ${y}C85 ${y - a} 105 ${y + b} 130 ${y}S175 ${y - c} 200 ${y}S245 ${y + d} 260 ${y - e}`;
    return (
      <>
        {[[82, 28], [116, 18], [140, 34], [180, 22], [208, 30]].map(([x, w]) => (
          <rect key={x} x={x} y="22" width={w} height="10" rx="5" />
        ))}
        {amps.map((a, i) =>
          i === 2 ? (
            <Accent key={i}>
              <path d={contour(a, 50 + i * 14)} />
            </Accent>
          ) : (
            <path key={i} d={contour(a, 50 + i * 14)} opacity=".7" />
          ),
        )}
      </>
    );
  },

  // One gong, recorded three ways: three microphones at three distances
  gong: () => (
    <>
      <path d="M104 150V36H216V150 M96 150H112 M208 150H224 M140 36L148 58 M180 36L172 58" />
      <circle cx="160" cy="92" r="36" />
      <circle cx="160" cy="92" r="24" opacity=".6" />
      <circle cx="160" cy="92" r="8" fill="currentColor" stroke="none" />
      {[[240, 96], [266, 106], [292, 116]].map(([x, y]) => (
        <g key={x}>
          <rect x={x - 4} y={y - 10} width="8" height="18" rx="4" />
          <path d={`M${x} ${y + 8}V150 M${x - 6} 150H${x + 6}`} />
        </g>
      ))}
      <Accent>
        <path d="M198 70A44 44 0 0 1 198 114 M205 66A52 52 0 0 1 205 118" />
      </Accent>
    </>
  ),

  // One track beside its stems and notation
  music: () => {
    const mix = [4, 8, 12, 7, 14, 10, 6, 12, 16, 9, 5, 11, 15, 8, 6, 13, 10, 4, 9, 14, 12, 7, 5, 10, 15, 11, 6, 8, 13, 9, 5, 7, 12, 6];
    const stem = (y, k) => `M60 ${y}${Array.from({ length: 25 }, (_, i) => `L${68 + i * 8} ${y + Math.round(Math.sin(i * k) * 4)}`).join('')}`;
    return (
      <>
        <g fill="currentColor" stroke="none">
          {mix.map((h, i) => (
            <rect key={i} x={60 + i * 6} y={36 - h / 2} width="2" height={h} rx="1" />
          ))}
        </g>
        <path d={stem(66, 1.3)} opacity=".7" />
        <Accent>
          <path d={stem(84, 0.8)} />
        </Accent>
        <path d={stem(102, 2.1)} opacity=".7" />
        <path d="M60 124H260 M60 129H260 M60 134H260 M60 139H260 M60 144H260" opacity=".5" />
        <g fill="currentColor" stroke="none">
          {[[84, 139], [112, 134], [140, 129], [168, 134], [196, 124], [224, 129]].map(([cx, cy]) => (
            <ellipse key={cx} cx={cx} cy={cy} rx="4" ry="3" transform={`rotate(-20 ${cx} ${cy})`} />
          ))}
        </g>
        <path d="M88 139V121 M116 134V116 M144 129V111 M172 134V116 M200 124V106 M228 129V111" />
      </>
    );
  },

  // Titles from the publisher's catalogue, spine by spine
  books: () => {
    const widths = [14, 18, 12, 20, 16, 14, 22, 12, 16, 18, 14];
    const heights = [84, 96, 72, 90, 100, 78, 92, 70, 94, 82, 88];
    let x = 54;
    return (
      <>
        <path d="M40 142H280" />
        {widths.map((w, i) => {
          const y = 142 - heights[i];
          const spine = (
            <g key={i}>
              <rect x={x} y={y} width={w} height={heights[i]} rx="1.5" />
              <path d={`M${x + 3} ${y + 10}H${x + w - 3} M${x + 3} ${y + 14}H${x + w - 3}`} opacity=".6" />
            </g>
          );
          x += w + 3;
          return i === 4 ? <Accent key={i}>{spine}</Accent> : spine;
        })}
        <rect x="262" y="66" width="14" height="76" rx="1.5" transform="rotate(12 262 142)" />
      </>
    );
  },

  // Doors, windows and facades from one themed set
  facades: () => (
    <>
      <path d="M64 56L130 30L196 56 M56 56H204 M60 64H200 M60 56V148 M200 56V148 M52 148H208" />
      <path d={`${arch(78, 72, 20, 26)} ${arch(120, 72, 20, 26)} ${arch(162, 72, 20, 26)} ${arch(78, 110, 20, 28)} ${arch(162, 110, 20, 28)}`} />
      <rect x="226" y="36" width="44" height="34" rx="3" />
      <path d="M238 42H258V64H238Z M248 42V64 M238 53H258" opacity=".7" />
      <rect x="226" y="116" width="44" height="34" rx="3" />
      <path d="M242 124H254 M244 124V144 M252 124V144 M240 144H256" opacity=".7" />
      <Accent>
        <path d={arch(116, 104, 28, 44)} />
        <rect x="226" y="76" width="44" height="34" rx="3" />
        <path d={arch(241, 82, 14, 24)} />
      </Accent>
    </>
  ),

  // Legal questions and their reasoned answers, article by article
  law: () => (
    <>
      <path d="M110 24H190L210 44V156H110Z M190 24V44H210" />
      <text x="121" y="52" fontSize="18" fill="currentColor" stroke="none">
        §
      </text>
      <path d="M122 64H198 M122 74H190 M122 84H198 M122 94H176 M122 128H198 M122 138H184 M122 148H160" opacity=".6" />
      <Accent>
        <rect x="118" y="100" width="84" height="22" rx="3" fill="currentColor" stroke="none" opacity=".15" />
        <path d="M122 106H198 M122 116H186" />
      </Accent>
    </>
  ),

  // A contact sheet of the first set: a pet, a bird, a small animal and a nature object
  animals: () => (
    <>
      {[36, 100, 164, 228].map((x) => (
        <rect key={x} x={x} y="55" width="56" height="70" rx="3" />
      ))}
      <Accent>
        <circle cx="64" cy="94" r="13" />
        <path d="M53 87L55 74L63 82 M65 82L73 74L75 87 M47 98H56 M72 98H81" />
      </Accent>
      <path d="M104 108H152 M116 100C116 90 130 86 138 94C142 99 136 106 126 106C120 106 116 104 116 100Z M116 100L108 96 M145 87L151 89L145 91" />
      <circle cx="139" cy="88" r="6" />
      <path d="M192 80V104 M192 86C182 74 170 80 176 90C179 95 186 95 192 92 M192 86C202 74 214 80 208 90C205 95 198 95 192 92 M192 94C184 98 182 106 188 106C191 106 192 101 192 98 M192 94C200 98 202 106 196 106C193 106 192 101 192 98 M190 80L186 74 M194 80L198 74" />
      <path d="M244 104V88L256 78L268 88V104Z M256 104V116" />
      <circle cx="256" cy="93" r="4" />
    </>
  ),

  // One sentence read in nine speaking styles: the same words, nine waveforms, the whisper quietest
  styles: () => {
    const shape = [3, 6, 9, 5, 11, 7, 4, 8, 3];
    const gain = [1, 1.3, 0.8, 1.45, 0.9, 1.2, 1.1, 1.4, 0.4];
    return gain.map((g, i) => {
      const x = 54 + (i % 3) * 74;
      const y = 26 + Math.floor(i / 3) * 46;
      const bars = shape.map((h, k) => `M${x + 8 + k * 6} ${y + 18 - h * g}V${y + 18 + h * g}`).join(' ');
      const tile = (
        <>
          <rect x={x} y={y} width="64" height="36" rx="4" />
          <path d={bars} />
        </>
      );
      return i === gain.length - 1 ? <Accent key={i}>{tile}</Accent> : <g key={i}>{tile}</g>;
    });
  },

  // Trade work from the worker's eyes: one hand steadies a nail, the other swings the hammer
  trades: () => (
    <>
      <path d="M40 40V28H52 M268 28H280V40 M40 140V152H52 M268 152H280V140" />
      <rect x="62" y="98" width="196" height="26" rx="2" />
      <path d="M74 106C110 102 150 110 196 104S236 108 250 106 M80 117C120 113 170 121 230 115" opacity=".6" />
      <path d="M86 158L166 104 M264 158L214 80" strokeWidth="9" opacity=".85" />
      <path d="M222.7 63.2L228.1 71.6L201.3 88.8L195.9 80.4Z" />
      <Accent>
        <path d="M176 98V82 M171 82H181" />
      </Accent>
    </>
  ),

  // One mix beside its rhythm, harmony and FX stems: the three sum back to it
  stems: () => {
    const lane = (y, heights) => heights.map((h, k) => `M${46 + k * 8} ${y + 14 - h}V${y + 14 + h}`).join(' ');
    const lanes = [
      [36, [9, 3, 9, 3, 9, 3, 9, 3, 9, 3, 9, 3, 9, 3, 9, 3, 9, 3, 9]],
      [76, [4, 6, 7, 8, 7, 6, 5, 6, 7, 8, 7, 6, 5, 6, 7, 8, 7, 6, 4]],
      [116, [1, 1, 2, 1, 1, 6, 9, 4, 1, 1, 1, 2, 1, 1, 7, 10, 3, 1, 1]],
    ];
    const mix = [10, 16, 12, 20, 14, 18, 11].map((h, k) => `M${240 + k * 6} ${90 - h}V${90 + h}`).join(' ');
    return (
      <>
        {lanes.map(([y, heights]) => (
          <g key={y}>
            <rect x="36" y={y} width="160" height="28" rx="4" />
            <path d={lane(y, heights)} />
          </g>
        ))}
        <path d="M204 50H212V130H204 M204 90H212 M212 90H224" />
        <Accent>
          <rect x="230" y="62" width="56" height="56" rx="4" />
          <path d={mix} />
        </Accent>
      </>
    );
  },

  // One everyday movement, retargeted: a person reaches, a humanoid robot copies the pose
  robotics: () => (
    <>
      <circle cx="96" cy="46" r="9" />
      <path d="M96 55V100 M96 64L78 84L72 104 M96 64L114 50L124 32 M96 100L84 128L80 150 M96 100L108 128L112 150" />
      {[
        [78, 84],
        [114, 50],
        [96, 100],
        [84, 128],
        [108, 128],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2.5" fill="currentColor" stroke="none" />
      ))}
      <path d="M146 92H180 M174 86L180 92L174 98" strokeDasharray="3 3" />
      <Accent>
        <rect x="216" y="38" width="16" height="14" rx="3" />
        <rect x="212" y="58" width="24" height="40" rx="4" />
        <path d="M214 64L206 84L200 104 M234 64L242 50L252 32 M218 98L212 128L208 150 M230 98L236 128L240 150" strokeWidth="4" />
      </Accent>
    </>
  ),

  // A line of text read aloud by one studio voice: the script, the mic, the speech
  tts: () => {
    const voice = [4, 9, 14, 8, 18, 11, 6, 15, 20, 9, 5, 12].map((h, k) => `M${214 + k * 6} ${90 - h}V${90 + h}`).join(' ');
    return (
      <>
        <rect x="40" y="40" width="96" height="100" rx="4" />
        <path d="M54 60H122 M54 76H110 M54 108H118 M54 124H96" opacity=".5" />
        <path d="M54 92H122" strokeWidth="3" />
        <rect x="166" y="60" width="22" height="36" rx="11" />
        <path d="M160 82A17 17 0 0 0 194 82 M177 99V116 M166 116H188" />
        <Accent>
          <path d={voice} />
        </Accent>
      </>
    );
  },

  // Two people tracked in one frame through one technique, joined where they grip
  grappling: () => (
    <>
      <path d="M40 40V28H52 M268 28H280V40 M40 140V152H52 M268 152H280V140" />
      <circle cx="120" cy="52" r="8" />
      <path d="M120 60L132 100 M124 70L150 74L170 70 M124 72L146 90L166 96 M132 100L118 128L110 150 M132 100L146 128L150 150" />
      <circle cx="200" cy="56" r="8" />
      <path d="M200 64L188 100 M196 72L170 70 M196 74L176 88L166 96 M188 100L202 128L210 150 M188 100L174 128L170 150" />
      {[
        [132, 100],
        [188, 100],
        [118, 128],
        [146, 128],
        [202, 128],
        [174, 128],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2.5" fill="currentColor" stroke="none" />
      ))}
      <Accent>
        <circle cx="170" cy="70" r="4" fill="currentColor" stroke="none" />
        <circle cx="166" cy="96" r="4" fill="currentColor" stroke="none" />
      </Accent>
    </>
  ),

  // Frames from one hand-made loop: a ball bounces round and comes back to the start
  loops: () => {
    const frames = [
      [160, 32, -7],
      [240, 61, -3],
      [240, 119, 4],
      [160, 148, 7],
      [80, 119, 4],
      [80, 61, -3],
    ];
    return (
      <>
        <path d="M138 84A24 14 0 0 1 182 84 M182 96A24 14 0 0 1 138 96 M182 84L184 77 M182 84L175 85 M138 96L136 103 M138 96L145 95" />
        {frames.map(([x, y, drop], i) => {
          const frame = (
            <>
              <rect x={x - 18} y={y - 13} width="36" height="26" rx="3" />
              <path d={`M${x - 12} ${y + 9}H${x + 12}`} opacity=".5" />
              <circle cx={x} cy={y + drop} r="3.5" />
            </>
          );
          return i === 1 ? <Accent key={i}>{frame}</Accent> : <g key={i}>{frame}</g>;
        })}
      </>
    );
  },

  // One timed case: the workbook beside its answer key
  spreadsheet: () => (
    <>
      <rect x="36" y="36" width="168" height="112" rx="4" />
      <path d="M36 52H204 M76 52V148 M116 52V148 M156 52V148 M36 68H204 M36 84H204 M36 100H204 M36 116H204 M36 132H204" opacity=".6" />
      <path d="M44 44H52 M60 44H120" />
      <rect x="116" y="84" width="40" height="16" strokeWidth="3" />
      <Accent>
        <rect x="220" y="48" width="64" height="88" rx="4" />
        <path d="M230 66L234 70L242 62 M250 66H274 M230 88L234 92L242 84 M250 88H274 M230 110L234 114L242 106 M250 110H274" />
      </Accent>
    </>
  ),

  // One furnished room, lit and framed from a saved camera view
  interior: () => (
    <>
      <path d="M40 40V28H52 M268 28H280V40 M40 140V152H52 M268 152H280V140" />
      <rect x="110" y="56" width="100" height="64" />
      <path d="M110 56L52 34 M210 56L268 34 M110 120L52 146 M210 120L268 146" opacity=".6" />
      <rect x="172" y="66" width="28" height="30" rx="1" />
      <path d="M186 66V96 M172 81H200" />
      <path d="M118 104V98C118 95 120 93 123 93H157C160 93 162 95 162 98V104 M114 104H166V116H114Z M120 116V120 M160 116V120" />
      <ellipse cx="150" cy="136" rx="40" ry="6" opacity=".4" />
      <path d="M142 34V58" />
      <Accent>
        <path d="M134 66L138 58H146L150 66Z" />
        <path d="M134 66L126 90 M150 66L158 90" strokeDasharray="2 4" opacity=".7" />
      </Accent>
    </>
  ),

  // An expert's screen mid-task in Excel, while the recording runs
  screen: () => (
    <>
      <rect x="52" y="28" width="216" height="124" rx="6" />
      <path d="M144 152L138 164H182L176 152" />
      <path d="M52 44H268" />
      <rect x="64" y="56" width="192" height="84" />
      <path d="M104 56V140 M144 56V140 M184 56V140 M224 56V140 M64 70H256 M64 84H256 M64 98H256 M64 112H256 M64 126H256" opacity=".5" />
      <path d="M196 92V110L201 106L205 114L208 112.5L204 104.5H210.5Z" />
      <Accent>
        <circle cx="256" cy="36" r="4" fill="currentColor" stroke="none" />
      </Accent>
    </>
  ),
};

// The wrapper takes the caller's position: an absolute <svg> would keep its
// own height instead of stretching between `top` and `bottom`.
const DatasetArt = ({ kind, className = '' }) => {
  const draw = ART[kind];
  if (!draw) return null;
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 320 180"
        className={`h-full w-full ${LINES}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        {draw()}
      </svg>
    </div>
  );
};

export default DatasetArt;
