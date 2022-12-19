module.exports =  {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "0mm",
        contents: ''
    },
    footer: {
        height: "0mm",
        contents: {
            first: 'Living World Mission Chad',
            2: 'Living World Mission Chad', // Any page number is working. 1-based index
            default: '<span style="color: #000;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};