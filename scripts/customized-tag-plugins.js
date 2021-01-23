// note
function postNote(args, content) {
    return `<div class="note ${args.join(' ')}">
            ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
          </div>`;
}

hexo.extend.tag.register('note', postNote, {ends: true});
hexo.extend.tag.register('subnote', postNote, {ends: true});

// Table2Markdown
function postTableToMarkdown() {
    return `<textarea id="table2markdown_editor"></textarea>
<script src="<%- url_for(theme.libs.js.table2markdown) %>"></script>`;
}
hexo.extend.tag.register("tableTomarkdown", postTableToMarkdown, {ends: true});