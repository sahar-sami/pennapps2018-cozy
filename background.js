 chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
       conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.trulia.com'}
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.realtor.com'}
          })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
