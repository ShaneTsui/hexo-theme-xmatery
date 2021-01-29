var editor = document.getElementById("table2markdown_editor")

function columnWidth(rows, columnIndex) {
    return Math.max.apply(null, rows.map(function(row) {
        return row[columnIndex].length
    }))
}

function looksLikeTable(data) {
    return true
}

editor.addEventListener("paste", function(event) {
    var clipboard = event.clipboardData
    var data = clipboard.getData('text/plain')
    // trim the trailing newline character, if present.
    data = data.replace(/(?:[\n\u0085\u2028\u2029]|\r\n?)$/, '');

    if(looksLikeTable(data)) {
        event.preventDefault()
    }else{
        return
    }

    var rows = data.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(function(row) {
        console.log(row)
        return row.split("\t")
    })

    var colAlignments = []

    var columnWidths = rows[0].map(function(column, columnIndex) {
        var alignment = "l"
        var re = /^(\^[lcr])/i
        var m = column.match(re)
        if (m) {
            var align = m[1][1].toLowerCase()
            if (align === "c") {
                alignment = "c"
            } else if (align === "r") {
                alignment = "r"
            }
        }
        colAlignments.push(alignment)
        column = column.replace(re, "")
        rows[0][columnIndex] = column
        return columnWidth(rows, columnIndex)
    })
    var markdownRows = rows.map(function(row, rowIndex) {
        // | Name         | Title | Email Address  |
        // |--------------|-------|----------------|
        // | Jane Atler   | CEO   | jane@acme.com  |
        // | John Doherty | CTO   | john@acme.com  |
        // | Sally Smith  | CFO   | sally@acme.com |
        return "| " + row.map(function(column, index) {
            return column + Array(columnWidths[index] - column.length + 1).join(" ")
        }).join(" | ") + " |"
        row.map

    })
    markdownRows.splice(1, 0, "|" + columnWidths.map(function(width, index) {
        var prefix = ""
        var postfix = ""
        var adjust = 0
        var alignment = colAlignments[index]
        if (alignment === "r") {
            postfix = ":"
            adjust = 1
        } else if (alignment == "c") {
            prefix = ":"
            postfix = ":"
            adjust = 2
        }
        return prefix + Array(columnWidths[index] + 3 - adjust).join("-") + postfix
    }).join("|") + "|")

    // https://www.w3.org/TR/clipboard-apis/#the-paste-action
    // When pasting, the drag data store mode flag is read-only, hence calling
    // setData() from a paste event handler will not modify the data that is
    // inserted, and not modify the data on the clipboard.

    event.target.innerHTML = markdownRows.join("<br>")
    return false
})