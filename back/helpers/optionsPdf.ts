module.exports =  {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "5mm",
        contents: ''
    },
    footer: {
        height: "2mm",
        contents: {
            // first: '',
            // 2: '', // Any page number is working. 1-based index
            // default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            // last: 'Last Page'
        }
    }
};