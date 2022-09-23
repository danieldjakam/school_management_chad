module.exports =  {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "5mm",
        contents: ''
    },
    footer: {
        height: "2mm",
        contents: {
            first: 'GSB La Semence',
            2: 'GSB La Semence', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};