(function() {
    function cheerio(domHTML) {
        return {
            attr: function(at) {
                var reg = new RegExp(at + '="([\\w-:; ]+)"');
                return domHTML.match(reg);
            }
        };
    }
    window.cheerio = cheerio;
})();