function postNote(args, content) {
    return `<div class="note ${args.join(' ')}">
            ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
          </div>`;
}

hexo.extend.tag.register('note', postNote, {ends: true});
hexo.extend.tag.register('subnote', postNote, {ends: true});