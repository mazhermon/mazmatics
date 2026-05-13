#!/usr/bin/env node
/* Convert a markdown file to a styled HTML for printing. Tiny single-file
 * converter — handles only what post-buffer.md actually uses (headings,
 * paragraphs, lists, code blocks, hr, bold, italic, inline code, links).
 * Pipe the HTML through `cupsfilter` for PDF or `textutil` for .docx.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const [, , inPath, outPath] = process.argv
if (!inPath || !outPath) {
  console.error('Usage: md-to-printable.mjs <in.md> <out.html>')
  process.exit(1)
}

const src = readFileSync(inPath, 'utf8')

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inline(s) {
  s = esc(s)
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>')
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  s = s.replace(/&amp;rarr;/g, '&rarr;').replace(/&amp;darr;/g, '&darr;')
  return s
}

const lines = src.split('\n')
const out = []
let inCode = false
let inList = false
let listTag = ''
let para = []

function flushPara() {
  if (para.length) {
    out.push('<p>' + inline(para.join(' ')) + '</p>')
    para = []
  }
}
function flushList() {
  if (inList) {
    out.push(`</${listTag}>`)
    inList = false
  }
}

for (const raw of lines) {
  const line = raw

  if (line.startsWith('```')) {
    flushPara()
    flushList()
    if (inCode) {
      out.push('</code></pre>')
      inCode = false
    } else {
      out.push('<pre><code>')
      inCode = true
    }
    continue
  }
  if (inCode) {
    out.push(esc(line))
    continue
  }

  if (/^#{1,6} /.test(line)) {
    flushPara()
    flushList()
    const m = line.match(/^(#{1,6}) (.*)$/)
    out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`)
    continue
  }

  if (/^---+\s*$/.test(line)) {
    flushPara()
    flushList()
    out.push('<hr/>')
    continue
  }

  const ul = line.match(/^[-*] (.*)$/)
  const ol = line.match(/^(\d+)\. (.*)$/)
  if (ul || ol) {
    flushPara()
    const tag = ul ? 'ul' : 'ol'
    if (!inList || listTag !== tag) {
      flushList()
      out.push(`<${tag}>`)
      inList = true
      listTag = tag
    }
    out.push(`<li>${inline((ul || ol)[ul ? 1 : 2])}</li>`)
    continue
  }

  if (line.trim() === '') {
    flushPara()
    flushList()
    continue
  }

  flushList()
  para.push(line.trim())
}
flushPara()
flushList()
if (inCode) out.push('</code></pre>')

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${esc(inPath.split('/').pop())}</title>
<style>
@page { size: A4; margin: 18mm 16mm; }
html { font-family: -apple-system, "Helvetica Neue", Arial, sans-serif; color: #1a1a1a; }
body { max-width: 720px; margin: 0 auto; padding: 24px; line-height: 1.5; font-size: 11pt; }
h1 { font-size: 22pt; margin: 0 0 0.6em; letter-spacing: -0.01em; }
h2 { font-size: 15pt; margin: 1.6em 0 0.4em; border-bottom: 1px solid #ddd; padding-bottom: 0.15em; page-break-after: avoid; }
h3 { font-size: 12pt; margin: 1.2em 0 0.3em; page-break-after: avoid; }
h4, h5, h6 { font-size: 11pt; margin: 1em 0 0.3em; }
p { margin: 0 0 0.7em; }
ul, ol { margin: 0 0 0.7em 1.2em; padding: 0; }
li { margin: 0.15em 0; }
hr { border: 0; border-top: 1px solid #ddd; margin: 1.6em 0; }
strong { font-weight: 700; }
em { font-style: italic; }
code { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 0.9em; background: #f5f5f5; padding: 1px 5px; border-radius: 3px; }
pre { background: #f5f5f5; padding: 12px 14px; border-radius: 4px; overflow-x: auto; font-size: 9.5pt; line-height: 1.45; page-break-inside: avoid; }
pre code { background: transparent; padding: 0; font-size: inherit; }
a { color: #2a4dbf; text-decoration: underline; word-break: break-word; }
@media print {
  a { color: #1a1a1a; text-decoration: none; }
  pre, ul, ol { page-break-inside: avoid; }
}
</style>
</head>
<body>
${out.join('\n')}
</body>
</html>`

writeFileSync(outPath, html)
console.log(`Wrote ${outPath}`)
