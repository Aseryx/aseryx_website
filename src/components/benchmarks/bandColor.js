import { bandOf } from '../../data/benchmarks.js';

/**
 * Each readiness band's colour in the benchmarks charts and Home's teaser:
 * teal for the good bands and coral for the problem bands, deepest at the
 * ends, so colour reads as order. Checked with the dataviz palette validator
 * in both modes, where the four status colours (bandTone.js) fail
 * colourblind separation as a chart palette. num is a marker number's
 * colour, by how light the fill is.
 */
export const BAND_COLOR = {
  ready: {
    bg: 'bg-[#0e6e7e] dark:bg-[#3cc0d0]',
    fill: 'fill-[#0e6e7e] dark:fill-[#3cc0d0]',
    stroke: 'stroke-[#0e6e7e] dark:stroke-[#3cc0d0]',
    num: 'fill-[#ffffff] dark:fill-[#121214]',
  },
  usable: {
    bg: 'bg-[#6fb3c0] dark:bg-[#1b5d68]',
    fill: 'fill-[#6fb3c0] dark:fill-[#1b5d68]',
    stroke: 'stroke-[#6fb3c0] dark:stroke-[#1b5d68]',
    num: 'fill-[#1a1a1a] dark:fill-[#ffffff]',
  },
  cleaning: {
    bg: 'bg-[#ee9472] dark:bg-[#8a4530]',
    fill: 'fill-[#ee9472] dark:fill-[#8a4530]',
    stroke: 'stroke-[#ee9472] dark:stroke-[#8a4530]',
    num: 'fill-[#1a1a1a] dark:fill-[#ffffff]',
  },
  serious: {
    bg: 'bg-[#c2410c] dark:bg-[#ff7a4d]',
    fill: 'fill-[#c2410c] dark:fill-[#ff7a4d]',
    stroke: 'stroke-[#c2410c] dark:stroke-[#ff7a4d]',
    num: 'fill-[#ffffff] dark:fill-[#1a1a1a]',
  },
};

export const tone = (score) => BAND_COLOR[bandOf(score).id];
