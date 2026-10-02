// Refreshes src/data/dsa-stats.json from LeetCode, GeeksforGeeks and takeUforward,
// and src/data/heatmaps.json (daily activity) from takeUforward and GitHub.
// Runs daily in .github/workflows/update-dsa-stats.yml; run it locally with
// `npm run update:dsa`. Each source is fetched on its own: if one fails or returns
// something implausible, its previous numbers are kept, so a flaky site can never
// blank the Problem Solving section.

import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../src/data/dsa-stats.json', import.meta.url);
const HEATMAPS = new URL('../src/data/heatmaps.json', import.meta.url);
const USER = { leetcode: 'iswar_2000', gfg: 'ranabitu227', tuf: 'iswar_2000', github: 'Iswar-Ch-Rana' };
const HEATMAP_DAYS = 371; // 53 weeks, what the calendar shows
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Safari/537.36';

async function get(url, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: { 'User-Agent': UA, ...init.headers },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res;
}

const toInt = (s) => Number(String(s).replace(/[^\d]/g, ''));
const isCount = (n) => Number.isInteger(n) && n > 0;
const today = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }); // YYYY-MM-DD in IST

// keeps the active days of the last HEATMAP_DAYS as { date: count }, oldest first
function toHeatmap(days) {
  const from = new Date(Date.parse(today()) - (HEATMAP_DAYS - 1) * 86_400_000).toISOString().slice(0, 10);
  const valid = days.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d.date) && Number.isInteger(d.count) && d.count >= 0);
  if (!valid) return null;
  const kept = days.filter((d) => d.count > 0 && d.date >= from).sort((a, b) => a.date.localeCompare(b.date));
  return Object.fromEntries(kept.map((d) => [d.date, d.count]));
}

async function leetcode() {
  const res = await get('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({
      query: 'query($u:String!){matchedUser(username:$u){submitStatsGlobal{acSubmissionNum{difficulty count}}}}',
      variables: { u: USER.leetcode },
    }),
  });
  const rows = (await res.json()).data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
  const by = Object.fromEntries(rows.map((r) => [r.difficulty, r.count]));
  return { solved: by.All, easy: by.Easy, medium: by.Medium, hard: by.Hard };
}

async function gfg() {
  const res = await get(`https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${USER.gfg}&article_count=false&redirect=true`);
  const d = (await res.json()).data ?? {};
  return { solved: d.total_problems_solved, instituteRank: d.institute_rank, longestStreak: d.pod_solved_longest_streak };
}

// takeUforward renders the profile on the server, so read the stat rows from the HTML
async function tuf() {
  const html = await (await get(`https://takeuforward.org/profile/${USER.tuf}`)).text();
  const glance = Object.fromEntries(
    [...html.matchAll(/glanceLabel">([^<]+)<\/span><span class="[^"]*glanceValue">(.*?)<\/span><\/div>/g)]
      .map(([, label, value]) => [label.trim(), value.replace(/<[^>]+>/g, '').trim()]),
  );
  const consistency = Object.fromEntries(
    [...html.matchAll(/consistencyStatValue">([^<]+)<\/span><span class="[^"]*consistencyStatLabel">([^<]+)</g)]
      .map(([, value, label]) => [label.trim(), toInt(value)]),
  );
  // the consistency calendar (all connected platforms) ships as JSON inside the page's
  // React payload, where its quotes are escaped
  const raw = html.match(/\\"heatmapData\\":(\[.*?\])/)?.[1];
  return {
    heatmap: raw ? toHeatmap(JSON.parse(raw.replaceAll('\\"', '"'))) : null,
    tuf: { solved: toInt(glance['Problems solved']), globalRank: toInt(glance['Global rank']) },
    activity: {
      contributions: consistency['Contributions • 12 mos'],
      activeDays: consistency['Active days'],
      bestStreak: consistency['Best streak'],
    },
  };
}

// the contribution calendar: each day cell has a date and an id, and a tooltip
// pointing at that id says "N contributions on ..." or "No contributions on ..."
async function github() {
  const html = await (await get(`https://github.com/users/${USER.github}/contributions`)).text();
  const dates = Object.fromEntries([...html.matchAll(/data-date="([\d-]+)" id="([^"]+)"/g)].map(([, date, id]) => [id, date]));
  const days = [...html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)/g)]
    .filter(([, id]) => dates[id])
    .map(([, id, text]) => ({ date: dates[id], count: text.startsWith('No ') ? 0 : toInt(text.split(' ')[0]) }));
  // a full calendar has 365+ cells; fewer means the markup changed
  return days.length >= 365 ? toHeatmap(days) : null;
}

// solved counts only go up, so a lower one means the scrape broke; ranks and
// streaks move both ways and only need to be positive numbers
function accept(name, previous, next, countKeys, otherKeys = []) {
  const bad =
    countKeys.find((k) => !isCount(next?.[k]) || (previous?.[k] && next[k] < previous[k])) ??
    otherKeys.find((k) => !isCount(next?.[k]));
  if (bad) {
    console.warn(`${name}: keeping previous values (bad "${bad}": ${next?.[bad]})`);
    return previous;
  }
  return next;
}

const current = JSON.parse(await readFile(FILE, 'utf8'));
const next = structuredClone(current);
const currentHeatmaps = JSON.parse(await readFile(HEATMAPS, 'utf8').catch(() => '{}'));
const nextHeatmaps = structuredClone(currentHeatmaps);
const failures = [];

// an empty or unparsed calendar keeps the previous one
function acceptHeatmap(name, heatmap) {
  if (heatmap && Object.keys(heatmap).length) nextHeatmaps[name] = heatmap;
  else console.warn(`${name} heatmap: keeping previous values (nothing parsed)`);
}

const [lc, gf, tu, gh] = await Promise.allSettled([leetcode(), gfg(), tuf(), github()]);
if (lc.status === 'fulfilled') next.leetcode = accept('leetcode', current.leetcode, lc.value, ['solved', 'easy', 'medium']);
else failures.push(`leetcode: ${lc.reason.message}`);
if (gf.status === 'fulfilled') next.gfg = accept('gfg', current.gfg, gf.value, ['solved'], ['instituteRank', 'longestStreak']);
else failures.push(`gfg: ${gf.reason.message}`);
if (tu.status === 'fulfilled') {
  next.tuf = accept('tuf', current.tuf, tu.value.tuf, ['solved'], ['globalRank']);
  // rolling 12-month figures can fall, so only check that they parsed
  const a = tu.value.activity;
  next.activity = [a.contributions, a.activeDays, a.bestStreak].every(Number.isInteger) ? a : current.activity;
  acceptHeatmap('tuf', tu.value.heatmap);
} else failures.push(`tuf: ${tu.reason.message}`);
if (gh.status === 'fulfilled') acceptHeatmap('github', gh.value);
else failures.push(`github: ${gh.reason.message}`);

failures.forEach((f) => console.warn(`fetch failed, kept previous values: ${f}`));

const { updatedAt: _, ...before } = current;
const { updatedAt: __, ...after } = next;
const statsChanged = JSON.stringify(before) !== JSON.stringify(after);
const heatmapsChanged = JSON.stringify(currentHeatmaps) !== JSON.stringify(nextHeatmaps);
if (!statsChanged && !heatmapsChanged) {
  console.log('No change in DSA stats or heatmaps.');
} else {
  // updatedAt is the last sync that moved anything, heatmaps included
  next.updatedAt = today();
  await writeFile(FILE, JSON.stringify(next, null, 2) + '\n');
  if (heatmapsChanged) await writeFile(HEATMAPS, JSON.stringify(nextHeatmaps, null, 2) + '\n');
  if (statsChanged) console.log('Updated DSA stats:', JSON.stringify(after));
  if (heatmapsChanged) console.log('Updated heatmaps:', Object.keys(nextHeatmaps).map((k) => `${k} ${Object.keys(nextHeatmaps[k]).length} active days`).join(', '));
}
