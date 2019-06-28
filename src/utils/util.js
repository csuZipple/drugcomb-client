export function throttle (fn, context, param = [], delay = 500, mustApplyTime = 1000) {
  fn.timer && clearTimeout(fn.timer)
  fn._cur = Date.now()
  fn._start = fn._start || fn._cur
  if (fn._cur - fn._start > mustApplyTime) {
    fn.apply(context, param)
    fn._start = fn._cur
  } else {
    fn.timer = setTimeout(function () {
      fn.apply(context, param)
    }, delay)
  }
}

export const sourceLinks = {
  // eslint-disable-next-line no-tabs
  'PMC3926026':	'https://www.ncbi.nlm.nih.gov/pubmed/24469833',
  // eslint-disable-next-line no-tabs
  'PMC5248573':	'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5248573/',
  // eslint-disable-next-line no-tabs
  'PMID26983881':	'https://www.ncbi.nlm.nih.gov/pubmed/26983881',
  // eslint-disable-next-line no-tabs
  'NCI':	'https://wiki.nci.nih.gov/display/NCIDTPdata/NCI-ALMANAC',
  // eslint-disable-next-line no-tabs
  'NIH':	'https://tripod.nih.gov/matrix-client/'
}
