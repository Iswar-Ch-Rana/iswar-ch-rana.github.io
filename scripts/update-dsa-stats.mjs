// Refreshes src/data/dsa-stats.json from LeetCode, GeeksforGeeks and takeUforward.
// Runs daily in .github/workflows/update-dsa-stats.yml; run it locally with
// `npm run update:dsa`. Each source is fetched on its own: if one fails or returns
// something implausible, its previous numbers are kept, so a flaky site can never
// blank the Problem Solving section.

import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../src/data/dsa-stats.json', import.meta.url);
const USER = { leetcode: 'iswar_2000', gfg: 'ranabitu227', tuf: 'iswar_2000' };
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
  return {
    tuf: { solved: toInt(glance['Problems solved']), globalRank: toInt(glance['Global rank']) },
    activity: {
      contributions: consistency['Contributions • 12 mos'],
      activeDays: consistency['Active days'],
      bestStreak: consistency['Best streak'],
    },
  };
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
const failures = [];

const [lc, gf, tu] = await Promise.allSettled([leetcode(), gfg(), tuf()]);
if (lc.status === 'fulfilled') next.leetcode = accept('leetcode', current.leetcode, lc.value, ['solved', 'easy', 'medium']);
else failures.push(`leetcode: ${lc.reason.message}`);
if (gf.status === 'fulfilled') next.gfg = accept('gfg', current.gfg, gf.value, ['solved'], ['instituteRank', 'longestStreak']);
else failures.push(`gfg: ${gf.reason.message}`);
if (tu.status === 'fulfilled') {
  next.tuf = accept('tuf', current.tuf, tu.value.tuf, ['solved'], ['globalRank']);
  // rolling 12-month figures can fall, so only check that they parsed
  const a = tu.value.activity;
  next.activity = [a.contributions, a.activeDays, a.bestStreak].every(Number.isInteger) ? a : current.activity;
} else failures.push(`tuf: ${tu.reason.message}`);

failures.forEach((f) => console.warn(`fetch failed, kept previous values: ${f}`));

const { updatedAt: _, ...before } = current;
const { updatedAt: __, ...after } = next;
if (JSON.stringify(before) === JSON.stringify(after)) {
  console.log('No change in DSA stats.');
} else {
  next.updatedAt = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }); // YYYY-MM-DD in IST
  await writeFile(FILE, JSON.stringify(next, null, 2) + '\n');
  console.log('Updated DSA stats:', JSON.stringify(after));
}
