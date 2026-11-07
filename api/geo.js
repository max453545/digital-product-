const groups = {
  NA: new Set('US CA MX AG AI AW BB BM BS BZ CR CU DM DO GD GL GP GT HN HT JM KN KY LC MF MQ MS NI PA PM PR SV SX TC TT VC VG VI'.split(' ')),
  EU: new Set('AL AD AT AX BA BE BG BY CH CY CZ DE DK EE ES FI FO FR GB GG GI GR HR HU IE IM IS IT JE LI LT LU LV MC MD ME MK MT NL NO PL PT RO RS RU SE SI SJ SK SM UA VA XK'.split(' ')),
  AS: new Set('AF AM AZ BD BH BN BT CC CN GE HK ID IL IN IQ IR JO JP KG KH KP KR KW KZ LA LB LK MM MN MO MV MY NP OM PH PK PS QA SA SG SY TH TJ TL TM TR TW UZ VN YE'.split(' ')),
  AF: new Set('AO BF BI BJ BW CD CF CG CI CM CV DJ DZ EG ER ET GA GH GM GN GQ GW KE KM LR LS LY MA MG ML MR MU MW MZ NA NE NG RE RW SC SD SH SL SN SO SS ST SZ TD TG TN TZ UG YT ZA ZM ZW'.split(' ')),
  SA: new Set('AR BO BR CL CO EC FK GF GY PE PY SR UY VE'.split(' ')),
  OC: new Set('AS AU CK FJ FM GU KI MH MP NC NF NR NU NZ PF PG PW SB TK TL TO TV VU WF WS'.split(' '))
};

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Vary', 'x-vercel-ip-country');
  const country = String(req.headers['x-vercel-ip-country'] || '').trim().toUpperCase();
  // India has its own price tier; other Asian countries use the AS tier.
  const continent = country === 'IN' ? 'IN' : (Object.keys(groups).find(key => groups[key].has(country)) || null);
  res.status(200).json({ country: country || null, continent });
};
