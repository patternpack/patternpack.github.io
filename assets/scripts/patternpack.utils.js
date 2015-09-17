var patternpack = patternpack || {};

patternpack.utils = function () {
  function getMarkdown(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);
    xhr.onreadystatechange = function () {
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          //console.log(xhr.responseText); // 'This is the returned text.'
          callback(xhr);
        } else {
          //console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
      }
    };
  }

  function parseMarkdown(value) {
    var converter = new showdown.Converter({extensions: ["github"]});
    var parsedValue = converter.makeHtml(value);
    return parsedValue;
  }

  function getMarkdownAsHtml(url, callback) {
    getMarkdown(url, function(response) {
      var markdownValue = response.responseText;
      var parsedValue = parseMarkdown(markdownValue);
      callback(parsedValue);
    });
  }

  return {
    getMarkdownAsHtml: getMarkdownAsHtml
  }
}();
